(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  .state('categoriesList', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/categories-list.template.html',
    controller: 'CategoriesListController as categoriesList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories()
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            console.log("Something went terribly wrong.");
          });
      }]
    }
  })

  .state('itemsList', {
    url: '/categories/{categorySn}',
    templateUrl: 'src/menuapp/templates/items-list.template.html',
    controller: 'ItemsListController as itemsList',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categorySn)
                .then(function (response) {
                  return response.data;
                })
                .catch(function (error) {
                  console.log("Something went terribly wrong.");
                });
            }]
    },
    params: {
      categorySn: null
    }
  });
}

})();
