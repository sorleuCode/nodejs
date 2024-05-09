const {format} = require("date-fns");
const {v4: uuid} = require("uuid");
const fs = require("fs");
const fasPromises = require("fs").promises;
const path = require("path");

const logEvent = async(message, logName) => {
    const dateTime = `${format(new Date(), "yyyMMdd\tHH:mm:ss")}`;
    const logItem = `${dateTime} \t${uuid()}\t ${message} \n`
    console.log(logItem);

    try {
        if (!fs.existsSync(path.join(__dirname, "logs"))) {
            await fasPromises.mkdir(path.join(__dirname, "logs"))
        }

        await fasPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
    } catch (error) {
        
    }
}


const logger = (req, res, next) => {
    logEvent(`${req.method}\t${req.headers.origin}\t ${req.url}`, "reqLog.txt");
    console.log(`${req.method} ${req.path}`);
    next()
}

module.exports = {logEvent, logger};