const fs = require("fs"); 
const path = require("path")

fs.mkdir("files", (err) => {
    if (err) throw err;
    console.log("folder created")
})
 
const filePath = path.join("./files", "newFile.txt")

fs.writeFile(filePath, "i just created this file", (err) => {
    if (err) throw err;

    console.log("file is created")
})