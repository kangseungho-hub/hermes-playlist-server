import DBManager from "./DB/dbmanager";
import * as mysql from "mysql"

const Errors = {
    queryError: new Error("error raised while executing query"),
    userNotFound: new Error("user not found")
}

export class User {
    id: string
    username: string
    email: string
    pfp: string
    constructor(row) {
        this.id = row.id
        this.username = row.username
        this.email = row.email
        this.pfp = row.pfp
    }
}

//passport 인증 후 oauth server의 response값 정제해서 쿼리로 넘겨주는 user information
export type UserProfile = {
    id: string, // oauth_id
    username: string,
    email: string,
    pfp: string,
}


// errorcode는 이 module import하는 곳에서 잡아야 함. 여기선 그냥 mysql module에서 뱉는 에러 그대로 뱉을거
class UserManager extends DBManager {
    constructor() {
        super()
    }

    //create
    createUser(profile: UserProfile): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            const q = `INSERT INTO user (id, username, email, pfp) VALUES ('${profile.id}', '${profile.username}', '${profile.email}', '${profile.pfp}')`
            console.log(q)
            console.log(profile)
            this.query(q, (err, results, fields) => {
                if (err) {
                    reject(err)
                    return
                }

                this.getUser(profile.id)
                    //user가 문제없이 생성되었음
                    .then(user => {
                        resolve(user)
                    })
                    //user가 문제없이 생성되었지만 getUser를 하는동안 문제가 발생함
                    .catch(err => reject(err))
            })
        })
    }


    //read
    getUser(id: string): Promise<User | null> {
        const q = `SELECT * FROM user WHERE id=${id}`
        console.log(q)
        return new Promise((resolve, reject) => {
            this.query(q, (err, results, fields) => {
                if (err) {
                    reject(Errors.queryError)
                    return
                }

                if (results.length > 0) {
                    resolve(new User(results[0]))
                } else {
                    resolve(null)
                }
            })
        })
    }

    //update
    updateUser() {
        return new Promise((resolve, reject) => {

        })
    }

    //delete
    deleteUser() {
        return new Promise((resolve, reject) => {

        })
    }


}

export const userManager = new UserManager();
