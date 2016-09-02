/**
 * Created by Brandon on 6/2/2016.
 */

class HomeController {
    static getName() {
        return 'HomeCtrl';
    }

    static getDependencies() {
        return ['$http', '$rootScope', '$timeout', 'velocity', '$sce', 'swal', HomeController];
    }

    constructor($http, $rootScope, $timeout, velocity, $sce, swal) {
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.velocity = velocity;
        this.$sce = $sce;
        this.swal = swal;

        this.carousel = {
            images: [
                '1.jpg',
                '5.jpg',
                '4.jpg',
                '2.jpg',
                '3.jpg',
                '6.jpg'
            ],
            carouselIndex: 0
        };

        this.submitEmail = 'shamacurrimbhoy@hotmail.com';
        this.rsvp = this.getEmptyRsvp();

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

    getEmptyRsvp() {
        return {
            guestName: '',
            guestNumber: '',
            allergies: ''
        };
    }

    openRsvp() {
        let modal = $('#rsvpModal');
        modal.foundation('open');
    }

    closeRsvp() {
        let modal = $('#rsvpModal');
        modal.foundation('close');
    }
    
    onSubmit(rsvpForm) {
        if (rsvpForm.$valid) {
            this.isSubmitting = true;

            let data = {
                'Guest Name': this.rsvp.guestName,
                'Number of Guests': this.rsvp.guestNumber,
                'Food Allergies': this.rsvp.allergies
            };

            this.$http.post('https://formspree.io/' + this.submitEmail, data).then(response => {
                this.swal('Success', 'Thank you for your RSVP. See you there!', 'success');
                this.rsvp = this.getEmptyRsvp();
                this.rsvpForm.$setPristine(true);
                this.isSubmitting = false;
                this.closeRsvp();
            }, () => {
                this.isSubmitting = false;
                this.swal('Error', "Oops, we're so sorry but something went wrong when trying to RSVP. Please try again", 'error');
            });
        }
    }
}

registerComponent('app.controllers').controller(HomeController.getName(), HomeController.getDependencies());