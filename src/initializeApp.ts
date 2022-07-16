import * as express from "express"
import { join } from "path"

const session = require("express-session")
import * as MySQLStore from "express-mysql-session"
import authRouter from "./auth/route"

import { User } from "./Models/user"
const cookiesParser = require("cookie-parser")

declare module "express-session" {
    export interface SessionData {
        user: User
    }
}


export function initApp() {
    let app = express()

    // initSessionStore(app)
    initMiddleware(app)
    initStaticPath(app)

    bindRouter(app)

    app.use(cookiesParser())

    //spa app 
    app.get("/", (req, res) => {
        res.sendFile(join(__dirname, "../views/", "public", "main.html"))
    })


    return app
}

// function initSessionStore(app: express.Application) {
//     const mysqlStore = MySQLStore(session)

//     const sessionStore = new mysqlStore({
//         host: process.env.DB_HOST,
//         port: 3306,
//         user: process.env.DB_USER,
//         password: process.env.DB_PW,
//         database: process.env.DB_NAME,
//     })

//     app.use(session({
//         secret: process.env.APP_SECRET,
//         cookie: {
//             secure: true
//         },
//         store: sessionStore,
//         resave: true,
//         saveUninitialized: false
//     }))
// }

function initMiddleware(app: express.Application) {
    app.use(express.urlencoded({
        extended: true
    }))
}

function initStaticPath(app: express.Application) {
    //svelte index.html only use build/bundle.js build/bundle.css
    // + global.css
    app.use(express.static(join(__dirname, "../views/public")))
}

function bindRouter(app: express.Application) {
    app.use("/auth", authRouter)
}

function bindWsRouter(app: express.Application) {

}