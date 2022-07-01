import * as express from "express"
import * as fs from "fs"
import { join } from "path"
require("dotenv").config()
const app = express()

import * as https from "https"

app.get("/", (req, res) => {
    res.send("hello world!")
})

const server = https.createServer(
    {
        key: fs.readFileSync(join(__dirname, "../ssl/private.key")),
        cert: fs.readFileSync(join(__dirname, "../ssl/root.crt")),
    },
    app)

server.listen(8000, () => {
    console.log(process.env.MODE == "development" ? "###DEVELOPMENT Mode" : "###production Mode")
    console.log("listening on port 8000")
})
