import {checkoutPageLocators} from "../locators/checkoutPageLocators";
import {Page} from "@playwright/test";

export class CheckoutPage {
    constructor(private page: Page) { }


    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill(checkoutPageLocators.firstNameInput, firstName);
        await this.page.fill(checkoutPageLocators.lastNameInput, lastName);
        await this.page.fill(checkoutPageLocators.postalCodeInput, postalCode);
    }
    async clickOnContinue() {
        await this.page.click(checkoutPageLocators.continueButton);
    }
    async clickOnFinish() {
        await this.page.click(checkoutPageLocators.finishButton);
    }
    async getCheckoutElements() {
        return {
            checkoutTitle: await this.page.locator(checkoutPageLocators.checkoutOverviewTitle),
            continueButton: await this.page.locator(checkoutPageLocators.continueButton),
            cancelButton: await this.page.locator(checkoutPageLocators.cancelButton)
        };
    }
    async clickOnCancel() {
        await this.page.click(checkoutPageLocators.cancelButton);
    }
    async getErrorMessage() {
        return await this.page.locator(checkoutPageLocators.errorMessage).textContent();
    }
}