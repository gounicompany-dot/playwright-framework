import {Page} from '@playwright/test';
import {FinalPage} from '../pages/finalPage';
import {LoginPage} from '../pages/loginPage';
import {ProductPage} from '../pages/productPage';
import {CartPage} from '../pages/cartPage';
import {CheckoutPage} from '../pages/checkoutPage';
import {CheckoutOverviewPage} from '../pages/checkoutOverview';
import {BASE_URL, PASSWORD, USERNAME} from '../utils/envConfig';
import {checkoutData} from '../test-data/checkout';
import {test,expect} from "@playwright/test";

test.describe("Final Page Tests", () => {

    let finalPage: FinalPage;
    let checkoutOverviewPage: CheckoutOverviewPage;
    let checkoutPage: CheckoutPage;
    let cartPage: CartPage;
    let productPage: ProductPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutOverviewPage = new CheckoutOverviewPage(page);
        finalPage = new FinalPage(page);
        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await productPage.addFirstProductToCart();
        await productPage.navigateToCart();
        await cartPage.clickOnCheckout();
        await checkoutPage.fillCheckoutInformation(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.clickOnContinue();
        await checkoutOverviewPage.clickOnFinish();
    });

    test("verify final page UI elements and Url", async ({page}) => {
        const elements = await finalPage.getFinalPageElements();
        await expect(elements.finalPageTitle).toBeVisible();
        await expect(elements.finalPageMessage).toBeVisible();
        await expect(elements.finalPageButton).toBeVisible();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
    });
    test("validate final page message", async ({page}) => {
        const finalPageMessage = await finalPage.getFinalPageMessage();
        expect(finalPageMessage).toBe("Thank you for your order!");
    });
    test("validate back home button functionality on final page", async ({page}) => {
        await finalPage.clickOnBackHome();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

});
