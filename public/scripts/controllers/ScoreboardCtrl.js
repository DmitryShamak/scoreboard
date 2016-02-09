angular.module("app")
	.controller("ScoreboardCtrl", function($rootScope, $scope, $interval, $state, $location, ngDialog, api, confirmDialog, inviteDialog) {
		if(!$rootScope.user && !$rootScope.busy) {
	      $state.go("login");
	    }

		$scope.isAdmin = function(id, name) {
			if(name && $scope.scoreboard.owner == name) {
				return true;
			}

			return false;
		};

		$scope.saveUpdates = function() {
			var data = $scope.cleanBoardData($scope.scoreboard.data);
			api.scoreboard.update({
				query: {
					key: $scope.scoreboard.key
				},
				updates: {
					data: data
				}
			});
		};

		$scope.updateHistory = function() {
			var userHistory = angular.copy($scope.user.history) || [];
			var key = $scope.scoreboard ? $scope.scoreboard.key : $location.path().substring(1).split("/")[1];

			var currentLinkIndex = _.findIndex(userHistory, {key: key});
			if(~currentLinkIndex) {
				userHistory.splice(currentLinkIndex, 1);
			}

			if($scope.scoreboard) {
				userHistory.unshift({
					key: $scope.scoreboard.key,
					title: $scope.scoreboard.title,
					type: "board"
				});
			}

			api.user.update({
				query: {
					name: $scope.user.name
				},
				updates: {
					history: userHistory
				}
			}, function() {
				if(!$scope.scoreboard) {
					$scope.redirectToMainPage();
				}
			});
		};

	    //@param isAdmin [Boolean] - admin/user options
	    $scope.getOptionsList = function(isAdmin) {
	    	var options = [];

	    	if(!isAdmin) {
	    		//add admin rights
	    		options.push({
	    			text: "Remove",
	    			icon: "fa fa-trash",
	    			action: function(obj) {
	    				$scope.removeUser(obj.owner);
	    			}
	    		});
	    	}

	    	return options;
	    };

		$scope.pageParams = {};

		$scope.increaseNumber = function(num, value) {
			num.value += value;
			num.inProgress = false;
			num.progressStatus = 0;

			$scope.saveUpdates();
		};

		$scope.suggestIncrease = function(num, value) {
			if(num.inProgress) {
				return;
			}
			//show confirm/cancel modal
			confirmDialog.show(num, $scope);
		};

		$scope.getEmptyNum = function(owner) {
			if(!owner) {
				return;
			}
			var newNum = {
				value: 0,
				owner: owner,
				inProgress: false,
				progressStatus: 0,
				rejectDate: null
			};

			$scope.scoreboard.addNum(newNum);
			$scope.updateNum(newNum);
			
			return newNum;
		};

		$scope.removeUser = function(user) {
			//TODO: find and only then remove
			var userNum = _.find($scope.scoreboard.data, {'owner': user});
			var ind = $scope.scoreboard.data.indexOf(userNum);
			$scope.scoreboard.data.splice(ind, 1);
			$rootScope.secondUser = null;

			$scope.apply($scope);
		};

		$scope.inviteNewUser = function() {
			if($scope.isAdmin(null, $scope.user.name)) {
				inviteDialog.show($scope);
			}
		};

		$scope.updateNum = function(num) {
			if($scope.isAdmin(null, num.owner)) {
				return num.options = $scope.getOptionsList(true);
			}

			if(num.owner !== $scope.user.name) {
				num.options = $scope.getOptionsList(false);
			}
		};

		$scope.cleanBoardData = function(bData) {
			var data = angular.copy(bData).map(function(item) {
				return {
					owner: item.owner,
					value: item.value
				}
			});

			return data;
		};

		$scope.initControl = function(board) {
			board.addNum = function(num) {
				if(!$scope.scoreboard.data) {
					$scope.scoreboard.data = [];
				}

				$scope.scoreboard.data.push(num);

				$scope.saveUpdates();
			};
		};

		//on init
		$scope.init = function() {
			$scope.pageParams.busy = true;
			if(!$scope.user) {
				return;
			}
			$scope.pageParams.busy = false;

			//TODO: get true data from server
			if(!$scope.scoreboard) {
				$scope.pageParams.busy = true;
				var urlParts = $location.path().substring(1).split("/");
				var key = urlParts[1] || null;
				if(!key) {
					$scope.pageParams.busy = false;
					return $scope.pageParams.offline = true;
				}

				api.scoreboard.get({key: key}, function(response) {
					$scope.scoreboard = response;

					//set user control
					_.forEach($scope.scoreboard.data, function(num, index) {
						$scope.updateNum(num);
					});

					$scope.pageParams.busy = false;
					$scope.pageParams.offline = false;

					//add scoreboard control
					$scope.initControl($scope.scoreboard);
					if(!$scope.scoreboard.data || !$scope.scoreboard.data.length) {
						var newNum = $scope.getEmptyNum($scope.user.name);
					}

					$scope.updateHistory();

				}, function(error) {
					$scope.pageParams.busy = false;
					$scope.pageParams.offline = true;
					$scope.updateHistory();
				});
			}
		};

		$scope.$watch("user", $scope.init);
	});