import _ from "lodash";

export default (imageDB, device, followAllBlacklists) => {
    const dbCopy = _.cloneDeep(imageDB);
    delete dbCopy.images;
    dbCopy.images = {};

    if(followAllBlacklists){
        for(const file in imageDB.images){
            const fileData = imageDB.images[file];
            if(fileData.blacklisted_devices.length > 0){
                continue;
            } else {
                dbCopy.images[image] = imageData;
            }
        }
        return dbCopy;
    }
    if(device){
        for(const file in imageDB.images){
            const fileData = imageDB.images[file];
            if(fileData.blacklisted_devices.find(blackListedDevice => blackListedDevice == device)){
                continue;
            } else {
                dbCopy.images[file] = fileData;
            }
        }
        return dbCopy;
    }
}