'use strict';

/**
 * Created by Brandon on 5/25/2016.
 */

/**
 * A helper class to simplify registering Angular components and provide a consistent syntax for doing so.
 */
function registerComponent(appName) {

    var app = angular.module(appName);

    return {
        directive: directive,
        controller: controller,
        service: service,
        provider: provider,
        factory: factory
    };

    function directive(name, constructorFn) {

        constructorFn = _normalizeConstructor(constructorFn);

        if (!constructorFn.prototype.compile) {
            // create an empty compile function if none was defined.
            constructorFn.prototype.compile = function () {};
        }

        var originalCompileFn = _cloneFunction(constructorFn.prototype.compile);

        // Decorate the compile method to automatically return the link method (if it exists)
        // and bind it to the context of the constructor (so `this` works correctly).
        // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
        // returns `this.link` from within the compile function.
        _override(constructorFn.prototype, 'compile', function () {
            return function () {
                originalCompileFn.apply(this, arguments);

                if (constructorFn.prototype.link) {
                    return constructorFn.prototype.link.bind(this);
                }
            };
        });

        var factoryArray = _createFactoryArray(constructorFn);

        app.directive(name, factoryArray);
        return this;
    }

    function controller(name, contructorFn) {
        app.controller(name, contructorFn);
        return this;
    }

    function service(name, contructorFn) {
        app.service(name, contructorFn);
        return this;
    }

    function provider(name, constructorFn) {
        app.provider(name, constructorFn);
        return this;
    }

    function factory(name, constructorFn) {
        constructorFn = _normalizeConstructor(constructorFn);
        var factoryArray = _createFactoryArray(constructorFn);
        app.factory(name, factoryArray);
        return this;
    }

    /**
     * If the constructorFn is an array of type ['dep1', 'dep2', ..., constructor() {}]
     * we need to pull out the array of dependencies and add it as an $inject property of the
     * actual constructor function.
     * @param input
     * @returns {*}
     * @private
     */
    function _normalizeConstructor(input) {
        var constructorFn;

        if (input.constructor === Array) {
            //
            var injected = input.slice(0, input.length - 1);
            constructorFn = input[input.length - 1];
            constructorFn.$inject = injected;
        } else {
            constructorFn = input;
        }

        return constructorFn;
    }

    /**
     * Convert a constructor function into a factory function which returns a new instance of that
     * constructor, with the correct dependencies automatically injected as arguments.
     *
     * In order to inject the dependencies, they must be attached to the constructor function with the
     * `$inject` property annotation.
     *
     * @param constructorFn
     * @returns {Array.<T>}
     * @private
     */
    function _createFactoryArray(constructorFn) {
        // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
        var args = constructorFn.$inject || [];
        var factoryArray = args.slice(); // create a copy of the array
        // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
        // dependency, and the final item is the factory function itself.
        factoryArray.push(function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            //return new constructorFn(...args);
            var instance = new (Function.prototype.bind.apply(constructorFn, [null].concat(args)))();
            for (var key in instance) {
                instance[key] = instance[key];
            }
            return instance;
        });

        return factoryArray;
    }

    /**
     * Clone a function
     * @param original
     * @returns {Function}
     */
    function _cloneFunction(original) {
        return function () {
            return original.apply(this, arguments);
        };
    }

    /**
     * Override an object's method with a new one specified by `callback`.
     * @param object
     * @param methodName
     * @param callback
     */
    function _override(object, methodName, callback) {
        object[methodName] = callback(object[methodName]);
    }
}
'use strict';

// Declare app level module which depends on views, and components

var angularApp = angular.module('app', ['ngRoute', 'app.controllers', 'app.directives', 'app.services', 'angular-velocity', 'ngAnimate', 'angular-carousel']);

angularApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    //$locationProvider.hashPrefix('!');

    //Setup URL routes.
    $routeProvider.when('/', {
        templateUrl: 'angular-app/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm',
        label: 'Home'
    }).when('/about', {
        templateUrl: 'angular-app/about-us/about-us.html',
        controller: 'AboutCtrl',
        controllerAs: 'vm',
        label: 'About Us'
    }).when('/contact', {
        templateUrl: 'angular-app/contact-us/contact-us.html',
        controller: 'ContactCtrl',
        controllerAs: 'vm',
        label: 'Contact Us'
    }).when('/portfolio', {
        templateUrl: 'angular-app/portfolio/portfolio.html',
        controller: 'PortfolioCtrl',
        controllerAs: 'vm',
        label: 'Portfolio'
    }).when('/pricing', {
        templateUrl: 'angular-app/pricing/pricing.html',
        controller: 'PricingCtrl',
        controllerAs: 'vm',
        label: 'Pricing'
    }).otherwise({ redirectTo: '/' });
}]);

