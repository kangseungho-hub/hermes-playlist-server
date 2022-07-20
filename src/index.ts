import { initSocketIOServer } from './initializeSocketIO';
const fs = require("fs")
const { join } = require("path")
require("dotenv").config()
const expressListRoutes = require("express-list-routes")

const https = require("https")
const { initApp } = require("./initializeApp")
const app = initApp()

const PORT = process.env.PORT || 8000

const server = https.createServer(
    {
        key: fs.readFileSync(join(__dirname, "../ssl/private.key")),
        cert: fs.readFileSync(join(__dirname, "../ssl/root.crt")),
    },
    app
)

initSocketIOServer(server)


//route하고있는 경로를 출력
console.log(expressListRoutes(app))

server.listen(PORT, () => {
    console.log(`server listening on ${process.env.PORT}`)
})
