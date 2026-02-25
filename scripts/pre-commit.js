import fs from "fs";
import path from "path";
import { execSync } from "child_process";

async function init() {
  const pkgPath = path.resolve(process.cwd(), "package.json");
  const pack = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

  const currentVersion = pack.version;
  const parts = currentVersion.split(".");

  // Increment only the last part (Patch)
  parts[parts.length - 1] = parseInt(parts[parts.length - 1], 10) + 1;
  const newVersion = parts.join(".");

  pack.version = newVersion;
  fs.writeFileSync(pkgPath, JSON.stringify(pack, null, 2), "utf8");

  // CRITICAL: Stage the change so it's included in the commit
  execSync("git add package.json");

  console.log(`✅ Version bumped: ${currentVersion} -> ${newVersion}`);
}

init();
