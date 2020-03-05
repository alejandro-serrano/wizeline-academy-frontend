import { ClientFunction } from 'testcafe';
import LoginPage from '../pages/login.page.js';

const USERNAME = "standard_user";
const PASSWORD = "secret_sauce";
const INVALID_USERNAME = "locked_out_user"

fixture('Login Tests').page('https://www.saucedemo.com/');

test('1. Login with a valid user', async t => {
    await LoginPage.login(USERNAME, PASSWORD);
    await t.expect(await ClientFunction(() => window.location.href)()).contains("inventory");
});

test('2. Login with invalid user', async t => {
    await LoginPage.login(INVALID_USERNAME, PASSWORD);
    let errorMessage = await LoginPage.getErrorMessage();
    await t.expect(errorMessage).eql("Epic sadface: Sorry, this user has been locked out.");
});
