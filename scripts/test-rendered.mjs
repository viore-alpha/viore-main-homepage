import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { once } from "node:events";

async function reservePort() {
  const server = createServer();
  server.unref();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  if (!address || typeof address === "string") {
    server.close();
    throw new Error("Unable to reserve a test port");
  }
  const { port } = address;
  server.close();
  await once(server, "close");
  return port;
}

async function waitForServer(baseUrl, child, output) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`Next.js test server exited early (${child.exitCode})\n${output.join("")}`);
    }
    try {
      const response = await fetch(`${baseUrl}/ko`, { redirect: "manual" });
      if (response.status > 0) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for Next.js test server\n${output.join("")}`);
}

const port = await reservePort();
const baseUrl = `http://127.0.0.1:${port}`;
const output = [];
const nextServer = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)],
  {
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  },
);

for (const stream of [nextServer.stdout, nextServer.stderr]) {
  stream.setEncoding("utf8");
  stream.on("data", (chunk) => output.push(chunk));
}

let exitCode = 1;
try {
  await waitForServer(baseUrl, nextServer, output);
  const testProcess = spawn(process.execPath, ["--test", "tests/rendered-html.test.mjs"], {
    env: { ...process.env, VIORE_TEST_BASE_URL: baseUrl },
    stdio: "inherit",
  });
  [exitCode] = await once(testProcess, "exit");
} finally {
  nextServer.kill("SIGTERM");
  if (nextServer.exitCode === null) await once(nextServer, "exit");
}

process.exitCode = typeof exitCode === "number" ? exitCode : 1;
