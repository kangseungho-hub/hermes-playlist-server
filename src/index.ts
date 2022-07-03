import * as fs from "fs"
import { join } from "path"
require("dotenv").config()

import * as https from "https"
import { initApp } from "./initialize"
const app = initApp()

const PORT = process.env.PORT || 8000

const server = https.createServer(
    {
        key: fs.readFileSync(join(__dirname, "../ssl/private.key")),
        cert: fs.readFileSync(join(__dirname, "../ssl/root.crt")),
    },
    app
)

server.listen(PORT, () => {
    console.log(process.env.MODE == "development" ? "###DEVELOPMENT Mode" : "###production Mode")
    console.log(`server listening on ${process.env.PORT}`)
})
