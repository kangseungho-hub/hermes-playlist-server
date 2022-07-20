import { Server, Socket } from "socket.io"
import { parse } from "cookie"
import { verify } from "jsonwebtoken"
import hermes from "./yt/hermes"

export function initSocketIOServer(server) {
    const ioServer = new Server(server)

    ioServer.on("connection", (socket) => {
        socket.use((e, next) => {
            const headers = socket.request.headers

            //does not exist any cookies at client browser
            if (headers.cookie == undefined) {
                socket.emit("authentication-failed")
                return
            }

            const cookies = parse(headers.cookie)

            const jwt = cookies.token

            //jwt is not exit at client borwser
            if (jwt == undefined) {
                socket.emit("authentication-failed")
                return
            }

            verify(jwt, process.env.APP_SECRET, {
                algorithms: ["HS256"]
            }, (err, user) => {
                //jwt verify failed
                if (err) {
                    socket.emit("authentication-failed")
                    return
                }
                //jwt verify success
                socket.emit("authentication-success", (user))
                next()
            })
        })

        initSocket(socket)
    })
}

function initSocket(socket: Socket) {
    socket.on("search", (q) => {
        hermes.search({
            q,
            part: "id,snippet",
        }, (videos: Array<any>) => {
            //extract id from videos information
            socket.emit("r-search", videos)
        })
    })
}




