import { rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

if (process.platform === 'win32') {
  const result = spawnSync(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', 'if exist out rmdir /s /q out'], {
    stdio: 'inherit',
    shell: false,
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
} else {
  rmSync('out', { recursive: true, force: true });
}
