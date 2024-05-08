const fsPromises = require("fs").promises;
const path = require("path");

const fileOper = async () => {
    try {
        const data = await fsPromises.readFile(
            path.join(__dirname, "media", "soliu.txt"), "utf8"
        )
        console.log(data)

       await fsPromises.unlink(path.join(__dirname, "media", "soliu.txt"))

       await fsPromises.writeFile(path.join(__dirname, "media", "olatunde.txt"), data)

       await fsPromises.appendFile(path.join(__dirname, "media", "olatunde.txt"), "\n I am a boy", "utf8");

       await fsPromises.rename(path.join(__dirname, "media", "olatunde.txt"), path.join(__dirname, "media", "alfulanny.txt"))

       const myName = await fsPromises.readFile(path.join(__dirname, "media", "alfulanny.txt"), "utf8")
       console.log(myName)

       await fsPromises.unlink(path.join(__dirname, "media", "alfulanny.txt"))
    } catch (error) {
        console.log(error)
    }
}

fileOper();