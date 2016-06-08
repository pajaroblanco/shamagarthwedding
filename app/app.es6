// Declare app level module which depends on views, and components

var angularApp = angular.module('app', [
    'ngRoute',
    'app.controllers',
    'app.directives',
    'app.services',
    'angular-velocity',
    'ngAnimate'
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
        when('/about', {
            templateUrl: 'angular-app/about-us/about-us.html',
            controller: 'AboutCtrl',
            controllerAs: 'vm',
            label: 'About Us'
        }).
        when('/contact', {
            templateUrl: 'angular-app/contact-us/contact-us.html',
            controller: 'ContactCtrl',
            controllerAs: 'vm',
            label: 'Contact Us'
        }).
        when('/portfolio', {
            templateUrl: 'angular-app/portfolio/portfolio.html',
            controller: 'PortfolioCtrl',
            controllerAs: 'vm',
            label: 'Portfolio'
        }).
        when('/pricing', {
            templateUrl: 'angular-app/pricing/pricing.html',
            controller: 'PricingCtrl',
            controllerAs: 'vm',
            label: 'Pricing'
        }).
        otherwise({redirectTo: '/'});
}]);

angularApp.run([function() {
    $(document).foundation();
}]);

/**
 * Here we declare some empty modules for our application where we will put the app's controllers, directives, and services
 */
angular.module('app.controllers', []);
angular.module('app.directives', []);
angular.module('app.services', []);