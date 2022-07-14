const User = require("../models/User")

class AuthController {
    callbackSuccess(req, res, next) {
        try {
            if (!req.user)
                return res.redirect(process.env.GOOGLE_CALLBACK_FAILURE_PATH || '/auth/callback/failure')
            res.redirect("/auth/profile")
        } catch (e) {
            next()
        }
    }

    callbackFailure(req, res, next) {
        res.send("Error")
    }

    profile(req, res, next) {
        res.json(req.user)
    }

    login(req, res, next) {
        res.render("auths/login")
    }

    signup(req, res, next) {
        res.render("auths/signup")
    }

    register(req, res, next) {
        let user = new User({email: req.body.email})
        User.register(user, req.body.password, (err, user) => {
            if(err){
                console.log('error while user register!', err)
                return res.render("auths/signup", {user: user})
            }
            res.redirect("/auth/profile")
        })
    }

    logout(req, res, next) {
        req.logout()
        res.redirect("/")
    }
}

module.exports = new AuthController
