var db = require("./db.js");

var user = require("./routes/userRoutes.js")(db);
var scoreboard = require("./routes/scoreboardRoutes.js")(db);
var sources = require("./routes/sourcesRoutes.js")(db);

var passport = require("./passport.js");
//TODO: add source router

var router = function(app) {
    app.post('/api/user', user.save);
    app.post('/api/authenticate', user.authenticate);
    app.post('/api/login', user.login);
    app.get('/api/user', user.get);
    app.put('/api/user', user.update);

    app.post('/api/scoreboard', scoreboard.save);
    app.get('/api/scoreboard/:key', scoreboard.get);
    app.put('/api/scoreboard', scoreboard.update);

    app.get('/api/source', sources.get);

    //OAuth
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/google', passport.authenticate("google", {scope: ['profile', 'email']}));
    app.get('/auth/google/callback', passport.authenticate("google", {
            successRedirect: "/sources",
            failureRedirect: "/landing"
        })
    );
};

module.exports = router;

