import { readFile } from 'node:fs/promises';
import { URL } from 'node:url';

const root = new URL('../', import.meta.url);
const read = async (path) => readFile(new URL(path, root), 'utf8');

const snapshot = JSON.parse(await read('.viore/architecture-contract.json'));
const markdown = await read('.viore/architecture-contract.md');
const agents = await read('AGENTS.md');
const copilot = await read('.github/copilot-instructions.md');

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

expect(
  snapshot.schemaVersion === 'viore.repository-architecture-snapshot.v1',
  'unexpected snapshot schema',
);
expect(
  /^\d{4}-\d{2}-\d{2}\.\d+$/.test(snapshot.contractVersion),
  'contract version must use YYYY-MM-DD.N',
);
expect(
  snapshot.canonicalRepository === 'viore-alpha/viore-architecture',
  'unexpected canonical repository',
);
expect(
  snapshot.distributionProfile === 'public-safe',
  'the public website must use the public-safe distribution profile',
);
for (const [path, content] of [
  ['architecture-contract.md', markdown],
  ['AGENTS.md', agents],
  ['copilot-instructions.md', copilot],
]) {
  expect(
    content.includes(snapshot.contractVersion),
    `${path} does not include contract version ${snapshot.contractVersion}`,
  );
}
expect(
  agents.includes('.viore/architecture-contract.md'),
  'AGENTS.md must direct agents to the local architecture contract',
);
expect(
  !markdown.includes('service auth')
    && !markdown.includes('detector/transform')
    && !markdown.includes('egress barrier'),
  'the public-safe contract contains internal implementation detail',
);

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `Viore ${snapshot.distributionProfile} architecture snapshot ${snapshot.contractVersion} verified`,
  );
}
