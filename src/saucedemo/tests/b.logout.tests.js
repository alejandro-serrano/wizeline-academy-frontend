import { ClientFunction } from 'testcafe';
import LoginPage from '../pages/login.page.js';
import InventoryPage from '../pages/inventory.page.js';

const USERNAME = "standard_user";
const PASSWORD = "secret_sauce";
const INVALID_USERNAME = "locked_out_user"

fixture('Logout Tests').page('https://www.saucedemo.com/').beforeEach(async t => {
    await LoginPage.login(USERNAME, PASSWORD);
    await t.expect(await ClientFunction(() => window.location.href)()).contains("inventory");
});

test('3. Logout from product page', async t => {
    await InventoryPage.selectInventoryMenuItem('Logout');
    await t.expect(await ClientFunction(() => window.location.href)()).contains("index");
});
