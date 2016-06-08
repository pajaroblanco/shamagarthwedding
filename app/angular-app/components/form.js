/**
 * Created by Brandon on 10/29/2015.
 */

angular.module('app.directives')

    .directive('appForm', [ '$timeout', 'velocity', '_',
        function ($timeout, velocity, _) {
            return {
                restrict: 'A', //can only be attribute
                link: function (scope, element, attrs) {
                    if (!attrs.name) {
                        throw 'Directive app-form requires "name" attribute.';
                    }

                    element.addClass('app-form');

                    var addBlurHandlers = function () {
                        var allInputs = element.find('input, textarea');
                        allInputs.off('blur.appForm');
                        allInputs.on('blur.appForm', function () {
                            $(this).addClass('has-visited');
                            showErrors();
                        });
                    };
                    addBlurHandlers();

                    var getInvalidElements = function() {
                        if (element.hasClass('ng-submitted')) {
                            return element.find('.ng-invalid');
                        }
                        else {
                            var inputs = element.find('input.ng-invalid.ng-dirty.has-visited');
                            var textareas = element.find('textarea.ng-invalid.ng-dirty.has-visited');
                            var selects = element.find('select.ng-invalid.ng-dirty');

                            return inputs.add(textareas).add(selects);
                        }
                    };

                    var showErrors = function() {
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
                                velocity($(visibleInvalidFields[0]), 'scroll', {duration: 300, offset: -100, easing: 'spring'});
                            }

                            showErrors();
                        }, 50);

                        //if ng-submit wasn't set (which will prevent form submission), then we need to prevent form submission ourselves.
                        if (!attrs.ngSubmit) {
                            scope.$eval('$parent.' + attrs.name).$setSubmitted();
                            event.preventDefault();
                            event.returnValue=false;
                            return false;
                        }
                    });

                    scope.$parent.$watch(attrs.name+'.$error', function() {
                        $timeout(function () {
                            showErrors();
                        }, 200);
                    }, true);

                    scope.$parent.$watch(attrs.name+'.$pristine', function(isPristine) {
                        if (isPristine === true) {
                            $timeout(function () {
                                showErrors();
                            }, 200);
                        }
                    });

                    scope.$watch(
                        function () {
                            return element.find('input, select, textarea').length;
                        },

                        function () {
                            addBlurHandlers();
                            setupFormElementWatches();
                        }
                    );

                    /////////////////auto save bindings/////////////////////
                    var onChange = function(trackLastActivity) {
                        //console.log('auto-save-trigger onChange triggered');
                        if (trackLastActivity === true) {
                            scope.lastActivity = Date.now();
                        }
                        else {
                            scope.isDirty = true;
                        }

                        if (!scope.$$phase && !scope.$root.$$phase) {
                            scope.$apply();
                        }
                    };

                    var setupFormElementWatches = function() {
                        if (scope.enableAutoSave != 'true') {
                            return;
                        }

                        element.find('input, textarea, select').off('keyup.appForm change.appForm').not('[auto-save-ignore]').each(function() {
                            var input = this;
                            var isTextInput = input.tagName.toLowerCase() == 'textarea' || (input.tagName.toLowerCase() == 'input' && ['radio', 'checkbox', 'hidden'].indexOf($(input).attr('type').toLowerCase()) < 0);

                            //if it's a ucr-select2 control then don't treat it like a text input
                            isTextInput = isTextInput && $(input).attr('ucr-select2') != '';

                            if (isTextInput) {
                                $(input).bind('keyup.appForm', function() {
                                    onChange(true);
                                });
                            }
                            else {
                                $(input).bind('change.appForm', onChange);
                            }
                        });
                    };

                    setupFormElementWatches();
                },
                controller: ['$scope', function($scope) {
                    $scope.maxSaveInterval = $scope.maxSaveInterval ? $scope.maxSaveInterval: 3000; //The form won't save more often than this
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
                    $scope.triggerAutoSave = function() {
                        //console.log('AutoSave triggered');
                        if ($scope.maxSaveTimeout != null)
                            $timeout.cancel($scope.maxSaveTimeout);
                        $scope.maxSaveTimeout = null;
                        if ($scope.inactivityTimeout != null)
                            $timeout.cancel($scope.inactivityTimeout);
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