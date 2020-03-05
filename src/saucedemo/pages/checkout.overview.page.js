import { Selector, t } from 'testcafe';


class CartOverviewItem {

    /**
     * Defines and intializes product details.
     * 
     * @param {string} productName 
     */
    constructor(productName) {
        this.cartOverviewItemName = Selector('div.inventory_item_name').withText(productName);
        this.cartOverviewItemRoot = this.cartOverviewItemName.parent('a').parent('div.cart_item_label').parent('div.cart_item');
        this.cartOverviewItemDescription = this.cartOverviewItemRoot.child('div.cart_item_label').child('div.inventory_item_desc');
        this.cartOverviewItemPrice = this.cartOverviewItemRoot.child('div.cart_item_label').child('div.inventory_item_price');
        this.cartOverviewQuantity = this.cartOverviewItemRoot.child('div.summary_quantity');
    }
}


class CheckoutOverviewPage {
    
    /**
     * Initializes web elements.
     */
    constructor() {
        this.cancelButton = Selector('.btn_secondary.cart_cancel_link');
        this.finishButton = Selector('.btn_action.cart_button');
        this.cartList = Selector('.cart_list');
        this.cartItem = Selector('.cart_item');
        this.subTotal = Selector('.summary_subtotal_label');
        this.tax = Selector('.summary_tax_label');
        this.total = Selector('.summary_total_label');

    }

    /**
     * Returns the number of current cart items in the cart overview list.
     */
    async getNumberOfCartItems() {
        return this.cartItem.count;
    }

    /**
     * Gets the amount of subtotal.
     */
    async getSubTotal() {
        return await this.subTotal.textContent;
    }

    /**
     * Gets the amount of tax.
     */
    async getTax() {
        return await this.tax.textContent;
    }

    /**
     * Gets the amount of total.
     */
    async getTotal() {
        return await this.total.textContent;
    }

    /**
     * Returns true if the given product name is in the cart overview items list. Otherwise, false.
     * 
     * @param {string} productName 
     */
    async isProductInCheckoutItemsList(productName) {
        let product = new CartOverviewItem(productName);
        return await product.cartOverviewItemName.exists;
    }

    /**
     * Navigates to final purchase order page.
     */
    async finish() {
        await t.click(this.finishButton);
    }

}

export default new CheckoutOverviewPage();
