angular.module("app")
	.controller("ScoreboardCtrl", function($rootScope, $scope, $interval, $state, ngDialog, confirmDialog, inviteDialog) {
		if(!$rootScope.user) {
	      $state.go("login");
	    }

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
	    }

	    //TODO: get true data from server
		$scope.scoreboard = null;

		$scope.increaseNum = function(num, value) {
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
			$scope.updateNum(newNum);
			
			return newNum;
		};

		$scope.removeUser = function(user) {
			//TODO: find and only then remove
			var userNum = _.find($scope.scoreboard.nums, {'owner': user});
			var ind = $scope.scoreboard.nums.indexOf(userNum);
			$scope.scoreboard.nums.splice(ind, 1);
			$rootScope.secondUser = null;

			$scope.apply($scope);
		};

		$scope.inviteNewUser = function() {
			if($scope.isAdmin(null, $scope.user.name)) {
				inviteDialog.show($scope);
			}
		};

		$scope.updateNum = function(num) {
			if($scope.isAdmin(null, num.owner.name)) {
				return num.options = $scope.getOptionsList(true);
			}

			num.options = $scope.getOptionsList(false);
		};

		//on init
		(function() {
			if(!$scope.user) {
				return;
			}
			//TODO: get second user name
			//$rootScope.secondUser = {name: "mr.Black"}; 

			$scope.scoreboard = {
				nums: [{
					value: 0,
					owner: $scope.user,
					inProgress: false,
					progressStatus: 0,
					rejectDate: null
				}]
			};

			//set user control
			_.forEach($scope.scoreboard.nums, function(num, index) {
				if(num.isEmpty) {
					return;
				}

				$scope.updateNum(num);
			});
		})();
	});