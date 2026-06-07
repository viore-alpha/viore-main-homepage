import {
  checkoutDailyBranch,
  currentBranch,
  dailyBranch,
  ensureCleanWorktree,
  installDependencies,
  isAncestor,
  latestWorkRef,
  run,
} from './workflow-lib.mjs';

const branchName = dailyBranch();

ensureCleanWorktree();
run('git', ['fetch', 'origin', '--prune']);
run('git', ['switch', 'develop']);
run('git', ['pull', '--ff-only', 'origin', 'develop']);

const baseRef = latestWorkRef();
checkoutDailyBranch(branchName, baseRef);

if (isAncestor('HEAD', 'origin/develop')) {
  run('git', ['merge', '--ff-only', 'origin/develop']);
} else if (!isAncestor('origin/develop', 'HEAD')) {
  process.stderr.write(`${branchName}와 origin/develop 이력이 갈라져 있습니다. 작업 전 수동 확인이 필요합니다.\n`);
  process.exit(1);
}

installDependencies();

process.stdout.write(`작업 준비 완료: ${currentBranch()}\n`);
process.stdout.write(`기준 브랜치: ${baseRef}\n`);