angularApp.run([function () {
    //$(document).foundation();
}]);

/**
 * Here we declare some empty modules for our application where we will put the app's controllers, directives, and services
 */
angular.module('app.controllers', []);
angular.module('app.directives', []);
angular.module('app.services', []);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Brandon on 6/2/2016.
 */

var AboutUsController = function () {
    _createClass(AboutUsController, null, [{
        key: 'getName',
        value: function getName() {
            return 'AboutCtrl';
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            return ['$http', '$rootScope', '$timeout', 'ScrollMagic', AboutUsController];
        }
    }]);

    function AboutUsController($http, $rootScope, $timeout, ScrollMagic) {
        _classCallCheck(this, AboutUsController);

        this.$http = $http;
        this.$rootScope = $rootScope;
        this.ScrollMagic = ScrollMagic;
        this.$timeout = $timeout;
        this.runStartAnimation = false;

        this.contacts = [{
            photoUrl: 'https://0.s3.envato.com/files/183626516/Image/Image_Profile.jpg', //'dist/images/jeremy.jpg',
            name: 'Jeremy Ayers',
            title: 'Pilot (FAA Licensed)',
            email: 'jeremy@cinescape.us'
        }, {
            photoUrl: 'https://0.s3.envato.com/files/183626516/Image/Image_Profile.jpg',
            name: 'Sam Low',
            title: 'Cinematographer',
            email: 'sam@cinescape.us'
        }, {
            photoUrl: 'https://0.s3.envato.com/files/183626516/Image/Image_Profile.jpg',
            name: 'Darren Beasley',
            title: 'Cinematographer / Photographer',
            email: 'darren@cinescape.us'
        }, {
            photoUrl: 'https://0.s3.envato.com/files/183626516/Image/Image_Profile.jpg',
            name: 'Brandon Ayers',
            title: 'Cinematographer / Photographer',
            email: 'brandon@cinescape.us'
        }];

        // $timeout(() => {
        //     this.runStartAnimation = true;
        // }, 0);

        this.init();
    }

    _createClass(AboutUsController, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.$rootScope.appData.smallScreenHeader = 'About Us';
            this.$rootScope.appData.isLight = true;

            this.$timeout(function () {
                var getContactCardScene = function getContactCardScene(triggerSelector) {
                    return new _this.ScrollMagic.Scene({ triggerElement: triggerSelector }).on("enter", function (e) {
                        $(triggerSelector).velocity("transition.slideLeftIn", { duration: 750, stagger: 150 });
                    }).on("leave", function (e) {
                        $(triggerSelector).velocity({ opacity: 0 }, { duration: 300, stagger: 150 });
                    })
                    //.addIndicators() //uncomment this to see where the scroll triggers will be
                    .triggerHook(.75);
                };

                var getSectionScene = function getSectionScene(triggerSelector) {
                    return new _this.ScrollMagic.Scene({ triggerElement: triggerSelector }).on("enter", function (e) {
                        $(triggerSelector).find('h1,h1+p').velocity("transition.slideLeftIn", { duration: 1000, stagger: 200 });
                    }).on("leave", function (e) {
                        $(triggerSelector).find('h1,h1+p').velocity({ opacity: 0 }, { duration: 300, stagger: 200 });
                    })
                    //.addIndicators() //uncomment this to see where the scroll triggers will be
                    .triggerHook(.75);
                };

                var scrollMagicController = new _this.ScrollMagic.Controller();
                scrollMagicController.addScene(getContactCardScene('.contact-card'));
                scrollMagicController.addScene(getSectionScene('.about-hero'));
                scrollMagicController.addScene(getSectionScene('.philosophy'));
                //scrollMagicController.addScene(getContactCardScene('#bright-bold-container'));
                //scrollMagicController.addScene(getContactCardScene('#human-centered-container'));
            }, 0);
        }
    }]);

    return AboutUsController;
}();

registerComponent('app.controllers').controller(AboutUsController.getName(), AboutUsController.getDependencies());
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is the base controller attached to the <body> tag
 */

