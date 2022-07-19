import * as mysql from "mysql"
import { env } from "process"

class DBManager {
    connection: mysql.Connection
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: env.DB_USER,
            password: env.DB_PW,
            database: env.DB_NAME,
            port: parseInt(env.DB_PORT)
        })
    }

    query(q: string, cb) {
        this.connection.query(q, cb)
    }
}

export default DBManager