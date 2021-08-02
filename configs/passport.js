var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});
passport.use(
    new GoogleStrategy(
    {
        clientID: "GOOGLE_CLIENT_ID",
        clientSecret: "GOOGLE_CLIENT_SECRET",
        callbackURL: "http://localhost:6000/auth/google/callback" // Since we need to redirect back to our server after Google authentication gets completed.
    },
    function(accessToken, refreshToken, profile, done) {
        var userData = {
            email: profile.emails[0].value,
            name: profile.displayName,
            token: accessToken
        };
        done(null, userData);
    }
    )
);