const User = require("../models/User")

class AuthController {
    callbackSuccess(req, res, next) {
        try {
            if (!req.user)
                return res.redirect(process.env.GOOGLE_CALLBACK_FAILURE_PATH || '/auth/callback/failure')
            let redirectTo = "/auth/profile"
            if (req.session.reqUrl) {
                redirectTo = req.session.reqUrl; // If our redirect value exists in the session, use that.
                req.session.reqUrl = null; // Once we've used it, dump the value to null before the redirect.
            }
            res.redirect(redirectTo)
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
        let user = new User();
        res.render("auths/signup", {user: user})
    }

    register(req, res, next) {
        let user = new User({email: req.body.email, displayName: req.body.displayName})
        User.register(user, req.body.password, (err, reg_user) => {
            if(err){
                console.log('error while user register!', err)
                return res.render("auths/signup", {user: user})
            }
            res.redirect("/auth/login")
        })
    }

    logout(req, res, next) {
        req.logout()
        res.redirect("/")
    }
}

module.exports = new AuthController
