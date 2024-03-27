const winston = require('winston');
 
const myCustomLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 4
    },
    colors: {
        error: 'bold yellow',
        warn: 'italic yellow',
        info: 'bold red',
        debug: 'bold red cyanBG'
    }
};
 
const loggerClass = "HUMANOID FRONTEND"
winston.addColors(myCustomLevels.colors);
const logger = winston.createLogger({
    levels: myCustomLevels.levels,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format: 'DD/MM/YYYY, HH:mm:ss'
        }),
        winston.format.printf(info => {
            const level = info.level;
            // console.log(level);
            // console.log(info);
            return `\x1b[32m[NODE] -\x1b[0m ${info.timestamp} - \x1B[33m[\x1B[22m${level}\x1B[33m]\x1B[22m: \x1b[32mLOG\x1b[0m [${loggerClass}] ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.Console()
    ]
});
 
let NODE_ENV = process.env.NODE_ENV || "development";
require('dotenv').config({ path: ".env." + NODE_ENV });
logger.info(`ENV :${NODE_ENV}`);
 
 
let PORT = process.env.PORT;
let path = require('path');
if (!PORT) {
    logger.error(`PORT NOT DEFINED!`);
    return
}
logger.info(`PORT :${PORT}`);
 
const express = require('express');
const app = express();
 
app.use(express.static(path.join(__dirname, 'build')))
// app.use(express.static(path.join(__dirname, 'v3')))
 
 
app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});
 
app.listen(PORT, () => {
    logger.info(`SERVER STARTED ON PORT ${PORT}`)
})