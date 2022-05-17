import _ from "lodash";

export default (imageDB, minX, minY) => {
    const dbCopy = _.cloneDeep(imageDB);
    delete dbCopy.images;
    dbCopy.images = {};

    for(const image in imageDB.images){
        const imageData = imageDB.images[image];
        if(imageData.dimension_x >= minX) {
            if(imageData.dimension_y >= minY){
                dbCopy.images[image] = imageData;
            }
        }
    }
    return dbCopy;
}