(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    restrict: "E",
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .then(function (result) {
        
        var allItems = result.data.menu_items;
        var foundItems = [];

        if (searchTerm) {
          for (var i = 0; i < allItems.length; i++) {
            var description = allItems[i].description;
            if (description.toLowerCase().indexOf(searchTerm) !== -1) {
              foundItems.push(allItems[i]);
            }
          }
        } 

        return foundItems;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow_ctrl = this;

  narrow_ctrl.searchClicked = false;
  narrow_ctrl.found = [];

  narrow_ctrl.search = function () {
    MenuSearchService.getMatchedMenuItems(narrow_ctrl.searchTerm)
    .then(function (result) {
      narrow_ctrl.searchClicked = true;
      narrow_ctrl.found = result;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };

  narrow_ctrl.removeItem = function (itemIndex) {
    narrow_ctrl.found.splice(itemIndex, 1)
  };

}

})();
