import colors from "../processing/colors.js";
import getImageSize from "../processing/dimensions.js";
import config from "../config/config.js";

export default (newFiles, imageDB) => {
    return new Promise((resolve, reject) => {
        const colorPromises = [];
        for(const file of newFiles){
            const dimensions = getImageSize(file);
            const colorPromise = colors(file);
            colorPromises.push(colorPromise);
            imageDB.images[file] = {
                path: `${config.path}/${file}`,
                times_loaded: 0,
                blacklisted_devices: [],
                dimension_x: dimensions.width,
                dimension_y: dimensions.height,
                color_r: 0,
                color_g: 0,
                color_b: 0
            }
        }
        Promise.all(colorPromises).then((files) => {
            for(const file of files){
                const colors = file.colors;
                imageDB.images[file.name].color_r = colors[0];
                imageDB.images[file.name].color_g = colors[1];
                imageDB.images[file.name].color_b = colors[2];
            }
            resolve(imageDB);
        })
    })
}