var BaseController = function () {
    _createClass(BaseController, null, [{
        key: 'getName',
        value: function getName() {
            return 'BaseCtrl';
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            return ['$rootScope', '$scope', '$location', 'velocity', '_', '$sce', BaseController];
        }
    }]);

    function BaseController($rootScope, $scope, $location, velocity, _, $sce) {
        _classCallCheck(this, BaseController);

        this.$rootScope = $rootScope;
        this.$location = $location;
        this.velocity = velocity;
        this._ = _;

        this.$rootScope.appData = {
            smallScreenHeader: 'Cinescape',
            activeNavigationLink: 'home'
        };

        this.navLinks = [{ label: 'Destination', smallLabel: $sce.trustAsHtml('<span>Destination</span>'), section: 'destination', isActive: false }, { label: 'mehndi', smallLabel: $sce.trustAsHtml('<span>Mehndi/Sangeet</span>'), section: 'mehndi', isActive: false }, { label: 'ceremonies', smallLabel: $sce.trustAsHtml('<span>The Ceremonies</span>'), section: 'ceremony', isActive: false }, { label: 'reception', smallLabel: $sce.trustAsHtml('<span>Reception</span>'), section: 'reception', isActive: false }, { label: 'gracias', smallLabel: $sce.trustAsHtml('<span>Gracias & Adios Brunch</span>'), section: 'adios', isActive: false }, { label: 'travel', smallLabel: $sce.trustAsHtml('<span>Travel Info</span>'), section: 'travel', isActive: false }
        // {label: 'Ceremony', smallLabel: $sce.trustAsHtml('<span>Ceremony</span>'), section: 'ceremony', isActive: false},
        // {label: 'Reception', smallLabel: $sce.trustAsHtml('<span>Reception</span>'), section: 'reception', isActive: false},
        // {label: 'Afterparty', smallLabel: $sce.trustAsHtml('<span>Afterparty</span>'), section: 'afterparty', isActive: false}
        ];

        this.init($scope);
    }

    _createClass(BaseController, [{
        key: 'init',
        value: function init($scope) {
            //when the user navigates to a new page, clear the page messages/errors
            // $scope.$on('$locationChangeStart', event => {
            //     let currentPath = this.$location.path();
            //     switch (currentPath) {
            //         case '/':
            //             this.setLinksInactive();
            //             this._.find(this.navLinks, {href: '#/'}).isActive = true;
            //             break;
            //         case '/about':
            //             this.setLinksInactive();
            //             this._.find(this.navLinks, {href: '#/about'}).isActive = true;
            //             break;
            //         case '/contact':
            //             this.setLinksInactive();
            //             this._.find(this.navLinks, {href: '#/contact'}).isActive = true;
            //             break;
            //         case '/portfolio':
            //             this.setLinksInactive();
            //             this._.find(this.navLinks, {href: '#/portfolio'}).isActive = true;
            //             break;
            //         case '/pricing':
            //             this.setLinksInactive();
            //             this._.find(this.navLinks, {href: '#/pricing'}).isActive = true;
            //             break;
            //     }
            //
            //     this.scrollToTop(0);
            // });
        }
    }, {
        key: 'scrollToSection',
        value: function scrollToSection(section) {
            this.velocity($('.' + section), 'scroll', { duration: 1000, easing: 'easeOutExpo' });
        }

        // setLinksInactive() {
        //     this._.forEach(this.navLinks, link => {link.isActive = false});
        // }

    }, {
        key: 'afterViewEnter',
        value: function afterViewEnter() {
            $('#view').attr('style', '');
        }

        // onScrollToTopClick() {
        //     this.scrollToTop(350);
        // }
        //
        // scrollToTop(duration) {
        //     this.velocity($('html'), 'scroll', {duration: duration});
        // }

    }]);

    return BaseController;
}();

registerComponent('app.controllers').controller(BaseController.getName(), BaseController.getDependencies());
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Brandon on 6/2/2016.
 */

