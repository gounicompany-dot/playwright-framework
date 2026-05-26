import {LoginPage} from "../pages/loginPage";
import {ProductPage} from "../pages/productPage";
import {CartPage} from "../pages/cartPage";
import {CheckoutPage} from "../pages/checkoutPage";
import {CheckoutOverviewPage} from "../pages/checkoutOverview";
import {BASE_URL, PASSWORD, USERNAME} from "../utils/envConfig";
import {checkoutData} from "../test-data/checkout";
import {test,expect} from "@playwright/test";


test.describe("Checkout Overview Page Tests", () => {

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
        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await productPage.addFirstProductToCart();
        await productPage.navigateToCart();
        await cartPage.clickOnCheckout();
        await checkoutPage.fillCheckoutInformation(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.clickOnContinue();

    });

    test("verify checkout overview UI elements and Url", async ({page}) => {
        
        const elements = await checkoutOverviewPage.getCheckoutOverviewElements();
        await expect(elements.checkoutOverviewTitle).toBeVisible();
        await expect(elements.finishButton).toBeVisible();
        await expect(elements.cancelButton).toBeVisible();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
    });
    test("validate cancel button functionality on checkout overview page", async ({page}) => {
        await checkoutOverviewPage.clickOnCancel();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
    });
    test("Validate item total on checkout overview page", async ({page}) => {
        const overviewProducts = await checkoutOverviewPage.getOverviewProducts();
        const calculatedItemTotal = overviewProducts.reduce((total, product) => total + parseFloat(product.price.replace("$", "")), 0);
        const itemTotal = await checkoutOverviewPage.getItemTotal();
        //await expect(itemTotal).toBeCloseTo(calculatedItemTotal, 2);
        expect(itemTotal).toBe(calculatedItemTotal);
    });
    test("Validate final Total price on checkout overview page(item total + tax)", async ({page}) => {
        const itemTotal = await checkoutOverviewPage.getItemTotal();
        const tax = await checkoutOverviewPage.getTax();
        const finalTotal = await checkoutOverviewPage.getTotalPrice();
        const expectedTotalPrice = itemTotal+tax
        //await expect(totalPrice).toBeCloseTo(itemTotal + tax, 2);
        expect(expectedTotalPrice).toBe(finalTotal);
    });
});
