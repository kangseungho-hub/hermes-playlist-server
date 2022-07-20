import axios from "axios"
import * as dotenv from "dotenv"
dotenv.config()

type searchOption = {
    //api_key : string

    //id or snippet등 응답의 format
    //id는 video들의 id만 포함한 응답을 주고
    //snippet은 video들의 좀더 상세한 디테일(thumb url 과 같은)을 준다.
    part: "id" | "snippet" | "id,snippet"

    //search text
    q: string

    //max count of vidoes
    //default : 5 (max : 50)
    maxResults?: number

    //응답 resource의 유형을 지정한다.
    type?: "channel" | "playlist" | "video" | "channel,playlist" | "channel,video" | "playlist,video" | "channel,video,playlist"

    //비디오 퀄리티를 필터링한다.
    //any : 모든 해상도
    //high : HD해상도의 비디오 (720p ~ )
    //standard : 표준 해상도 
    videoDefinition?: "any" | "high" | "standard"
}

class YtAPI {
    urls: any
    api_key: string
    constructor() {
        this.api_key = process.env.GOOGLE_YOUTUBE_DATA_API_KEY

        this.urls = {
            //video search url
            videoList: "https://www.googleapis.com/youtube/v3/search",
        }
    }

    searchVideoList(option: searchOption) {
        const _option = Object.assign(option, { key: this.api_key })

        return axios(this.urls.videoList, {
            params: _option
        })
    }
}

class Hermes extends YtAPI {
    constructor() {
        super()
    }

    search(option: searchOption, cb: (videos: Array<any>) => void) {
        this.searchVideoList(option)
            .then((res) => {
                const videos = res.data.items

                cb(videos)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

const hermes = new Hermes()

export default hermes