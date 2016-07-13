/**
 * Created by Brandon on 6/2/2016.
 */

class HomeController {
    static getName() {
        return 'HomeCtrl';
    }

    static getDependencies() {
        return ['$http', '$rootScope', '$timeout', 'velocity', '$sce', HomeController];
    }

    constructor($http, $rootScope, $timeout, velocity, $sce) {
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.velocity = velocity;
        this.$sce = $sce;

        this.carousel = {
            images: [
                '5.jpg',
                '1.jpg',
                '4.jpg',
                '2.jpg',
                '3.jpg'
            ],
            carouselIndex: 0
        };

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'Cinescape';
        this.$rootScope.appData.isLight = true;

        this.$timeout(() => {
            $(document).foundation();

            //this.velocity($('.hero-text').find('p,h1,button'), 'transition.slideUpIn', {duration: 1000, stagger: 100, drag: true});
        }, 0);
    }
}

registerComponent('app.controllers').controller(HomeController.getName(), HomeController.getDependencies());