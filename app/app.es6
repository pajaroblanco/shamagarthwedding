// Declare app level module which depends on views, and components

var angularApp = angular.module('app', [
    'ngRoute',
    'app.controllers',
    'app.directives',
    'app.services',
    'angular-velocity',
    'ngAnimate',
    'angular-carousel'
]);

angularApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    //$locationProvider.hashPrefix('!');

    //Setup URL routes.
    $routeProvider.
        when('/', {
            templateUrl: 'angular-app/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            label: 'Home'
        }).
        otherwise({redirectTo: '/'});
}]);

angularApp.run([function() {
    //$(document).foundation();
}]);

/**
 * Here we declare some empty modules for our application where we will put the app's controllers, directives, and services
 */
angular.module('app.controllers', []);
angular.module('app.directives', []);
angular.module('app.services', []);