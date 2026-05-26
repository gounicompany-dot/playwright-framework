import {Page,expect} from '@playwright/test';
import {finalPageLocators} from '../locators/finalPageLocators';

export class FinalPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async getFinalPageElements() {
        const finalPageTitle = this.page.locator(finalPageLocators.finalPageTitle);
        const finalPageMessage = this.page.locator(finalPageLocators.finalPageMessage);
        //const finalPageImage = this.page.locator(finalPageLocators.finalPageImage);
        const finalPageButton = this.page.locator(finalPageLocators.finalPageButton);
        return {finalPageTitle, finalPageMessage, finalPageButton};
    }
    async clickOnBackHome() {
        await this.page.click(finalPageLocators.finalPageButton);
    }
    async getFinalPageMessage() {
        return await this.page.textContent(finalPageLocators.finalPageMessage);
    }
    
}