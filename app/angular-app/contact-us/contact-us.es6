/**
 * Created by Brandon on 6/2/2016.
 */

class ContactUsController {
    static getName() {
        return 'ContactCtrl';
    }

    static getDependencies() {
        return ['$http', '$rootScope', '$timeout', 'swal', 'velocity', ContactUsController];
    }

    constructor($http, $rootScope, $timeout, swal, velocity) {
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.swal = swal;
        this.velocity = velocity;
        this.$timeout = $timeout;

        this.contact = this.getEmptyContact();
        this.isSubmitting = false;

        this.init();
    }

    init() {
        this.$rootScope.appData.smallScreenHeader = 'Contact Us';
        this.$rootScope.appData.isLight = false;

        this.$timeout(() => {
            let items = $('form');
            this.velocity(items, 'transition.slideUpIn', {duration: 500, delay: 50});
        }, 0);
    }

    getEmptyContact() {
        return {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        };
    }

    onSubmit(contactForm) {
        if (contactForm.$valid) {
            this.isSubmitting = true;
            this.swal('Success', 'Thank you for contacting us, someone will respond to you shortly.', 'success');
            this.contact = this.getEmptyContact();
            this.contactForm.$setPristine(true);
            this.isSubmitting = false;
        }
    }
}

registerComponent('app.controllers').controller(ContactUsController.getName(), ContactUsController.getDependencies());