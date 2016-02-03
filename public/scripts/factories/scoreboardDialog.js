angular.module("app")
	.factory("scoreboardDialog", function(ngDialog, $interval, $rootScope, $state) {
		var dialog = {};
		dialog.show = function(scope) {
			ngDialog.open({ 
				template: '/views/scoreboardDialogTmpl.html',
				controller: function($scope) {
					$scope.onConfirm = function(scoreboard) {
						//get user by name
						//save new scoreboard to db
						//get response with [id]
						var id = 696;
						//navigate to new scoreboard
						$state.go("join", {id: id});
						ngDialog.close();
					};

					$scope.onCancel = function() {
						ngDialog.close();
					};
				}
			});
		};

		return dialog;
	});