var ContactUsController = function () {
    _createClass(ContactUsController, null, [{
        key: 'getName',
        value: function getName() {
            return 'ContactCtrl';
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            return ['$http', '$rootScope', '$timeout', 'swal', 'velocity', ContactUsController];
        }
    }]);

    function ContactUsController($http, $rootScope, $timeout, swal, velocity) {
        _classCallCheck(this, ContactUsController);

        this.$http = $http;
        this.$rootScope = $rootScope;
        this.swal = swal;
        this.velocity = velocity;
        this.$timeout = $timeout;

        this.contact = this.getEmptyContact();
        this.isSubmitting = false;

        this.init();
    }

    _createClass(ContactUsController, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.$rootScope.appData.smallScreenHeader = 'Contact Us';
            this.$rootScope.appData.isLight = false;

            this.$timeout(function () {
                var items = $('form');
                _this.velocity(items, 'transition.slideUpIn', { duration: 500, delay: 50 });
            }, 0);
        }
    }, {
        key: 'getEmptyContact',
        value: function getEmptyContact() {
            return {
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            };
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(contactForm) {
            if (contactForm.$valid) {
                this.isSubmitting = true;
                this.swal('Success', 'Thank you for contacting us, someone will respond to you shortly.', 'success');
                this.contact = this.getEmptyContact();
                this.contactForm.$setPristine(true);
                this.isSubmitting = false;
            }
        }
    }]);

    return ContactUsController;
}();

registerComponent('app.controllers').controller(ContactUsController.getName(), ContactUsController.getDependencies());
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Brandon on 6/2/2016.
 */

var HomeController = function () {
    _createClass(HomeController, null, [{
        key: 'getName',
        value: function getName() {
            return 'HomeCtrl';
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            return ['$http', '$rootScope', '$timeout', 'velocity', '$sce', HomeController];
        }
    }]);

    function HomeController($http, $rootScope, $timeout, velocity, $sce) {
        _classCallCheck(this, HomeController);

        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.velocity = velocity;
        this.$sce = $sce;

        this.carousel = {
            images: ['1.jpg', '5.jpg', '4.jpg', '2.jpg', '3.jpg', '6.jpg'],
            carouselIndex: 0
        };

        this.init();
    }

    _createClass(HomeController, [{
        key: 'init',
        value: function init() {
            this.$rootScope.appData.smallScreenHeader = 'Cinescape';
            this.$rootScope.appData.isLight = true;

            this.$timeout(function () {
                $(document).foundation();

                //this.velocity($('.hero-text').find('p,h1,button'), 'transition.slideUpIn', {duration: 1000, stagger: 100, drag: true});
            }, 0);
        }
    }]);

    return HomeController;
}();

registerComponent('app.controllers').controller(HomeController.getName(), HomeController.getDependencies());
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Brandon on 6/2/2016.
 */

var PortfolioController = function () {
    _createClass(PortfolioController, null, [{
        key: 'getName',
        value: function getName() {
            return 'PortfolioCtrl';
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            return ['$rootScope', PortfolioController];
        }
    }]);

    function PortfolioController($rootScope) {
        _classCallCheck(this, PortfolioController);

        this.$rootScope = $rootScope;

        this.init();
    }

    _createClass(PortfolioController, [{
        key: 'init',
        value: function init() {
            this.$rootScope.appData.smallScreenHeader = 'Portfolio';
            this.$rootScope.appData.isLight = false;

            // this.$timeout(() => {
            //     let items = $('form');
            //     this.velocity(items, 'transition.slideUpIn', {duration: 500, delay: 50});
            // }, 0);
        }
    }]);

    return PortfolioController;
}();

registerComponent('app.controllers').controller(PortfolioController.getName(), PortfolioController.getDependencies());
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Brandon on 6/2/2016.
 */

var PricingController = function () {
    _createClass(PricingController, null, [{
        key: 'getName',
        value: function getName() {
            return 'PricingCtrl';
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            return ['$rootScope', 'velocity', '$timeout', PricingController];
        }
    }]);

    function PricingController($rootScope, velocity, $timeout) {
        _classCallCheck(this, PricingController);

        this.$rootScope = $rootScope;
        this.velocity = velocity;
        this.$timeout = $timeout;

        this.pricingInfo = [{
            title: 'Standard Property',
            price: '$1499*',
            description: '* This is just an estimate. Pricing is subject to change based on each individual property.',
            houseSize: '< 2000 sqft house',
            lotSize: '< 8000 sqft lot',
            included: 'Professionally edited 4k footage'
        }, {
            title: 'Large Property',
            price: '$2499*',
            description: '* This is just an estimate. Pricing is subject to change based on each individual property.',
            houseSize: '2001 - 3500 sqft house',
            lotSize: '8001 - 16000 sqft lot',
            included: 'Professionally edited 4k footage'
        }, {
            title: 'Luxury Property',
            price: '$4999*',
            description: '* This is just an estimate. Pricing is subject to change based on each individual property.',
            houseSize: '> 3500 sqft house',
            lotSize: '> 16000 sqft lot',
            included: 'Professionally edited 4k footage'
        }];

        this.init();
    }

    _createClass(PricingController, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.$rootScope.appData.smallScreenHeader = 'Pricing';
            this.$rootScope.appData.isLight = false;

            this.$timeout(function () {
                var items = $('.pricing-wrapper');
                _this.velocity(items, 'transition.slideLeftIn', { duration: 750, stagger: 75 });
            }, 0);
        }
    }]);

    return PricingController;
}();

