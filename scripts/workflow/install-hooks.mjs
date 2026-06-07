import { chmodSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const read = (command, args) => {
  const result = spawnSync(command, args, { encoding: 'utf8', shell: false });
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }
  return result.stdout.trim();
};

const gitDir = read('git', ['rev-parse', '--git-dir']);
const hookPath = join(gitDir, 'hooks', 'pre-push');
const hookBody = `#!/bin/sh
branch="$(git branch --show-current)"
case "$branch" in
  main|production|develop)
    if [ "$VIORE_ALLOW_PROTECTED_PUSH" != "1" ]; then
      echo "Direct push to $branch is blocked locally. Use npm run lazy:finish or npm run lazy:deploy."
      echo "If this is intentional, run: VIORE_ALLOW_PROTECTED_PUSH=1 git push"
      exit 1
    fi
    ;;
esac
`;

mkdirSync(dirname(hookPath), { recursive: true });
writeFileSync(hookPath, hookBody, { encoding: 'utf8' });
chmodSync(hookPath, 0o755);

process.stdout.write(`pre-push 훅이 설치됐습니다: ${hookPath}\n`);
