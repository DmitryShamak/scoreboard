var db = require("./db.js");
var jwt = require("jsonwebtoken");
var JWT_SECRET = "oldmansecret";
var _ = require('koa-router')();

var user = {
    save: function(ctx) {
        var data = this.request.body;
        var user = {
            name: data.name,
            password: data.password
        };
        user.token = jwt.sign(user, JWT_SECRET);
        var self = this;

        setTimeout(function() {
            self.body = JSON.stringify(data);
        }, 1000);
        //db.save("user", user, function(err, data) {
        //    if(err) {
        //        self.statusCode = 404;
        //        self.statusMessage = 'Not found';
        //        return self.close();
        //    }
        //
        //    self.body = JSON.stringify(data);
        //});
    },
    get: function(ctx) {
        var params = this.params;
        db.find("user", params.token, function(err, user) {
            if(err) {
                this.statusCode = 404;
                this.statusMessage = 'Not found';
                return this.close();
            }

            this.body = JSON.stringify(user);
        });
    },
    authenticate: function() {
        var data = this.request.body;
        var query = {
            token: data.token
        };
        db.find("user", query, function(err, user) {
            if(err){
                this.statusCode = 404;
                this.statusMessage = 'Not found';
                this.close();
            }

            this.body = JSON.stringify(user);
        });
    },
    login: function() {
        var data = this.request.body;
        db.find("user", {name: data.name, password: data.password}, function(err, user) {
            if(err) {
                this.statusCode = 404;
                this.statusMessage = 'Not found';
                this.close();
            }

            this.body = JSON.stringify(user);
        });
    }
};

var scoreboard = {
    save: function(req, res) {
        var data = this.request.body;
        var scoreboard = {
            key: data.key,
            title: data.title,
            description: data.description
        };
        db.save("scoreboard", scoreboard, function(err, data) {
            if(data) {
                this.body = JSON.stringify(data);
            } else {
                this.statusCode = 404;
                this.statusMessage = 'Not found';
                this.close();
            }
        });
    },
    get: function(req, res) {
        var params = this.params;
        db.find("scoreboard", {key: params.key}, function(err, scoreboard) {
            if(scoreboard) {
                this.body = JSON.stringify(scoreboard);
            } else {
                console.log("Find", db.collections.scoreboard);
                this.statusCode = 404;
                this.statusMessage = 'Not found';
                this.close();
            }
        });

    }
};

_.post('/api/user', user.save);
_.post('/api/authenticate', user.authenticate);
_.post('/api/login', user.login);
_.get('/api/user', user.get);

_.post('/api/scoreboard', scoreboard.save);
_.get('/api/scoreboard/:key', scoreboard.get);

module.exports = _;