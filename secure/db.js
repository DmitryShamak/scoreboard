var _ = require('lodash');

//mongoose
//connection
var db = {};
db.collections = {};
db.find = function(collection, query) {
    if(!db.collections[collection]) {
        return null;
    }

    return _.find(db.collections[collection], query);
};

db.save = function(collection, key, data) {
    if (!db.collections[collection]) {
        db.collections[collection] = {};
    }

    db.collections[collection][key] = data;
};


module.exports = db;