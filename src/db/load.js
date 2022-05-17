import fs from "fs";

import config from "../config/config.js";
import addFiles from "./addFiles.js";

export default () => {

    const versionCurrent = "0.0.1";

    return new Promise((resolve, reject) => {
        
        let imageDbExists = fs.existsSync("./images.json");
        if(config.debug){
            imageDbExists = false
        }
        
        if(imageDbExists){
            const db = JSON.parse(fs.readFileSync("./images.json", "utf-8"));
            if(db.version != versionCurrent){
                //TODO DB migration Code here
            }
            resolve(db);
        }
        
        if(!imageDbExists){
            fs.readdir(config.path, "utf-8", (err, data) => {

                const imageDB = {
                    version: versionCurrent,
                    images: {}
                };

                addFiles(data, imageDB).then((dataToWrite) => {
                    fs.writeFileSync("./images.json", JSON.stringify(dataToWrite));
                })

            })
        }

    })
}