angular.module("app")
	.controller("LogInCtrl", function($rootScope, $scope, $state) {
		$scope.userData = {};
		
		$scope.logIn = function(userData) {
			if(!userData.name || !userData.pass) {
				return $scope.invalid = true;
			}
			$scope.invalid = false;
			$rootScope.user = {name: userData.name};

			//set data to db
			$state.go("landing");

		};
	});