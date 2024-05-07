const fs = require("fs"); //fs means file system
const path = require("path")

// fs.readFile("./files/open.txt" , "utf8", (err, data) => {
//     if(err) throw err
//     console.log(data)
// })

// fs.readFile(path.join(__dirname, "files", "gig.txt"), "utf8", (err, data) => {
//     if (err) throw err
//     console.log(data)


//     fs.writeFile(path.join(__dirname, "files", "gig.txt"), "Yoo we are moving", "utf8", (err, data) => {
//         if (err) throw err
//         console.log("change the content")
//     })

//     fs.appendFile(path.join(__dirname, "files", "gig.txt"), "\n\n Adding more text", (err, data) => {
//         if (err) throw err
//         console.log("code added")
//     })

//     fs.rename(path.join(__dirname, "files", "gig.txt"), path.join(__dirname, "files", "gig.text"), (err, data) => {
//         if (err) throw err
//         console.log("name change")
//     })

//     process.on("uncaughtException", err => {
//         console.error(`There was an uncaught error: ${err}`)
//         process.exit(1)
//     })

// })

fs.writeFile("server.js", `const fsPromises = require("fs").promises;\n\n`, (err) => {
    if (err) throw err;
    console.log("file created")

    fs.appendFile("server.js", `const path = require("path")`, "utf8", (err) => {
        if (err) throw err;
        console.log("content added!")
    })
})