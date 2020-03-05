import { ClientFunction } from 'testcafe';
import LoginPage from '../pages/login.page.js';
import InventoryPage from '../pages/inventory.page.js';
import CartPage from '../pages/cart.page.js';
import CheckoutUserInformationPage from '../pages/checkout.user.information.page.js';

const USERNAME = "standard_user";
const PASSWORD = "secret_sauce";


fixture('User Information Tests').page('https://www.saucedemo.com/').beforeEach(async t => {
    await LoginPage.login(USERNAME, PASSWORD);
    await t.expect(await ClientFunction(() => window.location.href)()).contains("inventory");
    let product = 'Sauce Labs Backpack'
    await InventoryPage.addToShoppingCart(product);
    await InventoryPage.navigateToShoppingCart();
    await t.expect(await CartPage.isProductInCartItemsList(product)).ok();
    await t.expect(await InventoryPage.getCartItemsCounter()).eql('1');
    await CartPage.navigateToUserInformation();
});

test('7. Continue with missing last name information', async t => {
    let firstName = 'Alejandro';
    let lastName = '';
    let zipCode = '20297';
    let expectedErrorMessage = 'Error: Last Name is required';
    await CheckoutUserInformationPage.checkout(firstName, lastName, zipCode);
    let currentErrorMessage = await CheckoutUserInformationPage.getErrorMessage();
    await t.expect(currentErrorMessage).eql(expectedErrorMessage);
});

test('8. Fill user information', async t => {
    let firstName = 'Alejandro';
    let lastName = 'Serrano';
    let zipCode = '20297';
    await CheckoutUserInformationPage.checkout(firstName, lastName, zipCode);
    await t.expect(await ClientFunction(() => window.location.href)()).contains("checkout-step-two");
});