const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes("node_modules") && !file.includes(".next")) {
        results = results.concat(walk(file));
      }
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      results.push(file);
    }
  });
  return results;
}
const files = walk("./");
files.forEach(file => {
  try {
    const result = babel.transformFileSync(file, {
      comments: false,
      presets: ["@babel/preset-react", "@babel/preset-typescript"],
      configFile: false
    });
    fs.writeFileSync(file, result.code, "utf8");
    console.log(`Cleaned: ${file}`);
  } catch (err) {
    console.error(`Error processing ${file}:`, err);
  }
});