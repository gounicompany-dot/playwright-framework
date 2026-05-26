import {checkoutOverviewLocators} from "../locators/checkoutOverviewLocators";
import {Page} from "@playwright/test";

export class CheckoutOverviewPage { 
    constructor(private page: Page) { }

    async getCheckoutOverviewElements() {
        return {
            checkoutOverviewTitle: await this.page.locator(checkoutOverviewLocators.checkoutOverviewTitle),
            finishButton: await this.page.locator(checkoutOverviewLocators.finishButton),
            cancelButton: await this.page.locator(checkoutOverviewLocators.cancelButton)
        };
    }
    async getOverviewProducts() {
        const names = await this.page.locator(checkoutOverviewLocators.overviewItemNames).allTextContents();
        const descriptions = await this.page.locator(checkoutOverviewLocators.overviewItemDescriptions).allTextContents();
        const prices = await this.page.locator(checkoutOverviewLocators.overviewItemPrices).allTextContents();
        const overviewProducts = names.map((name, index) => ({
            name: name.trim(),
            description: descriptions[index].trim(),
            price: prices[index].trim()
        }));
        return overviewProducts;
    }
    async getItemTotal() {
        const itemTotalText = await this.page.locator(checkoutOverviewLocators.overviewItemTotalPrice).textContent();
        const itemTotalValue = itemTotalText ? itemTotalText.replace("Item total: $", "").trim() : "0";
        return parseFloat(itemTotalValue);
    }
    async getTax() {
        const taxText = await this.page.locator(checkoutOverviewLocators.overviewTax).textContent();
        const taxValue = taxText ? taxText.replace("Tax: $", "").trim() : "0";
        return parseFloat(taxValue);
    }
    async getTotalPrice() {
        const totalPriceText = await this.page.locator(checkoutOverviewLocators.overviewTotalPrice).textContent();
        const totalPriceValue = totalPriceText ? totalPriceText.replace("Total: $", "").trim() : "0";
        return parseFloat(totalPriceValue);
    }
    async clickOnFinish() {
        await this.page.click(checkoutOverviewLocators.finishButton);
    }
    async clickOnCancel() {
        await this.page.click(checkoutOverviewLocators.cancelButton);
    }


}