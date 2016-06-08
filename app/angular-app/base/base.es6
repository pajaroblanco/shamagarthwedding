/**
 * This is the base controller attached to the <body> tag
 */
class BaseController {
    static getName() {
        return 'BaseCtrl';
    }
    
    static getDependencies() {
        return ['$rootScope', '$scope', '$location', 'velocity', '_', '$sce', BaseController];
    }

    constructor($rootScope, $scope, $location, velocity, _, $sce) {
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.velocity = velocity;
        this._ = _;

        this.$rootScope.appData = {
            smallScreenHeader: 'Cinescape',
            activeNavigationLink: 'home'
        };

        this.navLinks = [
            {label: 'Home', smallLabel: $sce.trustAsHtml('<i class="fa fa-home"></i><span>Home</span>'), href: '#/', isActive: false},
            {label: 'Portfolio', smallLabel: $sce.trustAsHtml('<i class="fa fa-youtube-play"></i><span>Portfolio</span>'), href: '#/portfolio', isActive: false},
            {label: 'Pricing', smallLabel: $sce.trustAsHtml('<i class="fa fa-dollar"></i><span>Pricing</span>'), href: '#/pricing', isActive: false},
            {label: 'About Us', smallLabel: $sce.trustAsHtml('<i class="fa fa-user"></i><span>About Us</span>'), href: '#/about', isActive: false},
            {label: 'Contact Us', smallLabel: $sce.trustAsHtml('<i class="fa fa-phone"></i><span>Contact Us</span>'), href: '#/contact', isActive: false}
        ];

        this.init($scope);
    }

    init($scope) {
        //when the user navigates to a new page, clear the page messages/errors
        $scope.$on('$locationChangeStart', event => {
            let currentPath = this.$location.path();
            switch (currentPath) {
                case '/':
                    this.setLinksInactive();
                    this._.find(this.navLinks, {href: '#/'}).isActive = true;
                    break;
                case '/about':
                    this.setLinksInactive();
                    this._.find(this.navLinks, {href: '#/about'}).isActive = true;
                    break;
                case '/contact':
                    this.setLinksInactive();
                    this._.find(this.navLinks, {href: '#/contact'}).isActive = true;
                    break;
                case '/portfolio':
                    this.setLinksInactive();
                    this._.find(this.navLinks, {href: '#/portfolio'}).isActive = true;
                    break;
                case '/pricing':
                    this.setLinksInactive();
                    this._.find(this.navLinks, {href: '#/pricing'}).isActive = true;
                    break;
            }

            this.scrollToTop(0);
        });
    }

    setLinksInactive() {
        this._.forEach(this.navLinks, link => {link.isActive = false});
    }

    afterViewEnter() {
        $('#view').attr('style', '');
    }

    onScrollToTopClick() {
        this.scrollToTop(350);
    }

    scrollToTop(duration) {
        this.velocity($('html'), 'scroll', {duration: duration});
    }
}

registerComponent('app.controllers').controller(BaseController.getName(), BaseController.getDependencies());