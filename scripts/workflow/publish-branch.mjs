import { currentBranch, protectedBranches, run } from './workflow-lib.mjs';

const branch = currentBranch();
if (!branch) {
  process.stderr.write('현재 브랜치를 확인할 수 없습니다.\n');
  process.exit(1);
}

if (protectedBranches.has(branch)) {
  process.stderr.write(`${branch} 브랜치는 직접 publish 대상이 아닙니다. feature/fix/hotfix 브랜치에서 실행하세요.\n`);
  process.exit(1);
}

run('git', ['push', '-u', 'origin', 'HEAD']);
process.stdout.write(`원격 브랜치가 준비됐습니다: ${branch}\n`);
