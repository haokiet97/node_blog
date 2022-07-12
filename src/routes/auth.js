const express  = require("express")
const router = express.Router()
const authController = require("../app/controllers/AuthController")
const passport = require("passport");
require("../config/passport")

router.get("/google", passport.authenticate("google", {scope: ["email", "profile"]}))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: process.env.GOOGLE_CALLBACK_SUCCESS_PATH || '/auth/callback/success',
    failureRedirect: process.env.GOOGLE_CALLBACK_FAILURE_PATH || '/auth/callback/failure'
}))

// Success call back
router.get('/callback/success' , authController.callbackSuccess)

// failure call back
router.get('/callback/failure' , authController.callbackFailure)

router.get("/profile", authController.profile)

router.get("/logout", authController.logout)

module.exports = router
