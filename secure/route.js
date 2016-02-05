var db = require("./db.js");
var jwt = require("jsonwebtoken");
var JWT_SECRET = "oldmansecret";

var user = {
    save: function*() {
        var data = this.request.body;
        var user = {
            name: data.name,
            password: data.password
        };
        user.token = jwt.sign(user, JWT_SECRET);
        db.save("user", user.name, user);

        this.body = JSON.stringify(user);
    },
    get: function*() {
        this.body = JSON.stringify({name: "Dmitry"});
    },
    authenticate: function*() {
        var data = this.request.body;
        var query = {
            token: data.token
        };
        var user = db.find("user", query);

        if(user) {
            this.body = JSON.stringify(user);
        } else {
            this.statusCode = 404;
            this.statusMessage = 'Not found';
            this.close();
        }
    },
    login: function*() {
        var data = this.request.body;
        var user = db.find("user", {name: data.name, password: data.password});
        if(user) {
            this.body = JSON.stringify(user);
        } else {
            this.statusCode = 404;
            this.statusMessage = 'Not found';
            this.close();
        }
    }
};

var route = {};
route.user = user;

module.exports = route;