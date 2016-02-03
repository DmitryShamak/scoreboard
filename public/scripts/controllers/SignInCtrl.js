angular.module("app")
	.controller("SignInCtrl", function($rootScope, $scope, $state) {
		$scope.userData = {};

		$scope.signIn = function(userData) {
			//check data validation
			$rootScope.user = userData.name;
			//set data to db
			$state.go("landing");
		};
	});