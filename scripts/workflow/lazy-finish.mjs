import {
  checkoutDailyBranch,
  currentBranch,
  dailyBranch,
  isAncestor,
  protectedBranches,
  run,
  verifyFull,
  worktreeStatus,
} from './workflow-lib.mjs';

const originalBranch = currentBranch();
const branchName = dailyBranch();
const message = process.argv.slice(2).join(' ').trim() || `work: ${branchName}`;

if (!originalBranch) {
  process.stderr.write('현재 브랜치를 확인할 수 없습니다.\n');
  process.exit(1);
}

run('git', ['fetch', 'origin', '--prune']);

let stashed = false;
if (originalBranch !== branchName) {
  if (worktreeStatus().length > 0) {
    run('git', ['stash', 'push', '-u', '-m', `lazy-finish-${branchName}`]);
    stashed = true;
  }

  checkoutDailyBranch(branchName, originalBranch);

  if (isAncestor('HEAD', originalBranch)) {
    run('git', ['merge', '--ff-only', originalBranch]);
  } else if (!protectedBranches.has(originalBranch) && !isAncestor(originalBranch, 'HEAD')) {
    process.stderr.write(`${originalBranch} 변경을 ${branchName}에 fast-forward로 반영할 수 없습니다.\n`);
    process.exit(1);
  }

  if (stashed) run('git', ['stash', 'pop']);
}

verifyFull();

if (worktreeStatus().length > 0) {
  run('git', ['add', '-A']);
  run('git', ['commit', '-m', message]);
}

run('git', ['push', '-u', 'origin', 'HEAD']);
run('git', ['switch', 'develop']);
run('git', ['pull', '--ff-only', 'origin', 'develop']);
run('git', ['merge', '--ff-only', branchName]);
run('git', ['push', 'origin', 'develop'], {
  env: { VIORE_ALLOW_PROTECTED_PUSH: '1' },
});

process.stdout.write(`작업 종료 완료: ${branchName} -> develop\n`);
process.stdout.write(`현재 브랜치: ${currentBranch()}\n`);
