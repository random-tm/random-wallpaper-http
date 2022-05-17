import checkForNewFiles from "./checkForNewFiles.js";
import loadDB from "./load.js";
import config from "../config/config.js";

export default () => {
    return new Promise((resolve, reject) => {

        loadDB().then(imageDB => {
            console.log(imageDB);
            const updateInterval = config.update_time * 1000;
            setInterval(() => {
                checkForNewFiles(imageDB);
            }, updateInterval);
            resolve(imageDB);
        })

    })
}