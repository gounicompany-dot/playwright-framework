import {Page} from "@playwright/test";
import { productLocators } from "../locators/productLocators";
import {cartPageLocators} from "../locators/cartPageLocators";

export class CartPage {
    constructor(private page: Page) { }

    async clickOnContinueShopping() {
        await this.page.click(cartPageLocators.continueShoppingButton);
    }
    async getCartPageElements() {
        return {
            //cartIcon: await this.page.locator(cartPageLocators.cartIcon),
            //cartItemNames: await this.page.locator(cartPageLocators.cartItemNames),
            checkoutButton: await this.page.locator(cartPageLocators.checkoutButton),
            cartTitle: await this.page.locator(cartPageLocators.cartTitle),
            //cartItemDescription: await this.page.locator(cartPageLocators.cartItemDescription),
            //cartItemPrice: await this.page.locator(cartPageLocators.cartItemPrice),
            //cartItemQuantity: await this.page.locator(cartPageLocators.cartItemQuantity),
            //cartItemRemoveButton: await this.page.locator(cartPageLocators.cartItemRemoveButton),
            //cartItem: await this.page.locator(cartPageLocators.cartItem),
            continueShoppingButton: await this.page.locator(cartPageLocators.continueShoppingButton),
        };
    }
    async getCartProducts() {
        const names = await this.page.locator(cartPageLocators.cartItemNames).allTextContents();
        const descriptions = await this.page.locator(cartPageLocators.cartItemDescription).allTextContents();
        const prices = await this.page.locator(cartPageLocators.cartItemPrice).allTextContents();
        //const quantities = await this.page.locator(cartPageLocators.cartItemQuantity).allTextContents();
        const allCartProducts = names.map((name, index) => ({
            name: name.trim(),
            description: descriptions[index].trim(),
            price: prices[index].trim()
        }));
        return allCartProducts;
    }
    async removeFirstProductFromCart() {
        await this.page.locator(cartPageLocators.cartItemRemoveButton).first().click();
    }
    async clickOnCheckout() {
        await this.page.click(cartPageLocators.checkoutButton);
    }
}