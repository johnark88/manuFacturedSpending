console.log('script');
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('logOn', {
            url: '/',
            templateUrl: 'views/logOn.html',
            controller:  'logOnController'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        .state('moneyOrder', {
            url: '/moneyOrder',
            templateUrl: 'views/moneyOrder.html',
            controller: 'moneyOrderController'
        });
});
