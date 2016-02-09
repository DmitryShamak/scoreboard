angular.module("app")
    .controller("ProfileCtrl", function($rootScope, $scope, $interval, $state, api) {
        if(!$rootScope.user && !$rootScope.busy) {
            $state.go("login");
        }

        $scope.pageParams = {};

        $scope.init = function() {
            $scope.pageParams.busy = false;
            $scope.pageParams.offline = false;
            if(!$scope.user) {
                return;
            }
            $scope.pageParams.busy = true;
            api.user.get({
                name: $scope.user.name
            }, function(user) {
                $scope.userProfile = user;
                $scope.pageParams.busy = false;
                $scope.pageParams.offline = false;
            }, function(error) {
                $scope.pageParams.busy = false;
                $scope.pageParams.offline = true;
            })
        };

        $scope.$watch("user", $scope.init);
    });