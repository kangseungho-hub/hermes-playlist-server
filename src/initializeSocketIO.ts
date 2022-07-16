import { Server } from "socket.io"
import { parse } from "cookie"
import { verify } from "jsonwebtoken"

export function initSocketIO(server) {
    const ioServer = new Server(server)
    ioServer.on("connection", (socket) => {

        socket.use((e, next) => {
            const cookies = parse(socket.request.headers.cookie)

            const jwt = cookies.token

            if (jwt == undefined) {
                console.log("client does not authenticated!")
                next()
                return
            }

            const user = verify(jwt, process.env.APP_SECRET, {
                algorithms: ["HS256"]
            })

            next()
        })
    })

}