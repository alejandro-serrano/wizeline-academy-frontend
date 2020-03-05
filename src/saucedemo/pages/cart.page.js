import { Selector, t } from 'testcafe';


class CartItem {

    /**
     * Defines and intializes product details.
     * 
     * @param {string} productName 
     */
    constructor(productName) {
        this.cartItemName = Selector('div.inventory_item_name').withText(productName);
        this.cartItemRoot = this.cartItemName.parent('a').parent('div.cart_item_label').parent('div.cart_item');
        this.cartItemDescription = this.cartItemRoot.child('div.cart_item_label').child('div.inventory_item_desc');
        this.cartItemPrice = this.cartItemRoot.child('div.item_pricebar').child('div.inventory_item_price');
        this.cartItemRemoveButton = this.cartItemRoot.child('div.item_pricebar').child('button.btn_secondary.cart_button');
        this.cartQuantity = this.cartItemRoot.child('div.cart_quantity');
    }
}


class CartPage {
    
    /**
     * Initializes web elements.
     */
    constructor() {
        this.continueShoppingButton = Selector('.btn_secondary').withText('Continue Shopping');
        this.checkoutButton = Selector('.checkout_button').withText('CHECKOUT');
        this.cartList = Selector('.cart_list');
        this.cartItem = Selector('.cart_item');
    }

    /**
     * Returns the number of current cart items in the cart list.
     */
    async getNumberOfCartItems() {
        return this.cartItem.count;
    }

    /**
     * Returns true if the given product name is in the cart items list. Otherwise, false.
     * 
     * @param {string} productName 
     */
    async isProductInCartItemsList(productName) {
        let product = new CartItem(productName);
        return await product.cartItemName.exists;
    }

    /**
     * Navigates to user information checkout page.
     */
    async navigateToUserInformation() {
        await t.click(this.checkoutButton);
    }

}

export default new CartPage();
