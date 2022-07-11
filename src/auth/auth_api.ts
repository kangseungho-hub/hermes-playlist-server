import axios from "axios";
import * as qs from "qs";

function generateURL(url: string, params?: Object): string {
    let result: string = "";

    //host
    if (url[url.length - 1] == '/') {
        url = url.substring(0, url.length - 1)
    }

    result += "?"

    result += qs.stringify(params)

    return result
}


type getAuthCodeOption = {
    url: string,
    client_id: string,
    redirect_uri: string,
}

type authorization_code = {
    provider: "google" | "kakao",
    code: string,
}

type getTokenOption = {
    url: string,
    client_id: string,
    client_secret: string,
    redirect_uri: string,
}

export function getAuthCodeURL(option: getAuthCodeOption) {
    return generateURL(option.url, {
        client_id: option.client_id,
        redirect_uri: option.redirect_uri,

    })
}

export function getTokens(auth_code: authorization_code): Promise<any> {
    const PROVIDER = auth_code.provider.toUpperCase()

    return axios(process.env[`${PROVIDER}_AUTH_CODE_URL`], {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded:charset=utf-8"
        },
        params: {
            code: auth_code.code,
            client_id: process.env[`${PROVIDER}}_CLINET_ID`],
            client_secret: process.env[`${PROVIDER}_CLIENT_SECRET`],
            redirect_uri: process.env[`${PROVIDER}_AUTH_REDIRECT_URL`],
            grant_type: "authorization_code",
        }
    })
}

