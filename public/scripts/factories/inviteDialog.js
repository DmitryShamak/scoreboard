angular.module("app")
	.factory("inviteDialog", function(ngDialog, $interval, $rootScope) {
		var dialog = {};
		dialog.show = function(scope) {
			ngDialog.open({ 
				template: '/views/inviteTmpl.html',
				controller: function($scope) {
					$scope.onConfirm = function(newUser) {
						//get user by name
						//send request to user
						var newNum = $scope.getEmptyNum(newUser);
						
						if(!newNum) {
							return;
						}

						$scope.scoreboard.nums.push(newNum);

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