/**
 * Created by Brandon on 6/2/2016.
 */

class HomeController {
    static getName() {
        return 'HomeCtrl';
    }

    static getDependencies() {
        return ['$http', '$rootScope', '$timeout', 'velocity', HomeController];
    }

    constructor($http, $rootScope, $timeout, velocity) {
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.velocity = velocity;

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'Cinescape';
        this.$rootScope.appData.isLight = true;

        this.$timeout(() => {
            this.velocity($('.hero-text').find('p,h1,button'), 'transition.slideUpIn', {duration: 1000, stagger: 100, drag: true});
        }, 0);
    }

    onLearnMore() {
        this.velocity($('.home-content > .row:first'), 'scroll', {duration: 1000, easing: 'easeOutExpo'});
    }
}

registerComponent('app.controllers').controller(HomeController.getName(), HomeController.getDependencies());