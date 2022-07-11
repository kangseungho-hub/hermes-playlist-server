import { Router } from "express"
import * as qs from "qs"
const authRouter = Router()
import { getTokens } from './auth_api';

const GOOGLE_AUTH_CODE_URL = "https://accounts.google.com/o/oauth2/v2/auth"
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"

const KAKAO_AUTH_CODE_URL = "https://kauth.kakao.com/oauth/authorize"
const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token"

authRouter.get("/google", (req, res) => {
    const googleOAuthURL = generateURL(GOOGLE_AUTH_CODE_URL, {
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: "https://localhost:8000/auth/google/callback",
        response_type: "code",
        scope: "https://www.googleapis.com/auth/userinfo.profile"
    })

    res.redirect(googleOAuthURL)
})

authRouter.get("/google/callback", (req, res) => {
    const { code } = req.query

    if (code) {
        getTokens({
            code: code.toString(),
            provider: "google",
        })
            .then((tokens) => {
                res.send("done")
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    res.send
})


authRouter.get("/kakao", (req, res) => {
    const kakaoAuthURL = generateURL(KAKAO_AUTH_CODE_URL, {
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_uri: "https://localhost:8000/auth/kakao/callback",
        response_type: "code"
    })
    res.redirect(kakaoAuthURL)
})

authRouter.get("/kakao/callback", (req, res) => {
    const { code } = req.query

    if (code) {
        getTokens({
            code: code.toString(),
            provider: "kakao",
        })
            .then((tokens) => {
                res.send("done")
            })
            .catch(err => {
                res.send(err)
            })
    }

})

authRouter.get("/facebook", (req, res) => {
})



export default authRouter


function generateURL(url: string, params?: Object): string {
    let result: string = "";

    //host
    if (url[url.length - 1] == '/') {
        url = url.substring(0, url.length - 1)
    }

    const query = qs.stringify(params)

    result = url + "?" + query;

    return result
}