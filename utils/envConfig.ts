//export const BASE_URL = "https://www.saucedemo.com/";
const ENV_URL={
    "dev":"https://www.saucedemo.com/",
    "qa":"https://www.saucedemo.com/",
    "staging":"https://www.saucedemo.com/",
    "prod":"https://www.saucedemo.com/"

}
const ENV=process.env.ENV || "prod"; //if not passing any environment variable, it will default to "prod"
export const BASE_URL=(ENV_URL as any)[ENV];
//how to assign $env:ENV="dev" npx playwright test tests/checkoutOverview.spec.ts
export const USERNAME = "standard_user";
export const PASSWORD = "secret_sauce";