registerComponent('app.controllers').controller(PricingController.getName(), PricingController.getDependencies());
'use strict';

/**
 * Created by Brandon on 10/29/2015.
 */

angular.module('app.directives').directive('appForm', ['$timeout', 'velocity', '_', function ($timeout, velocity, _) {
    return {
        restrict: 'A', //can only be attribute
        link: function link(scope, element, attrs) {
            if (!attrs.name) {
                throw 'Directive app-form requires "name" attribute.';
            }

            element.addClass('app-form');

            var addBlurHandlers = function addBlurHandlers() {
                var allInputs = element.find('input, textarea');
                allInputs.off('blur.appForm');
                allInputs.on('blur.appForm', function () {
                    $(this).addClass('has-visited');
                    showErrors();
                });
            };
            addBlurHandlers();

            var getInvalidElements = function getInvalidElements() {
                if (element.hasClass('ng-submitted')) {
                    return element.find('.ng-invalid');
                } else {
                    var inputs = element.find('input.ng-invalid.ng-dirty.has-visited');
                    var textareas = element.find('textarea.ng-invalid.ng-dirty.has-visited');
                    var selects = element.find('select.ng-invalid.ng-dirty');

                    return inputs.add(textareas).add(selects);
                }
            };

            var showErrors = function showErrors() {
                var errorEls = element.find('input.is-invalid-input,label.is-invalid-label,span.form-error');
                errorEls.removeClass('is-invalid-input').removeClass('is-invalid-label').removeClass('is-visible');

                var invalidFields = getInvalidElements();
                _.forEach(invalidFields, function (field) {
                    var parentDiv = $(field).parents('div:first');
                    //parentDiv.addClass('error');
                    parentDiv.find('label').addClass('is-invalid-label');
                    parentDiv.find('input').addClass('is-invalid-input');
                    parentDiv.find('span.form-error').addClass('is-visible');
                });
            };

            element.on('submit', function () {
                $timeout(function () {
                    var invalidFields = getInvalidElements();
                    var visibleInvalidFields = invalidFields.filter(':visible');
                    if (visibleInvalidFields.length > 0) {
                        velocity($(visibleInvalidFields[0]), 'scroll', { duration: 300, offset: -100, easing: 'spring' });
                    }

                    showErrors();
                }, 50);

                //if ng-submit wasn't set (which will prevent form submission), then we need to prevent form submission ourselves.
                if (!attrs.ngSubmit) {
                    scope.$eval('$parent.' + attrs.name).$setSubmitted();
                    event.preventDefault();
                    event.returnValue = false;
                    return false;
                }
            });

            scope.$parent.$watch(attrs.name + '.$error', function () {
                $timeout(function () {
                    showErrors();
                }, 200);
            }, true);

            scope.$parent.$watch(attrs.name + '.$pristine', function (isPristine) {
                if (isPristine === true) {
                    $timeout(function () {
                        showErrors();
                    }, 200);
                }
            });

            scope.$watch(function () {
                return element.find('input, select, textarea').length;
            }, function () {
                addBlurHandlers();
                setupFormElementWatches();
            });

            /////////////////auto save bindings/////////////////////
            var onChange = function onChange(trackLastActivity) {
                //console.log('auto-save-trigger onChange triggered');
                if (trackLastActivity === true) {
                    scope.lastActivity = Date.now();
                } else {
                    scope.isDirty = true;
                }

                if (!scope.$$phase && !scope.$root.$$phase) {
                    scope.$apply();
                }
            };

            var setupFormElementWatches = function setupFormElementWatches() {
                if (scope.enableAutoSave != 'true') {
                    return;
                }

                element.find('input, textarea, select').off('keyup.appForm change.appForm').not('[auto-save-ignore]').each(function () {
                    var input = this;
                    var isTextInput = input.tagName.toLowerCase() == 'textarea' || input.tagName.toLowerCase() == 'input' && ['radio', 'checkbox', 'hidden'].indexOf($(input).attr('type').toLowerCase()) < 0;

                    //if it's a ucr-select2 control then don't treat it like a text input
                    isTextInput = isTextInput && $(input).attr('ucr-select2') != '';

                    if (isTextInput) {
                        $(input).bind('keyup.appForm', function () {
                            onChange(true);
                        });
                    } else {
                        $(input).bind('change.appForm', onChange);
                    }
                });
            };

            setupFormElementWatches();
        },
        controller: ['$scope', function ($scope) {
            $scope.maxSaveInterval = $scope.maxSaveInterval ? $scope.maxSaveInterval : 3000; //The form won't save more often than this
            $scope.inactivityInterval = $scope.inactivityInterval ? $scope.inactivityInterval : 1000; //Amount of inactivity on text inputs necessary before triggering auto save

            $scope.lastActivity = 0;
            $scope.$watch('lastActivity', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                //console.log('lastActivity watch - oldValue: ' + oldValue + ', newValue: ' + newValue);
                if ($scope.isDirty || newValue == 0) {
                    //console.log('isDirty is already true or newValue is 0, returning');
                    return;
                }

                function setIsDirty() {
                    //console.log('setIsDirty() called in lastActivity watch');
                    $scope.isDirty = true;
                }

                var now = Date.now();

                var msSinceLastActivity = now - oldValue;
                //console.log('Time since last activity: ' + msSinceLastActivity);
                if (oldValue == 0 || msSinceLastActivity < $scope.inactivityInterval) {
                    //console.log('Not enough inactivity');
                    if ($scope.inactivityTimeout != null) {
                        $timeout.cancel($scope.inactivityTimeout);
                        $scope.inactivityTimeout = null;
                    }

                    $scope.inactivityTimeout = $timeout(setIsDirty, $scope.inactivityInterval);
                    return;
                }

                //console.log('Calling setIsDirty directly since last activity > inactivityInterval');
                setIsDirty();
            });

            $scope.inactivityTimeout = null;
            $scope.isDirty = false;
            $scope.$watch('isDirty', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                //console.log('isDirty watch: ' + newValue);
                if (newValue == false || $scope.maxSaveTimeout != null) {
                    return;
                }

                var now = Date.now();

                var msSinceLastSaved = now - $scope.lastSaved;
                if (msSinceLastSaved < $scope.maxSaveInterval) {
                    var nextSaveTime = $scope.maxSaveInterval - msSinceLastSaved;
                    $scope.maxSaveTimeout = $timeout($scope.triggerAutoSave, nextSaveTime);
                    return;
                }

                $scope.triggerAutoSave();
            });
            $scope.triggerAutoSave = function () {
                //console.log('AutoSave triggered');
                if ($scope.maxSaveTimeout != null) $timeout.cancel($scope.maxSaveTimeout);
                $scope.maxSaveTimeout = null;
                if ($scope.inactivityTimeout != null) $timeout.cancel($scope.inactivityTimeout);
                $scope.inactivityTimeout = null;
                $scope.lastActivity = 0;
                $scope.isDirty = false;
                $scope.lastSaved = Date.now();
                $scope.onAutoSave();
            };
            $scope.lastSaved = 0;
            $scope.maxSaveTimeout = null;
        }],
        scope: {
            'enableAutoSave': '@',
            'onAutoSave': '&',
            'maxSaveInterval': '@',
            'inactivityInterval': '@'
        }
    };
}]);
/**
 * Created by Brandon on 10/20/2015.
 */

'use strict';

/* 3rd Party Service Wrappers */

angular.module('app.services')

//velocity service
.factory('velocity', [function () {
    return $.Velocity;
}])

//lodash service
.factory('_', [function () {
    return window._;
}])

//magnific popup service
//     .factory('magnificPopup', [
//         function() {
//             return $.magnificPopup;
//         }])

//ScrollMagic
.factory('ScrollMagic', [function () {
    return window.ScrollMagic;
}])

//sweet alert service
.factory('swal', [function () {
    return window.swal;
}]);

//js-logger library
//     .factory('Logger', [
//         function() {
//             return Logger;
//         }])

//momentjs library
//     .factory('moment', [
//         function() {
//             return moment;
//         }]);