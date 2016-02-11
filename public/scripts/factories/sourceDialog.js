angular.module("app")
	.factory("sourceDialog", function(ngDialog, $interval, $window, Sources, api) {
		var dialog = {};
		dialog.show = function(scope) {
			ngDialog.open({ 
				template: '/views/templates/sourceTmpl.html',
				controller: function($scope) {
					$scope.sources = angular.copy(Sources);

					$scope.goToPath = function(path) {
						$window.location.href = path;
					};

					//$scope.source = {
					//	type: $scope.sourceTypes[0]
					//};

					$scope.onConfirm = function(source) {
						scope.addSource({
							user: source.user,
							name: source.type.label
						});
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