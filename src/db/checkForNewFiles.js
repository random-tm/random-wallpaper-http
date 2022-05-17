import fs from "fs";
import config from "../config/config.js";
import _ from "lodash";
import addFiles from "./addFiles.js";

export default (imageDB) => {
    const files = Object.keys(imageDB.images);
    fs.readdir(config.path, "utf-8", (err, data) => {
        if(files.length != data.length){
            const filesToAdd = _.difference(data, files);
            addFiles(filesToAdd, imageDB).then((updatedDB) => {
                fs.writeFile("./images.json", JSON.stringify(updatedDB), (err) => {
                    console.error(err);
                });
            })
        }
    })
}