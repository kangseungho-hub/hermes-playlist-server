import axios from "axios";
import * as qs from "qs";
import { UserProfile } from "../Models/user"

export const Errors = {
    getProfileError: new Error("failed get profile from api server")
}

const API_INFO = {
    "google": {
        app_key: process.env.GOOGLE_APP_KEY,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,

        auth_code_url: "https://accounts.google.com/o/oauth2/v2/auth",
        token_url: "https://oauth2.googleapis.com/token",
        profile_url: "https://people.googleapis.com/v1/people/me",
        getUserProfile: getGoogleUserProfile,

        // id, username, pfp in userinfo.profile 
        // email in userinfo.email
        scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",

        redirect_url: "https://localhost:8000/auth/google/callback",
    },
    "kakao": {
        app_key: undefined,
        client_id: process.env.KAKAO_CLIENT_ID,
        client_secret: process.env.KAKAO_CLIENT_SECRET,

        auth_code_url: "https://kauth.kakao.com/oauth/authorize",
        token_url: "https://kauth.kakao.com/oauth/token",
        profile_url: "https://kapi.kakao.com/v2/user/me",
        getUserProfile: getKakaoUserProfile,

        scope: undefined, //kakao는 default로 id, username, email, pfp를 모두 허용

        //Authorization code를 전송받을 url, token은 redirect_url로 명시만
        redirect_url: "https://localhost:8000/auth/kakao/callback",
    }
}

export const RegisteredAPILabels = Object.keys(API_INFO)

function getGoogleUserProfile(accessToken: string): Promise<UserProfile> {
    return new Promise<any>((resolve, reject) => {
        axios(API_INFO["google"].profile_url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                key: API_INFO['google'].app_key,
                personFields: "names,photos,emailAddresses"
            }
        })
            .then((resp) => {
                resolve({
                    id: resp.data.names[0].metadata.source.id,
                    username: resp.data.names[0].displayName,
                    email: resp.data.emailAddresses[0].value,
                    pfp: resp.data.photos[0].url
                })
            })
            .catch(err => {
                reject(err)
            })
    })
}

function getKakaoUserProfile(accessToken: string): Promise<UserProfile> {
    return new Promise<UserProfile>((resolve, reject) => {
        axios(API_INFO["kakao"].profile_url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((resp) => {
                resolve({
                    id: resp.data.id,
                    username: resp.data.properties.nickname,
                    email: resp.data.kakao_account.email,
                    pfp: resp.data.properties.profile_image,
                })
            })
            .catch(err => {
                reject(err)
            })
    })
}


function generateURL(url: string, params?: Object): string {
    let result: string = "";

    //host
    if (url[url.length - 1] == '/') {
        url = url.substring(0, url.length - 1)
    }

    result += url

    result += "?"

    result += qs.stringify(params)

    return result
}

//other string will be raise error
type provider = "google" | "kakao" | string

type authorization_code = {
    provider: provider,
    code: string,
}


//get access_token, refresh_token from oauth server with authorization code
function getTokens(auth_code: authorization_code): Promise<any> {
    const provider = auth_code.provider

    return axios(API_INFO[provider].token_url, {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded:charset=utf-8"
        },
        params: {
            code: auth_code.code,
            client_id: API_INFO[provider].client_id,
            client_secret: API_INFO[provider].client_secret,
            redirect_uri: API_INFO[provider].redirect_url,
            grant_type: "authorization_code",
        }
    })
}


export function getAuthCodeURL(provider: provider): string {
    return generateURL(API_INFO[provider].auth_code_url, {
        client_id: API_INFO[provider].client_id,
        redirect_uri: API_INFO[provider].redirect_url,
        response_type: "code",
        scope: API_INFO[provider].scope
    })
}

//get user information from oauth api server with authorization code
export function getUserProfile(auth_code: authorization_code): Promise<UserProfile> {
    return new Promise((resolve, reject) => {
        getTokens(auth_code)
            .then((token_resp) => {
                console.log(token_resp.data.access_token)
                const accessToken = token_resp.data.access_token

                return API_INFO[auth_code.provider].getUserProfile(accessToken)
            })
            .then((profile) => {
                resolve(profile)
            })
            .catch(err => {
                reject(err)
            })
    })
}


