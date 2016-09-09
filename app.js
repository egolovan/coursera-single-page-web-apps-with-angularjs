(function() {
'use strict';

angular.module('myFirstApp',[])

.controller('MyFirstController', function($scope, $filter) {
    $scope.name = "";

    $scope.upper = function() {
        $scope.name = $filter('uppercase')($scope.name);
    }

});

})();
