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

    logout(req, res, next) {
        req.logout()
        res.redirect("/")
    }
}

module.exports = new AuthController
