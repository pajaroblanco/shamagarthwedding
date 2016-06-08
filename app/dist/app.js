'use strict';

// Declare app level module which depends on views, and components

var angularApp = angular.module('app', ['ngRoute', 'app.controllers', 'app.directives', 'app.services', 'angular-velocity', 'ngAnimate']);

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
    $(document).foundation();
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

        this.navLinks = [{ label: 'Home', smallLabel: $sce.trustAsHtml('<i class="fa fa-home"></i><span>Home</span>'), href: '#/', isActive: false }, { label: 'Portfolio', smallLabel: $sce.trustAsHtml('<i class="fa fa-youtube-play"></i><span>Portfolio</span>'), href: '#/portfolio', isActive: false }, { label: 'Pricing', smallLabel: $sce.trustAsHtml('<i class="fa fa-dollar"></i><span>Pricing</span>'), href: '#/pricing', isActive: false }, { label: 'About Us', smallLabel: $sce.trustAsHtml('<i class="fa fa-user"></i><span>About Us</span>'), href: '#/about', isActive: false }, { label: 'Contact Us', smallLabel: $sce.trustAsHtml('<i class="fa fa-phone"></i><span>Contact Us</span>'), href: '#/contact', isActive: false }];

        this.init($scope);
    }

    _createClass(BaseController, [{
        key: 'init',
        value: function init($scope) {
            var _this = this;

            //when the user navigates to a new page, clear the page messages/errors
            $scope.$on('$locationChangeStart', function (event) {
                var currentPath = _this.$location.path();
                switch (currentPath) {
                    case '/':
                        _this.setLinksInactive();
                        _this._.find(_this.navLinks, { href: '#/' }).isActive = true;
                        break;
                    case '/about':
                        _this.setLinksInactive();
                        _this._.find(_this.navLinks, { href: '#/about' }).isActive = true;
                        break;
                    case '/contact':
                        _this.setLinksInactive();
                        _this._.find(_this.navLinks, { href: '#/contact' }).isActive = true;
                        break;
                    case '/portfolio':
                        _this.setLinksInactive();
                        _this._.find(_this.navLinks, { href: '#/portfolio' }).isActive = true;
                        break;
                    case '/pricing':
                        _this.setLinksInactive();
                        _this._.find(_this.navLinks, { href: '#/pricing' }).isActive = true;
                        break;
                }

                _this.scrollToTop(0);
            });
        }
    }, {
        key: 'setLinksInactive',
        value: function setLinksInactive() {
            this._.forEach(this.navLinks, function (link) {
                link.isActive = false;
            });
        }
    }, {
        key: 'afterViewEnter',
        value: function afterViewEnter() {
            $('#view').attr('style', '');
        }
    }, {
        key: 'onScrollToTopClick',
        value: function onScrollToTopClick() {
            this.scrollToTop(350);
        }
    }, {
        key: 'scrollToTop',
        value: function scrollToTop(duration) {
            this.velocity($('html'), 'scroll', { duration: duration });
        }
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
            return ['$http', '$rootScope', '$timeout', 'velocity', HomeController];
        }
    }]);

    function HomeController($http, $rootScope, $timeout, velocity) {
        _classCallCheck(this, HomeController);

        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.velocity = velocity;

        this.init();
    }

    _createClass(HomeController, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.$rootScope.appData.smallScreenHeader = 'Cinescape';
            this.$rootScope.appData.isLight = true;

            this.$timeout(function () {
                _this.velocity($('.hero-text').find('p,h1,button'), 'transition.slideUpIn', { duration: 1000, stagger: 100, drag: true });
            }, 0);
        }
    }, {
        key: 'onLearnMore',
        value: function onLearnMore() {
            this.velocity($('.home-content > .row:first'), 'scroll', { duration: 1000, easing: 'easeOutExpo' });
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