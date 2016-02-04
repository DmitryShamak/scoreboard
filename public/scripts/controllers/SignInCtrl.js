angular.module("app")
	.controller("SignInCtrl", function($rootScope, $scope, $state, api) {
		$scope.userData = {};

		$scope.signIn = function(userData) {
			if($scope.busy) {
				return;
			}

			$scope.invalid = false;
			$scope.busy = true;
			//check data validation
			api.user.save({userData: {
				name: userData.name,
				password: userData.password
			}}, function(response) {
				$rootScope.user = userData.name;
				//set data to db
				$state.go("landing");
			}, function(error) {
				console.log(error);
				$scope.invalid = true;
				$scope.busy = false;
			});
		};
	});