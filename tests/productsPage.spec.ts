import {ProductPage} from "../pages/productPage";
import {test, expect} from "@playwright/test";
import {LoginPage} from "../pages/loginPage";
import {BASE_URL, USERNAME, PASSWORD} from "../utils/envConfig";
import { productLocators } from "../locators/productLocators";
import { productsToAdd } from "../test-data/product";

test.describe("Products Page Tests", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

    test("Logout from the application", async ({page}) => {
        await productPage.logout();
        await expect(page.locator(productLocators.loginButton)).toBeVisible();
    });

    test("Navigate to about page and navigate back", async ({page}) => {
        await productPage.navigateToAboutPage();
        await expect(page.locator(productLocators.requestdemoLink).nth(1)).toBeVisible();
        await page.goBack();
    });
    test("Validate product details on products page", async ({page}) => {
        await productPage.validateProductDetails();
        await productPage.addFirstProductToCart();
        await productPage.addallProductsToCart();
    });
    test("Add specific product to cart", async ({page}) => {
        
        await productPage.addspecificProductToCart(productsToAdd);
        
    });
    test("Filter products by name A to Z", async ({page}) => {
        await productPage.filterProductsByNameAtoZ();
        const productNames = await productPage.getProductNames();
        console.log("Product Names:", productNames);
        const sortedNames = [...productNames].sort();
        console.log("Sorted Names:", sortedNames);
        expect(productNames).toEqual(sortedNames);
    })
    test.only("Filter products by name Z to A", async ({page}) => {
        await productPage.filterProductsByNameZtoA();
        const productNames = await productPage.getProductNames();
        console.log("Product Names:", productNames);
        const sortedNames = [...productNames].sort().reverse();
        console.log("Sorted Names:", sortedNames);
        expect(productNames).toEqual(sortedNames);
    });
    test("Filter products by price low to high", async ({page}) => {
        await productPage.filterProductsByPriceLowToHigh();
        const productPrices = await productPage.getProductPrices();
        console.log("Product Prices:", productPrices);
        const sortedPrices = [...productPrices].sort((a, b) => a - b);
        console.log("Sorted Prices:", sortedPrices);
        expect(productPrices).toEqual(sortedPrices);
    });
    test.only("Filter products by price high to low", async ({page}) => {
        await productPage.filterProductsByPriceHighToLow();
        const productPrices = await productPage.getProductPrices();
        console.log("Product Prices:", productPrices);
        const sortedPrices = [...productPrices].sort((a, b) => b - a);
        console.log("Sorted Prices:", sortedPrices);
        expect(productPrices).toEqual(sortedPrices);
    });
    
});