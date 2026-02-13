const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "data", "Human_OM3_MOE_data.csv");

const raw = fs.readFileSync(file, "utf8");
const firstLine = raw.split("\n")[0];

console.log("🔥 RAW HEADER LINE EXACTLY AS IN FILE:");
console.log(firstLine);
console.log("\n🔥 Parsed CSV Headers:");
console.log(firstLine.split(","));  