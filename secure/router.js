var db = require("./db.js");
var jwt = require("jsonwebtoken");
var JWT_SECRET = "oldmansecret";

var user = {
    save: function(req, res) {
        var data = req.body;
        var user = {
            name: data.name,
            password: data.password
        };
        user.token = jwt.sign(user, JWT_SECRET);

        db.find("user", {name: user.name}, function(err, data) {
            if(!err && !data && data != "null") {
                db.save("user", user, function(err, data) {
                    if(err) {
                        res.statusCode = 404;
                        res.statusMessage = 'Not found';
                        return res.send();
                    }

                    res.send(JSON.stringify(user));
                });
            } else {
                res.statusCode = 404;
                res.statusMessage = 'Already exists';
                return res.send();
            }
        });
    },
    get: function(req, res) {
        var query = req.query;
        db.find("user", query, function(err, user) {
            if(err) {
                res.statusCode = 404;
                res.statusMessage = 'Not found';
                return res.send();
            }

            res.send(JSON.stringify(user));
        });
    },
    authenticate: function(req, res) {
        var data = req.body;
        var query = {
            token: data.token
        };
        db.find("user", query, function(err, user) {
            if(err || !user) {
                res.statusCode = 404;
                res.statusMessage = 'Not found';
                return res.send();
            }

            res.send(JSON.stringify(user));
        });
    },
    update: function(req, res) {
        var data = req.body;
        db.update("user", data.query, data.updates, function(err, user) {
            if(err || !user) {
                res.statusCode = 404;
                res.statusMessage = 'Bad Data';
                return res.send();
            }

            res.send(JSON.stringify(user));
        });
    },
    login: function(req, res) {
        var data = req.body;
        var user = {
            name: data.name,
            password: data.password
        };
        user.token = jwt.sign(user, JWT_SECRET);

        db.update("user", {name: data.name, password: data.password}, {token: user.token}, function(err, data) {
            if(err) {
                res.statusCode = 404;
                res.statusMessage = 'Not found';
                res.send();
            }
            res.send(JSON.stringify(user));
        });

    }
};
var scoreboard = {
    save: function(req, res) {
        var data = req.body;
        var scoreboard = {
            key: data.key,
            title: data.title,
            description: data.description,
            owner: data.owner
        };
        db.find("scoreboard", {key: scoreboard.key}, function(err, data) {
           if(!err && !data) {
               return db.save("scoreboard", scoreboard, function(err, data) {
                   if(err) {
                       res.statusCode = 404;
                       res.statusMessage = 'Not found';
                       return res.end();
                   }

                   res.send(JSON.stringify(data));
               });
           }

            res.statusCode = 404;
            res.statusMessage = 'Not found';
            return res.end();
        });

    },
    update: function(req, res) {
        var data = req.body;
        db.update("scoreboard", data.query, data.updates, function(err, user) {
            if(err || !user) {
                res.statusCode = 404;
                res.statusMessage = 'Bad Data';
                return res.send();
            }

            res.send(JSON.stringify(user));
        });
    },
    get: function(req, res) {
        var params = req.params;
        db.find("scoreboard", {key: params.key}, function(err, scoreboard) {
            if(err || !scoreboard) {
                res.statusCode = 404;
                res.statusMessage = 'Not found';
                return res.end();
            }

            res.send(JSON.stringify(scoreboard));
        });

    }
};

var router = function(app) {
    app.post('/api/user', user.save);
    app.post('/api/authenticate', user.authenticate);
    app.post('/api/login', user.login);
    app.get('/api/user', user.get);
    app.put('/api/user', user.update);

    app.post('/api/scoreboard', scoreboard.save);
    app.get('/api/scoreboard/:key', scoreboard.get);
    app.put('/api/scoreboard', scoreboard.update);
};

module.exports = router;

