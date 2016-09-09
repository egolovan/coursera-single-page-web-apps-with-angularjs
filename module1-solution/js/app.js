(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  
  $scope.lunch_input = "";
  $scope.lunch_count = "";
  $scope.lunch_message = "";

  $scope.lunch_check = function () {
  	$scope.lunch_count = $scope.lunch_input.split(/\s*,\s*/).filter(n => n!="").length;
   	//console.log($scope.lunch_count);

	if ($scope.lunch_count>3) {
		$scope.lunch_message = "Too much!";
	}
	else if ($scope.lunch_count>0) {
		$scope.lunch_message = "Enjoy!";
	}
	else {
		$scope.lunch_message = "Please enter data first";
	}

  };
}

})();
