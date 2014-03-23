'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('all medications', {
        url: '/medications',
        templateUrl: 'views/medications/list.html'
    })
      .state('create medication', {
        url: '/medications/create',
        templateUrl: 'views/medications/create.html'
    })
      .state('edit medication', {
        url: '/medications/:medicationId/edit',
        templateUrl: 'views/medications/edit.html'
    })
      .state('medication by id', {
        url: '/medications/:medicationId',
        templateUrl: 'views/medications/view.html'
    })
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
