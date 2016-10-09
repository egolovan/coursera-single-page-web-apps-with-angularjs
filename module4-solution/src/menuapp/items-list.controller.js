(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsListController', ItemsListController);


ItemsListController.$inject = ['items'];
function ItemsListController(items) {
  var ItemsList = this;
  ItemsList.items = items;
  console.log(items)
}

})();
