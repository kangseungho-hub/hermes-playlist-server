import { Router } from "express"
import initializePassport from "./passport"

// ../auth/*
const authRouter = Router()
const passport = initializePassport()

authRouter.get("/google", passport.authenticate("google", {
    scope: ["email", "profile"]
})
)

authRouter.get("/google/callback", passport.authenticate('google', {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
})
)

export default authRouter
