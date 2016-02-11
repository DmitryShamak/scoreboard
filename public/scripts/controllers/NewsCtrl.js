angular.module("app")
    .controller("NewsCtrl", function($rootScope, $scope, $interval, $state, api, notify) {
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


            //TODO: get connected sources
            if(!$scope.sources) {
                notify.show({
                    text: "No Sources connected.",
                    type: "warning"
                });
                $state.go("sources");
            }

            //$scope.pageParams.busy = true;
            //TODO: get news
            //api.user.get({
            //    name: $scope.user.name
            //}, function(user) {
            //    $scope.userProfile = user;
            //    $scope.pageParams.busy = false;
            //    $scope.pageParams.offline = false;
            //}, function(error) {
            //    $scope.pageParams.busy = false;
            //    $scope.pageParams.offline = true;
            //})
        };

        $scope.$watch("user", $scope.init);
    });