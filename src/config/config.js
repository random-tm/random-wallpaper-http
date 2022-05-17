import fs from "fs";
const data = fs.readFileSync("./config.json", "utf-8");
const parsedData = JSON.parse(data);
export default parsedData;