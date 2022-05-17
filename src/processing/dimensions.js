import imageSize from "image-size";
import config from "../config/config.js";

export default (file) => {
    const filePath = `${config.path}/${file}`;
    return imageSize(filePath);
}