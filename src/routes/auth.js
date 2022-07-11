const express  = require("express")
const router = express.Router()
const passport = require("passport");
require("../config/passport")(passport)

router.get(
    "/google",
    passport.authenticate("google", {scope: ["email", "profile"]})
);

// router.get(
//     "/google/callback",
//     passport.authenticate("google", {session: false}),
//     (req, res) => {
//         console.log(res)
//         res.redirect("/auth/profile/");
//     }
// );
router.get( '/auth/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
}));

router.get("/profile", (req, res) => {
 res.send("Welcome");
});

module.exports = router
