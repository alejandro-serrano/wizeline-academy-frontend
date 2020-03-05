import { Selector, t } from 'testcafe';

class LoginPage {
    
    /**
     * Initialize web elements.
     */
    constructor() {
        this.usernameField = Selector('input#user-name');
        this.passwordField = Selector('input#password');
        this.loginButton = Selector(".btn_action");
        this.errorMessageLabel = Selector("h3").withAttribute("data-test");
    }

    /**
     * Login to the application with the given credentials.
     * 
     * @param {string} username Username.
     * @param {string} password Password.
     */
    async login(username, password) {
        await t.typeText(this.usernameField, username)
              .typeText(this.passwordField, password)
              .click(this.loginButton);
    }

    /**
     * Get the error message
     */
    async getErrorMessage() {
        let errorMessage = await this.errorMessageLabel.textContent;
        return errorMessage;
    }

}

export default new LoginPage();
