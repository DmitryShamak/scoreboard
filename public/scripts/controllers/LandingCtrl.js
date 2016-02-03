angular.module("app")
	.controller("LandingCtrl", function($rootScope, $scope, $interval, $state, scoreboardDialog) {
		if(!$rootScope.user) {
	      $state.go("login");
	    }

	    $scope.createScoreboard = function() {
	    	scoreboardDialog.show();
	    };
	});
