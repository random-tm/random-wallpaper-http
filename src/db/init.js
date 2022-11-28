import checkForNewFiles from "./checkForNewFiles.js";
import loadDB from "./load.js";
import config from "../config/config.js";
import getFileStats from "../file/getStats.js";
import deleteCorruptFiles from "../file/deleteCorruptFiles.js";

export default () => {
    return new Promise((resolve, reject) => {
        getFileStats().then((filesRead) => {
            Promise.all(filesRead).then((filesData) => {
                deleteCorruptFiles(filesData)
                loadDB().then(imageDB => {
                    console.log(imageDB);
                    const updateInterval = config.update_time * 1000;
                    setInterval(() => {
                        checkForNewFiles(imageDB);
                    }, updateInterval);
                    resolve(imageDB);
                })
            })
        })
    })
}