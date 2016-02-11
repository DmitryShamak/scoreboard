angular.module("app")
    .controller("SourcesCtrl", function($rootScope, $scope, $interval, $state, sourceDialog, api) {
        if(!$rootScope.user && !$rootScope.busy) {
            $state.go("login");
        }

        $scope.pageParams = {};

        var Source = function(attrs) {
            var self = this;
            attrs = attrs || {};

            self.name = attrs.name || "#Name";
            self.user = attrs.user || "#User";
            self.status = attrs.status || false;
        };

        $scope.addSource = function(source) {
            $scope.sources = $scope.sources || [];
            $scope.sources.push(new Source(source));
        };

        $scope.deleteSource = function(source) {
            var ind = _.indexOf($scope.sources, source);
            //send update request
            $scope.sources.splice(ind, 1);
        };

        $scope.showDialog = function() {
            sourceDialog.show($scope)
        };

        $scope.init = function() {
            $scope.pageParams.busy = false;
            $scope.pageParams.offline = false;
            if(!$scope.user) {
                return;
            }

            //TODO: add dialog for adding source
            //TODO: add sources constants

            $scope.sources = [];

            //$scope.pageParams.busy = true;
            //get sources
            api.source.get({
                user: $scope.user._id
            }, function(sources) {
                console.log(sources);
                $scope.pageParams.busy = false;
                $scope.pageParams.offline = false;
            }, function(error) {
                $scope.pageParams.busy = false;
                $scope.pageParams.offline = true;
            })
        };

        $scope.$watch("user", $scope.init);
    });