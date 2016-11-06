(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['menuItems', 'UserService'];
function SignupController(menuItems, UserService) {
  var $ctrl = this;

  $ctrl.user = {};
  $ctrl.menuItems = menuItems.menu_items;
  $ctrl.message = "";

  $ctrl.submit = function () {

  	for (var i=0; i<$ctrl.menuItems.length; i++) {
  		if ($ctrl.menuItems[i].short_name.toLowerCase()==$ctrl.user.menu_number.toLowerCase()) {
			$ctrl.menu_number_invalid = false;
		    $ctrl.user.menu = $ctrl.menuItems[i];
		    UserService.setUser($ctrl.user);
  			$ctrl.message = "Your information has been saved.";
  			return;
  		}
  	}

  	$ctrl.menu_number_invalid = true;

  };
}

})();
