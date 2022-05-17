import Koa from "koa";
import bodyParser from "koa-bodyparser";
import fs from "fs";

import config from "./config/config.js";
import init from "./db/init.js";
import fetchImage from "./image/fetchImage.js";


const app = new Koa();
app.use(bodyParser());
// logger

init().then((imageDB) => {

    app.use(async ctx => {
        const imageData = fetchImage(ctx, imageDB);
        console.log(imageData);
        const imageFile = fs.readFileSync(imageData.path);
        ctx.body = imageFile;
    });

    app.listen(config.port);
})