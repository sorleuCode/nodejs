const fs = require("fs");

const readStream = fs.createReadStream("./files/lorem.txt", {encoding: "utf8"});

const writeStream = fs.createWriteStream("./files/new-lorem.text");

readStream.pipe(writeStream)