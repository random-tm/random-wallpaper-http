import _ from "lodash";
import fs from "fs";
import filterBySize from "./filters/size.js";
import filterByColors from "./filters/color.js";
import filterByDevices from "./filters/device.js";
import frequency from "./filters/frequency.js";

export default (ctx, imageDB) => {
    if(ctx.request.path == "/image"){
        let filteredDB = _.cloneDeep(imageDB);

        const params = ctx.request.body;

        const minX = params.min_x;
        const minY = params.min_y;
        if(minX && minY){
            filteredDB = filterBySize(imageDB, minX, minY);
        }

        const colorR = params.color_r;
        const colorG = params.color_g;
        const colorB = params.color_b;
        if(colorR && colorG && colorB){
            filteredDB = filterByColors(filteredDB, colorR, colorG, colorB);
        }

        const device = params.device;
        //If a blacklist is set in any way on image do not return it
        const followAllBlacklists = params.blacklistActive;

        if(device || followAllBlacklists){
            filteredDB = filterByDevices(filteredDB, device, followAllBlacklists);
        }

        filteredDB = frequency(filteredDB);

        const imageKeys = Object.keys(filteredDB.images);
        const selectedImageIndex = _.random(0, imageKeys.length - 1);
        const selectedImageKey = imageKeys[selectedImageIndex];
        const selectedImage = filteredDB.images[selectedImageKey];

        const db = JSON.parse(fs.readFileSync("./images.json", "utf-8"));
        db.images[selectedImageKey].times_loaded = db.images[selectedImageKey].times_loaded + 1;
        fs.writeFileSync("./images.json", JSON.stringify(db));
        imageDB.images[selectedImageKey].times_loaded = db.images[selectedImageKey].times_loaded + 1;

        return selectedImage;
    }
}