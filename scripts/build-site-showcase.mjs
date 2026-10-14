import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const target = path.join(root, "dist/examples/react");
fs.mkdirSync(target, { recursive: true });
for (const file of ["index.html", "app.js"]) fs.copyFileSync(path.join(root, "examples/react", file), path.join(target, file));
console.log("Packaged public React playground in dist/examples/react.");
