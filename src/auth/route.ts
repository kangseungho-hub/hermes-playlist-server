import { Router } from "express"
const authRouter = Router()
import { getAuthCodeURL, getUserProfile, RegisteredAPILabels } from './auth_api';
import { userManager, User } from "../Models/user"
import { sign } from "jsonwebtoken"

authRouter.get("/:provider", (req, res) => {
    const provider = req.params.provider

    //redirect client to conscent screen
    res.redirect(getAuthCodeURL(provider))
})

authRouter.get("/:provider/callback", async (req, res) => {
    const { code } = req.query
    const provider = req.params.provider

    //if user request to unregistered oauth service
    if (RegisteredAPILabels.includes(provider) == false) {
        res.status(400).send("잘못된 요청입니다.")
    }

    //if code not sended as parameter
    // will be one of the cases below
    // 1. client try to access /auth/google/callback directly withour pass through conscent screen
    // 2. user failed authentication from oauth server  
    if (code == undefined) {
        res.status(400).send("잘못된 요청입니다.")
    }

    //get user profile from oauth server
    let profile = await getUserProfile({ code: code.toString(), provider })

    let user = await userManager.getUser(profile.id)

    //if user already exist
    if (!user) {
        user = await userManager.createUser(profile)
    }


    //generate encrypted jwt
    const jwt = sign({
        id: user.id,
        username: user.username,
        email: user.email,
        pfp: user.pfp,
    },
        //not use file
        process.env.APP_SECRET, //secret
        {
            algorithm: "HS256",

        }
    )

    //send encrypted jwt to client cookie
    res.cookie("token", jwt, {
        httpOnly: true,
        secure: true //only https
    })

    res.redirect("/")

})



export default authRouter
