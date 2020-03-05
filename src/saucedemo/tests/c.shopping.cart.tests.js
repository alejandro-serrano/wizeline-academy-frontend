import { ClientFunction } from 'testcafe';
import LoginPage from '../pages/login.page.js';
import InventoryPage from '../pages/inventory.page.js';
import CartPage from '../pages/cart.page.js';

const USERNAME = "standard_user";
const PASSWORD = "secret_sauce";


fixture('Shopping Cart Tests').page('https://www.saucedemo.com/').beforeEach(async t => {
    await LoginPage.login(USERNAME, PASSWORD);
    await t.expect(await ClientFunction(() => window.location.href)()).contains("inventory");
});

test('4. Navigate to the shopping cart', async t => {
    await InventoryPage.navigateToShoppingCart();
    await t.expect(await ClientFunction(() => window.location.href)()).contains("cart");
});

test('5. Add a single item to the shoping cart', async t => {
    let product = 'Sauce Labs Backpack'
    await InventoryPage.addToShoppingCart(product);
    await InventoryPage.navigateToShoppingCart();
    await t.expect(await CartPage.isProductInCartItemsList(product)).ok();
    await t.expect(await InventoryPage.getCartItemsCounter()).eql('1');
});

test('6. Add multiple items to the shoping cart', async t => {
    let products = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',  
        'Sauce Labs Fleece Jacket'
    ]

    for (const product of products) {
        await InventoryPage.addToShoppingCart(product);
    }

    await InventoryPage.navigateToShoppingCart();

    for (const product of products) {
        await t.expect(await CartPage.isProductInCartItemsList(product)).ok();
    }

    let productsLength = await products.length.toString();
    await t.expect(await InventoryPage.getCartItemsCounter()).eql(productsLength);
});
