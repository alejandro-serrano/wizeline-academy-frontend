import { ClientFunction } from 'testcafe';
import LoginPage from '../pages/login.page.js';
import InventoryPage from '../pages/inventory.page.js';
import CartPage from '../pages/cart.page.js';
import CheckoutUserInformationPage from '../pages/checkout.user.information.page.js';
import CheckoutOverviewPage from '../pages/checkout.overview.page.js';
import CheckoutConfirmationPage from '../pages/checkout.complete.order.page.js';


const USERNAME = "standard_user";
const PASSWORD = "secret_sauce";
const FIRST_NAME = 'Alejandro';
const LAST_NAME = 'Serrano';
const ZIP_CODE = '20297';
const PRODUCTS = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light'
]

const PRODUCTS_LENGTH = PRODUCTS.length;


fixture('Complete Order Tests').page('https://www.saucedemo.com/').beforeEach(async t => {
    await LoginPage.login(USERNAME, PASSWORD);
    await t.expect(await ClientFunction(() => window.location.href)()).contains("inventory");

    for (const product of PRODUCTS) {
        await InventoryPage.addToShoppingCart(product);
    }
    
    await InventoryPage.navigateToShoppingCart();
    await t.expect(await InventoryPage.getCartItemsCounter()).eql(PRODUCTS_LENGTH.toString());
    await CartPage.navigateToUserInformation();
    await CheckoutUserInformationPage.checkout(FIRST_NAME, LAST_NAME, ZIP_CODE);
    await t.expect(await ClientFunction(() => window.location.href)()).contains("checkout-step-two");

});

test('9. FInal Order Items', async t => {
    let currentCartItemsInFinalOrder = await CheckoutOverviewPage.getNumberOfCartItems();
    await t.expect(currentCartItemsInFinalOrder).eql(PRODUCTS_LENGTH);
    for (const product of PRODUCTS) {
        await t.expect(await CheckoutOverviewPage.isProductInCheckoutItemsList(product)).ok();
    }
});

test('10. Complete a purchase', async t => {
    await CheckoutOverviewPage.finish();
    await t.expect(await ClientFunction(() => window.location.href)()).contains("checkout-complete");
    await t.expect(await CheckoutConfirmationPage.isConfirmationPageLoaded()).ok();
});