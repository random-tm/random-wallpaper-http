import fs from "fs";
import config from "../config/config.js"

export default () => {
    const filesRead = [];
    return new Promise((resolve, reject) => {
        fs.readdir(config.path, "utf-8", (err, files) => {
            for (const file of files) {
                const pendingRead = new Promise((resolve, reject) => {
                    fs.stat(`${config.path}/${file}`, (err, stats) => {
                        resolve({ stats: stats, fileName: file });
                    });
                })
                filesRead.push(pendingRead);
            }
            resolve(filesRead);
        })
    })
}