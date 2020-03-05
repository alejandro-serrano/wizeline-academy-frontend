import { Selector, t } from 'testcafe';

class CheckoutUserInformationPage {
    
    /**
     * Constructor. Initialize web elements
     */
    constructor() {
        this.firstNameField = Selector('input#first-name');
        this.lastNameField = Selector('input#last-name');
        this.zipCodeField = Selector('input#postal-code');
        this.cancelButton = Selector('.btn_secondary.cart_cancel_link');
        this.continueButton = Selector('.btn_primary.cart_button');
        this.errorMessage = Selector('[data-test="error"]');
    }

    /**
     * Fills out user information to continue with the checkout cart process.
     * 
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} zipCode 
     */
    async checkout(firstName, lastName, zipCode) {
        if (firstName) {
            await t.typeText(this.firstNameField, firstName);
        }

        if (lastName) {
            await t.typeText(this.lastNameField, lastName);
        }

        if (zipCode) {
            await t.typeText(this.zipCodeField, zipCode);
        }

        await t.click(this.continueButton);
    }

    /**
     * Returns true if error message exists. Otherwise, false.
     */
    async isErrorMessageDisplayed() {
        await this.errorMessage.exists;
    }

    /**
     * Gets the current error message in the user information page.
     */
    async getErrorMessage() {
        let errorMessage = await this.errorMessage.textContent;
        return errorMessage;
    }
    
}

export default new CheckoutUserInformationPage();
