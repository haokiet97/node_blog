const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth2").Strategy
// const User = require("../app/models/User")

passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
})

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile)
    }
))
// module.exports = (passport) => {
//     passport.use(new GoogleStrategy({
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: "http://localhost:3000/auth/google/callback",
//             passReqToCallback: true
//         },
//         function (request, accessToken, refreshToken, profile, done) {
//             return done(null, profile)
//         }
//         // async (request, accessToken, refreshToken, profile, done) => {
//         //     try {
//         //         let existingUser = await User.findOne({'google.id': profile.id});
//         //         // if user exists return the user
//         //         if (existingUser) {
//         //             return done(null, existingUser);
//         //         }
//         //         // if user does not exist create a new user
//         //         console.log('Creating new user...');
//         //         const newUser = new User({
//         //             method: 'google',
//         //             google: {
//         //                 id: profile.id,
//         //                 name: profile.displayName,
//         //                 email: profile.emails[0].value
//         //             }
//         //         });
//         //         await newUser.save();
//         //         return done(null, newUser);
//         //     } catch (error) {
//         //         return done(error, false)
//         //     }
//         // }
//     ));
// }
