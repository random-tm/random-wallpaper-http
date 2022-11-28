import fs from "fs";
import config from "../config/config.js"

export default (files) => {
    for (const file of files) {
        const fileSize = file.stats.size;
        const fileName = file.fileName;
        if (fileSize == 0) {
            fs.rm(`${config.path}/${fileName}`);
        }
    }
}