(function () {
"use strict";

angular.module('public')
.controller('MyinfoController', MyinfoController);

MyinfoController.$inject = ['ApiPath', 'UserService'];
function MyinfoController(ApiPath, UserService) {
  var $ctrl = this;

  $ctrl.basePath = ApiPath;
  $ctrl.user = UserService.getUser();
  console.log($ctrl.user);

}

})();
