/**
 * Created by Brandon on 10/20/2015.
 */

'use strict';

/* 3rd Party Service Wrappers */

angular.module('app.services')

//velocity service
    .factory('velocity', [
        function () {
            return $.Velocity;
        }])

//lodash service
    .factory('_', [
        function() {
            return window._;
        }])

//magnific popup service
//     .factory('magnificPopup', [
//         function() {
//             return $.magnificPopup;
//         }])

//ScrollMagic
    .factory('ScrollMagic', [
        function () {
            return window.ScrollMagic;
        }])

//sweet alert service
    .factory('swal', [
        function() {
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