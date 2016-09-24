(function () {
'use strict';

angular.module('CheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

function ShoppingListCheckOffService() {
  var service = this;

  // List of "to buy" items
  var items_to_buy = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate Bars",
      quantity: "5"
    },
    {
      name: "Whisky",
      quantity: "1"
    },
    {
      name: "Newspaper",
      quantity: "1"
    }
  ];

  // List of "bought" items
  var items_bought = [];

  service.checkItem = function (itemIdex) {
  	items_bought.push(items_to_buy[itemIdex])
  	items_to_buy.splice(itemIdex, 1);

  	if (!items_to_buy.length) console.log("Good luck, man!")
  };

  service.getToBuyItems = function () {
    return items_to_buy;
  };

  service.getBoughtItems = function () {
    return items_bought;
  };
}

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var to_buy = this;

  to_buy.items = ShoppingListCheckOffService.getToBuyItems();

  to_buy.checkItem = function (itemIndex) {
    ShoppingListCheckOffService.checkItem(itemIndex);
  };
}


AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getBoughtItems();
}

})();
