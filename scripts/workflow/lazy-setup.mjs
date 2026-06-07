import {
  currentBranch,
  ensureBranch,
  installDependencies,
  run,
  worktreeStatus,
} from './workflow-lib.mjs';

const optional = (command, args) => run(command, args, {
  allowFailure: true,
  capture: true,
});

if (worktreeStatus().length > 0) {
  process.stderr.write('작업트리가 깨끗하지 않습니다. 세팅 전 변경사항을 먼저 커밋하거나 정리하세요.\n');
  process.exit(1);
}

run('git', ['fetch', 'origin', '--prune']);
run('git', ['switch', 'main']);
run('git', ['pull', '--ff-only', 'origin', 'main']);
ensureBranch('develop', 'origin/main');
ensureBranch('production', 'origin/main');
run('git', ['switch', 'develop']);
installDependencies();
run('node', ['scripts/workflow/install-hooks.mjs']);

const ghAuth = optional('gh', ['auth', 'status']);

process.stdout.write('\nViore homepage workflow setup complete.\n');
process.stdout.write(`Current branch: ${currentBranch()}\n`);
process.stdout.write('Next: say "작업 시작" to Codex, or run npm run lazy:start.\n');
process.stdout.write(ghAuth.status === 0 ? 'GitHub CLI: logged in.\n' : 'GitHub CLI: not logged in. Run gh auth login before deploys.\n');
