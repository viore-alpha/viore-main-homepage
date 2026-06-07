import { ensureCleanWorktree, installDependencies, run } from './workflow-lib.mjs';

ensureCleanWorktree();
run('git', ['fetch', 'origin', '--prune']);
run('git', ['switch', 'develop']);
run('git', ['pull', '--ff-only', 'origin', 'develop']);

if (process.argv.includes('--install')) installDependencies();

process.stdout.write('develop 브랜치가 최신 상태입니다.\n');
