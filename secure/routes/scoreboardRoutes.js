var getRoutes = function(db) {
    return {
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
};

module.exports = getRoutes;