import _ from "lodash";
import config from "../../config/config.js";

export default (imageDB, r, g, b) => {
    const dbCopy = _.cloneDeep(imageDB);
    delete dbCopy.images;
    dbCopy.images = {};

    const rgbOffset = config.rgb_range;

    const maxR = r + rgbOffset;
    const minR = r - rgbOffset;

    const maxG = g + rgbOffset;
    const minG = g - rgbOffset;

    const maxB = b + rgbOffset;
    const minB = b - rgbOffset;

    for(const image in imageDB.images){
        const imageData = imageDB.images[image];
        if(imageData.color_r == -1){
            continue;
        }
        if(imageData.color_r >= minR && imageData.color_r <= maxR){
            if(imageData.color_g >= minG && imageData.color_g <= maxG){
                if(imageData.color_b >= minB && imageData.color_b <= maxB){
                    dbCopy.images[image] = imageData;
                }
            }
        }
    }
    return dbCopy;
}
