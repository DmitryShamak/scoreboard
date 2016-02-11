angular.module("app")
	.factory("scoreboardDialog", function(ngDialog, $interval, $rootScope, $state, api) {
		var dialog = {};
		dialog.show = function(scope) {
			ngDialog.open({ 
				template: '/views/templates/scoreboardDialogTmpl.html',
				controller: function($scope) {
					$scope.form = {};

					$scope.onConfirm = function(data) {
						if(!data || !data.name) {
							return form.invalid = true;
						}
						$scope.form.invalid = false;
						$scope.form.busy = true;

						var scoreboard = {
							key: data.name.replace(/\s/g, "").toLowerCase(),
							title: data.name,
							description: data.description || "",
							owner: $scope.user.name
						};

						api.scoreboard.save(scoreboard, function(response) {
							//navigate to new scoreboard
							$state.go("join", {id: scoreboard.key});
							ngDialog.close();
						}, function(error) {
							console.log(error);
							$scope.form.invalid = true;
							$scope.form.busy = false;
						});
					};

					$scope.onCancel = function() {
						ngDialog.close();
					};
				}
			});
		};

		return dialog;
	});