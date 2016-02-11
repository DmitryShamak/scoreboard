var oauthConfig = require("./oauth.js");
var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy(oauthConfig.googleAuth,
    function(accessToken, refreshToken, profile, done) {
        //console.log("Google", accessToken, refreshToken, profile);
        //User.findOrCreate({ openId: identifier }, function(err, user) {
        //    done(err, user);
        //});
        //TODO: save user source data (tokens)
        //TODO: return display Name and status (on/off)
        done(null, {
            profile: profile,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }
));

module.exports = passport;