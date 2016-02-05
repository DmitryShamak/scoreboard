angular.module("app")
    //.config(['$resourceProvider', function($resourceProvider) {
    //    // Don't strip trailing slashes from calculated URLs
    //    $resourceProvider.defaults.stripTrailingSlashes = false;
    //}])
    .factory("api", function($resource) {
        var api = {};
        /*
        * User [add, get, find, update]
        * scoreboard [add, get, update, delete]
        * */
        api.login = $resource("/api/login");
        api.user = $resource("/api/user/:id");
        api.authenticate = $resource("/api/authenticate");
        api.scoreboard = $resource("/api/scoreboard/:id");
        api.search = $resource("/api/search/:catalog");

        return api;
    });