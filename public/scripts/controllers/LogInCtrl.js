angular.module("app")
	.controller("LogInCtrl", function($rootScope, $scope, $state, api) {
		$scope.userData = {};
		
		$scope.logIn = function(userData) {
			if($scope.busy) {
				return;
			}

			if(!userData.name || !userData.password) {
				return $scope.invalid = true;
			}
			$scope.invalid = false;
			$scope.busy = true;

			api.login.save({userData: userData}, function(response) {
				$scope.busy = false;
				//set cookies
				$rootScope.user = {name: userData.name};
				$state.go("landing");
			}, function(error) {
				console.log(error);
				userData.password = null;
				$scope.invalid = true;
				$scope.busy = false;
			});
		};
	});