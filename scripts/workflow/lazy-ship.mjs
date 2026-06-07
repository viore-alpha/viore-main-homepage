import {
  currentBranch,
  ensureBranch,
  ensureCleanWorktree,
  installDependencies,
  read,
  run,
  smokeTestProduction,
  verifyFull,
  waitForPagesWorkflow,
} from './workflow-lib.mjs';

ensureCleanWorktree();
run('git', ['fetch', 'origin', '--prune']);
ensureBranch('develop', 'origin/main');
installDependencies();
verifyFull();

ensureBranch('production', 'origin/main');
run('git', ['merge', '--ff-only', 'develop']);
run('git', ['push', 'origin', 'production'], {
  env: { VIORE_ALLOW_PROTECTED_PUSH: '1' },
});

run('git', ['switch', 'main']);
run('git', ['pull', '--ff-only', 'origin', 'main']);
run('git', ['merge', '--ff-only', 'production']);
const deployedSha = currentBranch() === 'main' ? read('git', ['rev-parse', 'HEAD']) : '';
run('git', ['push', 'origin', 'main'], {
  env: { VIORE_ALLOW_PROTECTED_PUSH: '1' },
});

await waitForPagesWorkflow(deployedSha);
await smokeTestProduction();
run('git', ['switch', 'develop']);

process.stdout.write(`프로덕션 배포 완료. 현재 브랜치: ${currentBranch()}\n`);
