angular.module("app")
	.controller("NavigationCtrl", function($scope) {
		$scope.navigation = {};
		$scope.navigation.topLinks = {
			landing: {
				title: "Home",
				state: "landing",
				icon: "fa-home"
			},
			history: {
				title: "Prev. scoreboard",
				state: "join",
				icon: "fa-history",
				disabled: true
			}
		};
		$scope.navigation.bottomLinks = {
			logout: {
				title: "Log Out",
				state: "logout",
				icon: "fa-sign-out"
			}
		};

		//update history link
	});