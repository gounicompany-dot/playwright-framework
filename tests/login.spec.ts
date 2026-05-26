import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import {BASE_URL, USERNAME, PASSWORD} from '../utils/envConfig';


test("Login to saucedemo application with valid credentials", async ({page}) => {
    const loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    // await page.goto("https://www.saucedemo.com/");
    // await page.fill("#user-name", "standard_user");
    // await page.fill("#password", "secret_sauce");
    // await page.click("#login-button");
    // await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});