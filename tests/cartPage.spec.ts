import {Page} from "@playwright/test";
import { productLocators } from "../locators/productLocators";
import { CartPage } from "../pages/cartPage";
import { ProductPage } from "../pages/productPage";
import { LoginPage } from "../pages/loginPage";
import { BASE_URL, PASSWORD, USERNAME } from "../utils/envConfig";
import { productsToAdd } from "../test-data/product";
import { test, expect } from "@playwright/test";
import{cartPageLocators} from "../locators/cartPageLocators";

test.describe("Cart Page Tests", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });
    test("Validate cart page URL and UI page elements", async ({page}) => {
        await productPage.addFirstProductToCart();
        await productPage.navigateToCart();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
        const cartElements = await cartPage.getCartPageElements();
        expect(cartElements.cartTitle).toBeVisible();
        expect(cartElements.checkoutButton).toBeVisible();
        expect(cartElements.continueShoppingButton).toBeVisible();
    });
    test("validate continue shopping button functionality", async ({page}) => {
       await productPage.addFirstProductToCart();
        await productPage.navigateToCart();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
        await cartPage.clickOnContinueShopping();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });
    test("Validate single product details in cart", async ({page}) => {
        const firstProduct = await productPage.getFirstProductDetails();
        await productPage.addFirstProductToCart();
        await productPage.navigateToCart();
        const cartProducts = await cartPage.getCartProducts();
        expect(cartProducts[0]).toEqual(firstProduct);
    });
    test("Validate all products details in cart", async ({page}) => {
        const allProductDetails = await productPage.allproductdetails();
        await productPage.addallProductsToCart();
        await productPage.navigateToCart();
        const cartProducts = await cartPage.getCartProducts();
        expect(cartProducts).toEqual(allProductDetails);
    });
    test("Validate specific product details in cart", async ({page}) => {
        const specificProductDetails = await productPage.getSpecificProductDetails(productsToAdd);
        await productPage.addspecificProductToCart(productsToAdd);
        await productPage.navigateToCart();
        const cartProducts = await cartPage.getCartProducts();
        expect(cartProducts).toEqual(specificProductDetails);
    });
    test.only("Validate remove product from cart functionality", async ({page}) => {
        await productPage.addallProductsToCart();
        await productPage.navigateToCart();
        const cartProductsBeforeRemoval = await cartPage.getCartProducts();
        expect(cartProductsBeforeRemoval.length).toBeGreaterThan(0);
        await cartPage.removeFirstProductFromCart();
        const updatedCartProducts = await cartPage.getCartProducts();
        expect(updatedCartProducts.length).toBe(cartProductsBeforeRemoval.length - 1);
    });
});
