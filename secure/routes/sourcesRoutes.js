var getRoutes = function(db) {
    return {
        save: function(req, res) {
            var data = req.body;
            var source = {
                user: data.user,
                token: data.token
            };

            db.find("source", {user: source.user}, function(err, data) {
                if(!err && !data && data != "null") {
                    db.save("source", user, function(err, data) {
                        if(err) {
                            res.statusCode = 404;
                            res.statusMessage = 'Not found';
                            return res.send();
                        }

                        res.send(JSON.stringify(data));
                    });
                } else {
                    if(err) {
                        res.statusCode = 404;
                        res.statusMessage = 'Already exists';
                        return res.send();
                    }

                    res.send(JSON.stringify(data));
                }
            });
        },
        get: function(req, res) {
            var query = req.query;
            db.find("source", query, function(err, user) {
                if(err) {
                    res.statusCode = 404;
                    res.statusMessage = 'Not found';
                    return res.send();
                }

                res.send(JSON.stringify(user));
            });
        }
    };
};

module.exports = getRoutes;