import { run, worktreeStatus } from './workflow-lib.mjs';

const branchName = process.argv[2];
const branchPattern = /^(feature|fix|chore|docs|hotfix)\/[a-z0-9][a-z0-9._-]*$/;

if (!branchName || !branchPattern.test(branchName)) {
  process.stderr.write('사용법: npm run work:new -- feature/short-name\n');
  process.stderr.write('허용 prefix: feature, fix, chore, docs, hotfix\n');
  process.exit(1);
}

if (worktreeStatus().length > 0) {
  process.stderr.write('작업트리가 깨끗하지 않습니다. 커밋, 스태시, 또는 백업 후 다시 실행하세요.\n');
  process.exit(1);
}

run('git', ['fetch', 'origin', '--prune']);
run('git', ['switch', 'develop']);
run('git', ['pull', '--ff-only', 'origin', 'develop']);
run('git', ['switch', '-c', branchName]);

process.stdout.write(`${branchName} 브랜치가 develop 최신 기준으로 생성됐습니다.\n`);
