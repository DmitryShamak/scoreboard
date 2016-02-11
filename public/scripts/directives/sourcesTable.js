angular.module("app")
    .directive("sourceName", function() {
        return {
            templateUrl: "/views/sourcesTable/source_name.html",
            scope: {item: "=sourceName"}
        }
    })
    .directive("sourceUser", function() {
        return {
            templateUrl: "/views/sourcesTable/source_user.html",
            scope: {item: "=sourceUser"}
        }
    })
    .directive("sourceStatus", function() {
        return {
            templateUrl: "/views/sourcesTable/source_status.html",
            scope: {item: "=sourceStatus"}
        }
    })
    .directive("sourceAction", function() {
        return {
            templateUrl: "/views/sourcesTable/source_action.html",
            scope: {item: "=sourceAction"}
        }
    });