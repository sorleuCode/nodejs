const fsPromises = require("fs").promises;
const { appendFile } = require("fs");
const path = require("path");

const fileops = async () => {
    try {
        const data = await fsPromises.readFile(
            path.join(__dirname, "Files", "gig.txt"), "utf8"
        )
        console.log(data)

       await fsPromises.unlink(path.join(__dirname, "files", "gig.txt"))

       await fsPromises.writeFile(path.join(__dirname, "files", "promiseWrite.txt"), data)

       await fsPromises.appendFile(path.join(__dirname, "files", "promiseWrite.txt"), "\n Nice to meet you", "utf8");

       await fsPromises.rename(path.join(__dirname, "files", "promiseWrite.txt"), path.join(__dirname, "files", "promiseComplete.txt"))

       const oyee = await fsPromises.readFile(path.join(__dirname, "files", "promiseComplete.txt"), "utf8")
       console.log(oyee)
    } catch (error) {
        console.log(error)
    }
}

fileops();