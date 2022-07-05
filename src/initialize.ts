import * as express from "express"
import * as expressSvelte from "express-svelte"
import { join } from "path"

import * as session from "express-session"
import * as MySQLStore from "express-mysql-session"

export function initApp() {
    const app = express()


    initSessionStore(app)
    initMiddleware(app)
    initStaticPath(app)

    bindRouter(app)

    //render single page
    app.get("/", (req, res) => {
        res.sendFile(join(__dirname, "../views/", "public", "index.html"))
    })

    return app
}

function initSessionStore(app: express.Application) {
    const mysqlStore = MySQLStore(session)

    const sessionStore = new mysqlStore({
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME,
    })

    app.use(session({
        secret: process.env.APP_SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }))
}

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

import authRouter from "./auth/router"

function bindRouter(app: express.Application) {
    //route /auth/*
    app.use("/auth", authRouter)
}