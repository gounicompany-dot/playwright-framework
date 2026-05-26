import { Page } from "@playwright/test";
import { productLocators } from "../locators/productLocators";


export class ProductPage {
    constructor(private page: Page) { }

    async logout() {
        await this.page.click(productLocators.menu);
        await this.page.click(productLocators.logoutLink);
    }
    async navigateToAboutPage() {
        await this.page.click(productLocators.menu);
        await this.page.click(productLocators.aboutLink);
    }
    async validateProductDetails() {


        const names = await this.page.locator(productLocators.productName).allTextContents();
        const descriptions = await this.page.locator(productLocators.productDescription).allTextContents();
        const prices = await this.page.locator(productLocators.productPrice).allTextContents();
        const buttonCount = await this.page.locator(productLocators.addToCartButton).count();
        if (names.length === 0) {
            throw new Error("No products found");
        }
        if (names.length !== descriptions.length || names.length !== prices.length || names.length !== buttonCount) {
            throw new Error("Mismatch in product details count");
        }
    }
    async addFirstProductToCart() {
        await this.page.locator(productLocators.addToCartButton).first().click();
    }
    async addallProductsToCart() {
        const addToCartButtons = this.page.locator(productLocators.addToCartButton);
        const count = await addToCartButtons.count();
        for (let i = 0; i < count; i++) {
            await addToCartButtons.nth(i).click();
            await this.page.waitForTimeout(2000); // Adding a delay to ensure the cart is updated before the next click
        }
    }
    async addspecificProductToCart(productName: string[]) {
        const addProducts=this.page.locator(productLocators.productName);
        const count=await addProducts.count();
        for(let i=0;i<count;i++){
            const name=await addProducts.nth(i).textContent();
            if(name && productName.includes(name.trim())){
                await this.page.locator(productLocators.addToCartButton).nth(i).click();
                await this.page.waitForTimeout(2000);
            }
        }
    }
    async filterProductsByNameAtoZ() {
        await this.page.selectOption(productLocators.filterDropdown, "az");
        
    }
    async filterProductsByNameZtoA() {
        await this.page.selectOption(productLocators.filterDropdown, "za");
    }
    async filterProductsByPriceLowToHigh() {
        await this.page.selectOption(productLocators.filterDropdown, "lohi");
    }
    async filterProductsByPriceHighToLow() {
        await this.page.selectOption(productLocators.filterDropdown, "hilo");
    }
    async getProductNames(): Promise<string[]> {
        return await this.page.locator(productLocators.productName).allTextContents();
    }
    async getProductPrices(): Promise<number[]> {
        const prices = await this.page.locator(productLocators.productPrice).allTextContents();
        return prices.map(price => parseFloat(price.replace("$", "").trim()));
    }
    async navigateToCart() {
        await this.page.click(productLocators.cartlink);
    }
    async getFirstProductDetails() {
        const name = await this.page.locator(productLocators.productName).first().textContent();
        
        const description = await this.page.locator(productLocators.productDescription).first().textContent();
       
        const price = await this.page.locator(productLocators.productPrice).first().textContent();
        return{
            name:name?.trim(),
            description:description?.trim(),
            price:price?.trim()
        }
    }
    async allproductdetails() {
        const names = await this.page.locator(productLocators.productName).allTextContents();
        const descriptions = await this.page.locator(productLocators.productDescription).allTextContents();
        const prices = await this.page.locator(productLocators.productPrice).allTextContents();
        const productDetails = names.map((_, index) => ({
            name: names[index],
            description: descriptions[index],
            price: prices[index]
        }));
        // for (let i = 0; i < names.length; i++) {
        //     productDetails.push({
        //         name: names[i],
        //         description: descriptions[i],
        //         price: prices[i]
        //     });
        // }
        return productDetails;
    }
    async getSpecificProductDetails(productName: string[]) {
        const names = await this.page.locator(productLocators.productName).allTextContents();
        const descriptions = await this.page.locator(productLocators.productDescription).allTextContents();
        const prices = await this.page.locator(productLocators.productPrice).allTextContents();

        // for (let i = 0; i < names.length; i++) {
        //     if (names[i] === productName) {
        //         return {
        //             name: names[i],
        //             description: descriptions[i],
        //             price: prices[i]
        //         };
        //     }
        // }

        // return null;
        const productDetails = names.map((_, index) => ({
            name: names[index].trim(),
            description: descriptions[index].trim(),
            price: prices[index].trim()
        }));
        return productDetails.filter(product => productName.includes(product.name));;
    }
}