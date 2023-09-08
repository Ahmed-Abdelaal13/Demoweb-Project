import { expect, test } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { ProductsPage } from '../pageobjects/ProductsPage';
import { CartPage } from '../pageobjects/CartPage'
import { CheckoutPage } from '../pageobjects/CheckoutPage';

// Testfall 1
test('test login with right credentials', async ({page}) =>
{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPageTitle = await page.title();
    console.log('Testfall 1:', inventoryPageTitle === 'Swag Labs');

});

//Testfall 2
test('test login with false credentials', async ({page}) =>
{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login('locked_out_user', 'secret_sauce');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toEqual('Epic sadface: Sorry, this user has been locked out.');

});

//Testfall 3
test('products are visible',async ({page}) => 
{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForLoadState('domcontentloaded');
    const productsPage = new ProductsPage(page)
    await productsPage.goTo();
    await productsPage.areProductsVisible();

});

//Testfall 4
test('add to cart', async ({page}) => 
{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForLoadState('domcontentloaded');
    const productsPage = new ProductsPage(page)
    await productsPage.goTo();
    await productsPage.areProductsVisible();
    await productsPage.addProductToCart('Sauce Labs Backpack');

});

//TESTfall 5
test('is product added to cart', async ({page}) =>
{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForLoadState('domcontentloaded');
    const productsPage = new ProductsPage(page)
    await productsPage.goTo();
    await productsPage.areProductsVisible();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    const cartpage = new CartPage(page);
    await cartpage.goTo();
    const productFound = await cartpage.isProductInCart('Sauce Labs Backpack')
    expect(productFound).toBeTruthy();
    await cartpage.checkOut();

});

//Testfall 6
test('checkout: your information', async ({page}) =>
{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForLoadState('domcontentloaded');
    const productsPage = new ProductsPage(page)
    await productsPage.goTo();
    await productsPage.areProductsVisible();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    const cartpage = new CartPage(page);
    await cartpage.goTo();
    const productFound = await cartpage.isProductInCart('Sauce Labs Backpack')
    expect(productFound).toBeTruthy();
    await cartpage.checkOut();
    const checkout = new CheckoutPage(page);
    await checkout.fillInformation('Sauce','Lap','1234');

});

//Testfall 7
test('checkout: overview', async ({page}) =>
{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForLoadState('domcontentloaded');
    const productsPage = new ProductsPage(page)
    await productsPage.goTo();
    await productsPage.areProductsVisible();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    const cartpage = new CartPage(page);
    await cartpage.goTo();
    const productFound = await cartpage.isProductInCart('Sauce Labs Backpack')
    expect(productFound).toBeTruthy();
    await cartpage.checkOut();
    const checkout = new CheckoutPage(page);
    await checkout.fillInformation('Sauce','Lap','1234');
    await checkout.checkOverview();

});

//Testfall 8
test('checkout: complete', async ({page}) =>
{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForLoadState('domcontentloaded');
    const productsPage = new ProductsPage(page)
    await productsPage.goTo();
    await productsPage.areProductsVisible();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    const cartpage = new CartPage(page);
    await cartpage.goTo();
    const productFound = await cartpage.isProductInCart('Sauce Labs Backpack')
    expect(productFound).toBeTruthy();
    await cartpage.checkOut();
    const checkout = new CheckoutPage(page);
    await checkout.fillInformation('Sauce','Lap','1234');
    await checkout.checkOverview();
    await checkout.checkoutCompletion();

});
