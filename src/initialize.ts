import * as express from "express"
import * as expressSvelte from "express-svelte"
import { join } from "path"

export function initApp() {
    const app = express()

    app.use(expressSvelte({
        viewsDirname: join(__dirname, "../views"),
        bundlesDirname: join(__dirname, "../views/"),
    }))

    //svelte only use build/bundle.js build/bundle.css
    // + global.css
    app.use(express.static(join(__dirname, "../views/public")))

    app.get("/", (req, res) => {
        res.sendFile(join(__dirname, "../views/", "public", "index.html"))
    })

    return app
}

