const logEvent = require("./logEvent");
const path = require("path");
const http = require("http");
const fs = require("fs");
const fsPromise = require("fs").promises;




const EventEmitter = require("events")

class MyEmitter extends EventEmitter{}

const emitter = new MyEmitter();
emitter.on("log", (msg, fileName) => logEvent(msg, fileName))


const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromise.readFile(filePath, !contentType.includes("image") ? "utf8" : "");
        const data = contentType === "application/json" ? JSON.parse(rawData) : rawData
        response.writeHead(
            filePath.includes("404.html") ? 404 : 200,
            {"Content-Type" : contentType});
        response.end(
            contentType === "application/json" ? JSON.stringify(data) : data
        );

    } catch (error) {
        console.log(error);
        emitter.emit("log", `${error.name}: ${error.message}`, `errorLog.txt`);

        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
    emitter.emit("log", `${req.url}\t${req.method}`, `reqLog.txt`);

    const extension = path.extname(req.url)

    let contentType;
    switch (extension) {
        case ".css":
            contentType = "text/css"
            break;
        case ".js":
            contentType = "text/javascript"
            break;
        case ".json":
            contentType = "application/json"
            break;
        case ".jpg":
            contentType = "image/jpeg"
            break;
        case ".png":
            contentType = "image/png"
            break;
        case ".txt":
            contentType = "text/plain"
            break;
    
        default:
            contentType = "text/html";
            break;
    }

    let filePath;

    if (contentType === "text/html" && req.url === "/") {
        filePath = path.join(__dirname, "views", "index.html")
    } else if (contentType === "text/html" && req.url.slice(-1) === "/") {
        filePath = path.join(__dirname, "views", req.url);
    } else if (contentType === "text/html"){
        filePath = path.join(__dirname, "views", req.url)
    } else {
        filePath = path.join(__dirname, req.url)
    }
    if(!extension && req.url.slice(-1) !== "/") filePath += ".html"

    const fileExists = fs.existsSync(filePath);

    if(fileExists) {

        serveFile(filePath, contentType, res)

    } else {
        switch(path.parse(filePath).base) {
            case "old-page.html" :
                res.writeHead(301, {"Location" : "/new-page.html"})
                break;

            case  "www-page.html" :
                res.writeHead(301, {"location" : "/"});
                res.end();
                break
            default:
                serveFile(path.join(__dirname, "views", "404.html"), 'text/html', res)

        }
    }
});


server.listen(PORT, () => console.log(`server running on port ${PORT}`))




   