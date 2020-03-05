import { Selector, t } from 'testcafe';

class CheckoutConfirmationPage {
    
    /**
     * Initializes web elements.
     */
    constructor() {
        this.thankYouLabel = Selector('.complete-header').withText('THANK YOU FOR YOUR ORDER');
        this.completeLabel = Selector('.complete-text');
        this.ponyExpressLogo = Selector('.complete-text');
    }

    /**
     * Returns the number of current cart items in the cart overview list.
     */
    async isConfirmationPageLoaded() {
        return this.ponyExpressLogo.exists;
    }
}

export default new CheckoutConfirmationPage();
