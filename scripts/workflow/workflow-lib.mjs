import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

export const protectedBranches = new Set(['main', 'production', 'develop']);

export const run = (command, args, options = {}) => {
  const useCmdShim = process.platform === 'win32' && ['npm', 'npx'].includes(command);
  const executable = useCmdShim ? (process.env.ComSpec || 'cmd.exe') : command;
  const executableArgs = useCmdShim
    ? ['/d', '/s', '/c', [command, ...args].join(' ')]
    : args;
  const result = spawnSync(executable, executableArgs, {
    stdio: options.capture ? 'pipe' : 'inherit',
    encoding: options.capture ? 'utf8' : undefined,
    env: { ...process.env, ...(options.env ?? {}) },
    shell: false,
  });

  if (result.status !== 0 && !options.allowFailure) {
    if (result.error) process.stderr.write(`${result.error.message}\n`);
    if (options.capture && result.stderr) process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }

  return result;
};

export const read = (command, args, options = {}) => run(command, args, {
  ...options,
  capture: true,
}).stdout.trim();

export const currentBranch = () => read('git', ['branch', '--show-current']);

export const worktreeStatus = () => read('git', ['status', '--porcelain']);

export const ensureCleanWorktree = () => {
  if (worktreeStatus().length > 0) {
    process.stderr.write('작업트리가 깨끗하지 않습니다. 먼저 변경사항을 커밋하거나 정리하세요.\n');
    process.exit(1);
  }
};

const nowParts = () => {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  return {
    date: [now.getFullYear(), pad(now.getMonth() + 1), pad(now.getDate())].join(''),
    time: [pad(now.getHours()), pad(now.getMinutes())].join(''),
  };
};

export const todayStamp = () => nowParts().date;

export const timestamp = () => {
  const parts = nowParts();
  return [parts.date, parts.time].join('');
};

export const dailyBranch = (date = todayStamp()) => `daily/${date}`;

export const remoteBranchExists = (branch) => (
  run('git', ['rev-parse', '--verify', `origin/${branch}`], {
    allowFailure: true,
    capture: true,
  }).status === 0
);

export const localBranchExists = (branch) => (
  run('git', ['rev-parse', '--verify', branch], {
    allowFailure: true,
    capture: true,
  }).status === 0
);

export const isAncestor = (ancestor, descendant) => (
  run('git', ['merge-base', '--is-ancestor', ancestor, descendant], {
    allowFailure: true,
    capture: true,
  }).status === 0
);

export const latestWorkRef = () => {
  const refs = read('git', [
    'for-each-ref',
    '--sort=-committerdate',
    '--format=%(refname:short)',
    'refs/remotes/origin/develop',
    'refs/remotes/origin/daily',
  ])
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return refs[0] || 'origin/develop';
};

export const ensureBranch = (branch, baseRef = 'origin/main') => {
  if (localBranchExists(branch)) {
    run('git', ['switch', branch]);
    if (remoteBranchExists(branch)) run('git', ['pull', '--ff-only', 'origin', branch]);
    return;
  }

  if (remoteBranchExists(branch)) {
    run('git', ['switch', '--track', `origin/${branch}`]);
    run('git', ['pull', '--ff-only', 'origin', branch]);
    return;
  }

  run('git', ['switch', '-c', branch, baseRef]);
  run('git', ['push', '-u', 'origin', branch]);
};

export const installDependencies = () => {
  run('npm', ['ci', '--prefer-offline', '--no-audit', '--no-fund', '--progress=false']);
};

export const verifyFull = () => {
  run('npm', ['run', 'verify:full']);
};

export const submitIndexNow = () => {
  const result = run('npm', ['run', 'seo:indexnow'], { allowFailure: true });
  if (result.status !== 0) {
    process.stderr.write('IndexNow 제출에 실패했습니다. 배포는 완료됐지만 검색엔진 빠른 갱신은 수동 확인이 필요합니다.\n');
  }
};

export const checkoutDailyBranch = (branch, baseRef = 'origin/develop') => {
  if (localBranchExists(branch)) {
    run('git', ['switch', branch]);
    if (remoteBranchExists(branch)) run('git', ['pull', '--ff-only', 'origin', branch]);
    return;
  }

  if (remoteBranchExists(branch)) {
    run('git', ['switch', '--track', `origin/${branch}`]);
    run('git', ['pull', '--ff-only', 'origin', branch]);
    return;
  }

  run('git', ['switch', '-c', branch, baseRef]);
  run('git', ['push', '-u', 'origin', branch]);
};

export const waitForPagesWorkflow = async (commitSha) => {
  const workflow = 'deploy-pages.yml';

  for (let attempt = 1; attempt <= 60; attempt += 1) {
    const result = run('gh', [
      'run',
      'list',
      '--workflow',
      workflow,
      '--branch',
      'main',
      '--limit',
      '10',
      '--json',
      'databaseId,headSha,status,conclusion,url',
    ], { capture: true, allowFailure: true });

    if (result.status === 0) {
      const runs = JSON.parse(result.stdout || '[]');
      const runForCommit = runs.find((entry) => entry.headSha === commitSha);
      if (runForCommit) {
        if (runForCommit.status === 'completed' && runForCommit.conclusion === 'success') {
          process.stdout.write(`GitHub Pages workflow 완료: ${runForCommit.url}\n`);
          return;
        }
        if (runForCommit.status === 'completed') {
          process.stderr.write(`GitHub Pages workflow 실패: ${runForCommit.url}\n`);
          process.exit(1);
        }
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  process.stderr.write('GitHub Pages workflow 완료를 제한 시간 안에 확인하지 못했습니다.\n');
  process.exit(1);
};

export const smokeTestProduction = async () => {
  const liveUrl = 'https://vioreai.com/';
  const fetchHtml = async (url) => {
    const response = await fetch(url, { redirect: 'follow' });
    if (!response.ok) throw new Error(`${url} 응답 실패: ${response.status}`);
    return response.text();
  };
  const assetSignature = (html) => [...html.matchAll(/\/assets\/[^"'\s>]+/g)]
    .map((match) => match[0])
    .sort()
    .join('\n');

  const expectedHtml = existsSync('out/index.html') ? readFileSync('out/index.html', 'utf8') : '';
  const expectedSignature = assetSignature(expectedHtml);

  for (let attempt = 1; attempt <= 24; attempt += 1) {
    const liveSignature = assetSignature(await fetchHtml(liveUrl));
    if (!expectedSignature || (liveSignature && liveSignature === expectedSignature)) {
      process.stdout.write(`온라인 확인 완료: ${liveUrl}\n`);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  process.stderr.write('GitHub Pages 배포는 완료됐지만 vioreai.com asset 반영 확인이 제한 시간 안에 끝나지 않았습니다.\n');
  process.exit(1);
};
