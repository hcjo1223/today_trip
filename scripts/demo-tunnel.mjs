import fs from "node:fs";
import http from "node:http";
import { spawn } from "node:child_process";
import { bin, install } from "cloudflared";

const PORT = Number(process.env.PORT || 3000);
const TARGET_URL = `http://localhost:${PORT}`;
const tunnelOnly = process.argv.includes("--tunnel-only");

function checkServerReady(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(res.statusCode && res.statusCode < 500);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await checkServerReady(url)) {
      return true;
    }
    await new Promise((r) => setTimeout(r, 800));
  }
  return false;
}

async function main() {
  if (!fs.existsSync(bin)) {
    console.log("[demo] cloudflared 바이너리를 설치합니다...");
    await install(bin);
  }

  let nextProc = null;
  const alreadyRunning = await checkServerReady(TARGET_URL);

  if (!alreadyRunning && !tunnelOnly) {
    console.log(`[demo] Next.js 개발 서버를 시작합니다 (${TARGET_URL})...`);
    nextProc = spawn("npx", ["next", "dev", "-p", String(PORT)], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    const ready = await waitForServer(TARGET_URL);
    if (!ready) {
      console.error("[demo] Next.js 서버 시작 대기 시간이 초과되었습니다.");
      process.exit(1);
    }
  } else {
    console.log(`[demo] 실행 중인 서버(${TARGET_URL})를 감지했습니다.`);
  }

  console.log("[demo] Cloudflare Quick Tunnel 연결을 생성합니다...");
  const cf = spawn(bin, ["tunnel", "--url", TARGET_URL], {
    stdio: ["ignore", "pipe", "pipe"],
  });

  const handleOutput = (data) => {
    const text = data.toString();
    process.stderr.write(text);
    const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
    if (match) {
      console.log("\n==============================================================");
      console.log("  [오늘의여행] 외부 시연·테스트 접속 URL이 생성되었습니다!");
      console.log(`  👉 ${match[0]}`);
      console.log("==============================================================\n");
    }
  };

  cf.stdout.on("data", handleOutput);
  cf.stderr.on("data", handleOutput);

  const cleanup = () => {
    cf.kill("SIGTERM");
    if (nextProc) nextProc.kill("SIGTERM");
    process.exit(0);
  };

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
}

main().catch((err) => {
  console.error("[demo] 오류 발생:", err);
  process.exit(1);
});
