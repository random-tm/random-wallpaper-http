import _ from "lodash";
import config from "../../config/config.js";

export default (imageDB) => {
    const numberToSelect = config.random_select_max;

    let dbCopy = _.cloneDeep(imageDB);
    let max = 0;
    let prevFilter = dbCopy;
    let currentFilter = dbCopy;
    while(true){
        max = getHighestOccuranceCount(currentFilter);
        currentFilter = filterCount(currentFilter, max);
        if(Object.keys(currentFilter.images).length == 0){
            return prevFilter;
        }
        if(Object.keys(currentFilter.images).length < numberToSelect){
            return prevFilter;
        }
        prevFilter = currentFilter;
    }

}

const getHighestOccuranceCount = (imageDB) => {
    let count = 0;
    for(const image in imageDB.images){
        const imageData = imageDB.images[image];
        if(imageData.times_loaded > count){
            count = imageData.times_loaded;
        }
    }
    return count;
}

const filterCount = (imageDB, maxCount) => {
    let allowedImages = {images: {}};
    for(const image in imageDB.images){
        const imageData = imageDB.images[image];
        if(imageData.times_loaded != maxCount){
            allowedImages.images[image] = imageData;
        }
    }
    return allowedImages;
}