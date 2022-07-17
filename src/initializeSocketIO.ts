import { Server } from "socket.io"
import { parse } from "cookie"
import { verify } from "jsonwebtoken"

export function initSocketIO(server) {
    const ioServer = new Server(server)
    ioServer.on("connection", (socket) => {

        socket.use((e, next) => {
            const headers = socket.request.headers

            if (headers.cookie == undefined) {
                console.log("cookie is empty")
                socket.emit("authentication-failed")
                return
            }

            const cookies = parse(headers.cookie)

            const jwt = cookies.token

            if (jwt == undefined) {
                console.log("jwt is undefined")
                socket.emit("authentication-failed")
                return
            }

            verify(jwt, process.env.APP_SECRET, {
                algorithms: ["HS256"]
            }, (err, user) => {
                if (err) {
                    socket.emit("authentication-failed")
                }
                next()
            })
        })
    })

}