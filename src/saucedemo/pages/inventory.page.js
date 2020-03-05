import { Selector, t } from 'testcafe';

const INVENTORY_MENU_ITEM = Selector('.bm-item.menu-item')

const INVENTORY_MENU_ITEM_ITEMS = Object.freeze({
    ALL_ITEMS: 'All Items',
    ABOUT: 'About',
    LOGOUT: 'Logout',
    RESET_APP_STATE: 'Reset App State'
});

const AVAILABLE_PRODUCTS = Object.freeze({
    BACKPACK: 'Sauce Labs Backpack',
    BIKE_LIGHT: 'Sauce Labs Bike Light',
    BOLT_T_SHIRT: 'Sauce Labs Bolt T-Shirt',  
    FLEECE_JACKET: 'Sauce Labs Fleece Jacket', 
    ONESIE: 'Sauce Labs Onesie',
    TEST_T_SHIRT: 'Test.allTheThings() T-Shirt (Red)'
})

class InventoryMenu {

    /**
     * Define and initialize inventory menu item.
     * 
     * @param {string} menuItemText 
     */
    constructor(menuItemText) {
        this.menuItem = INVENTORY_MENU_ITEM.withExactText(menuItemText);
    }
}

class InventoryItem {

    /**
     * Define and intialize product details.
     * 
     * @param {string} productName 
     */
    constructor(productName) {
        this.inventoryItemName = Selector('div.inventory_item_name').withExactText(productName);
        this.inventoryItemRoot = this.inventoryItemName.parent('a').parent('div.inventory_item_label').parent('div.inventory_item');
        this.inventoryItemDescription = this.inventoryItemRoot.child('div.inventory_item_label').child('div.inventory_item_desc');
        this.inventoryItemPrice = this.inventoryItemRoot.child('div.pricebar').child('div.inventory_item_price');
        this.inventoryItemAddToCartButton = this.inventoryItemRoot.child('div.pricebar').child('button.btn_primary.btn_inventory');
    }
}


class InventoryPage {
    
    /**
     * Initialize web elements.
     */
    constructor() {
        this.productsLabel = Selector('div#inventory_filter_container > .product_label');
        this.inventorySideBarButton = Selector('.bm-burger-button > button');
        this.shoppingCart = Selector('.shopping_cart_link');
        this.cartCounter = Selector('span.fa-layers-counter.shopping_cart_badge');

        this.inventoryMenuOptions = [
            {text: INVENTORY_MENU_ITEM_ITEMS.ALL_ITEMS.toString(), item: new InventoryMenu(INVENTORY_MENU_ITEM_ITEMS.ALL_ITEMS.toString())},
            {text: INVENTORY_MENU_ITEM_ITEMS.ABOUT.toString(), item: new InventoryMenu(INVENTORY_MENU_ITEM_ITEMS.ABOUT.toString())},
            {text: INVENTORY_MENU_ITEM_ITEMS.LOGOUT.toString(), item: new InventoryMenu(INVENTORY_MENU_ITEM_ITEMS.LOGOUT.toString())},
            {text: INVENTORY_MENU_ITEM_ITEMS.RESET_APP_STATE.toString(), item: new InventoryMenu(INVENTORY_MENU_ITEM_ITEMS.RESET_APP_STATE.toString())}
        ]

        this.availableProducts = [
            {name: AVAILABLE_PRODUCTS.BACKPACK.toString(), product: new InventoryItem(AVAILABLE_PRODUCTS.BACKPACK.toString())},
            {name: AVAILABLE_PRODUCTS.BIKE_LIGHT.toString(), product: new InventoryItem(AVAILABLE_PRODUCTS.BIKE_LIGHT.toString())},
            {name: AVAILABLE_PRODUCTS.BOLT_T_SHIRT.toString(), product: new InventoryItem(AVAILABLE_PRODUCTS.BOLT_T_SHIRT.toString())},
            {name: AVAILABLE_PRODUCTS.FLEECE_JACKET.toString(), product: new InventoryItem(AVAILABLE_PRODUCTS.FLEECE_JACKET.toString())},
            {name: AVAILABLE_PRODUCTS.ONESIE.toString(), product: new InventoryItem(AVAILABLE_PRODUCTS.ONESIE.toString())},
            {name: AVAILABLE_PRODUCTS.TEST_T_SHIRT.toString(), product: new InventoryItem(AVAILABLE_PRODUCTS.TEST_T_SHIRT.toString())}
        ];
    }

    /**
     * Returns true if the products label exists. Otherwise, false.
     */
    async isProductsLabelLoaded() {
        return await this.productsLabel.exists;
    }

    /**
     * Selects the given menu item from the inventory side bar.
     * 
     * @param {string} menuItem 
     */
    async selectInventoryMenuItem(menuItem) {
        let inventoryMenuItem = this.inventoryMenuOptions.find(item => item.text == menuItem);
        await t.click(this.inventorySideBarButton);
        await t.click(inventoryMenuItem.item.menuItem);
    }

    /**
     * Navigates to shopping cart page.
     */
    async navigateToShoppingCart() {
        await t.click(this.shoppingCart);
    }

    /**
     * Adds the given product name to the shopping cart.
     * 
     * @param {string} productName 
     */
    async addToShoppingCart(productName) {
        let inventoryProduct = this.availableProducts.find(item => item.name == productName);
        await t.click(inventoryProduct.product.inventoryItemAddToCartButton)
    }

    /**
     * Gets the number of items in the current cart.
     */
    async getCartItemsCounter() {
        return await this.cartCounter.textContent;
    }
}

export default new InventoryPage();
