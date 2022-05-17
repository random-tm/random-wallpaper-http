import getColors from "get-image-colors";
import config from "../config/config.js";

export default (file) => {
    return new Promise((resolve, reject) => {
        getColors(`${config.path}/${file}`, {count: 1}).then((colors) => {
            const colorRgb = colors[0].rgb();
            const fileColorMap = {name: file, colors: colorRgb};
            resolve(fileColorMap);
        }).catch((err) => {
            const fileColorMap = {name: file, colors: [-1, -1, -1]};
            resolve(fileColorMap);
        })
    })
}