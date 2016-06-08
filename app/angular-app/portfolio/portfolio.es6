/**
 * Created by Brandon on 6/2/2016.
 */

class PortfolioController {
    static getName() {
        return 'PortfolioCtrl';
    }

    static getDependencies() {
        return ['$rootScope', PortfolioController];
    }

    constructor($rootScope) {
         this.$rootScope = $rootScope;

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'Portfolio';
        this.$rootScope.appData.isLight = false;

        // this.$timeout(() => {
        //     let items = $('form');
        //     this.velocity(items, 'transition.slideUpIn', {duration: 500, delay: 50});
        // }, 0);
    }
}

registerComponent('app.controllers').controller(PortfolioController.getName(), PortfolioController.getDependencies());