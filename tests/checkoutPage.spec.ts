import {checkoutData} from "../test-data/checkout";
import {CheckoutPage} from "../pages/checkoutPage";
import {LoginPage} from "../pages/loginPage";
import {ProductPage} from "../pages/productPage";
import {CartPage} from "../pages/cartPage";
import {BASE_URL, PASSWORD, USERNAME} from "../utils/envConfig";
import {test, expect} from "@playwright/test";

test.describe("Checkout Page Tests", () => {

    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await productPage.addFirstProductToCart();
        await productPage.navigateToCart();

    });
    test("Validate checkout information page UI elements", async ({page}) => {
        
        await cartPage.clickOnCheckout();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
        const checkoutElements = await checkoutPage.getCheckoutElements();
        await expect(checkoutElements.checkoutTitle).toBeVisible();
        await expect(checkoutElements.continueButton).toBeVisible();
        await expect(checkoutElements.cancelButton).toBeVisible();
    });
    test("Validate cancel button functionality on checkout information page", async ({page}) => {
        await cartPage.clickOnCheckout();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
        await checkoutPage.clickOnCancel();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    });
    test("Validate continue button functionality on checkout information page", async ({page}) => {
        await cartPage.clickOnCheckout();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
        await checkoutPage.fillCheckoutInformation(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.clickOnContinue();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
    });
    test.only("Validate error message on checkout information page when mandatory fields are empty", async ({page}) => {
        await cartPage.clickOnCheckout();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
        await checkoutPage.clickOnContinue();
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toBe("Error: First Name is required");
    });
    test("Validate finish button functionality on checkout overview page", async ({page}) => {
        await cartPage.clickOnCheckout();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
        await checkoutPage.fillCheckoutInformation(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.clickOnContinue();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
        await checkoutPage.clickOnFinish();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
    });

});