import { Page, Locator, expect } from '@playwright/test';
import {BasePage} from "./basePage"
export class CheckoutPage extends BasePage

{
    readonly page: Page;
    readonly firstNameTextbox: Locator;
    readonly lastNameTextbox: Locator;
    readonly postcodeTextbox: Locator;
    readonly continueButton: Locator;
    readonly cartItemsList: Locator;
    readonly finishButton: Locator;
    readonly cartTotalSummary: Locator;
    readonly completeTitle: Locator;
    readonly completeMessage: Locator;
    readonly backHomeButton: Locator;



    constructor(page: Page) 
    {
        super(page);
        this.page = page;
        this.firstNameTextbox = page.locator('input#first-name');
        this.lastNameTextbox = page.locator('input#last-name');
        this.postcodeTextbox = page.locator('input#postal-code');
        this.continueButton = page.locator('input#continue');
        this.cartItemsList = page.locator('div.cart_list >> div.cart_item');
        this.finishButton = page.locator('button#finish');
        this.cartTotalSummary = page.locator('div.summary_total_label');
        this.completeTitle = page.locator('h2.complete-header');
        this.completeMessage = page.locator('div.complete-text');
        this.backHomeButton = page.locator('button#back-to-products');
    }

    override async goTo(): Promise<void>
    {
        await this.page.goto('/checkout-step-one.html');
    }

    async fillInformation(firstname: string, lastname: string, zip: string)
    {
        await this.firstNameTextbox.fill(firstname);
        await this.lastNameTextbox.fill(lastname);
        await this.postcodeTextbox.fill(zip);
        await this.continueButton.click();

    }

    async checkOverview()
    {
        await expect(this.cartItemsList.first().locator('div.inventory_item_name')).toContainText('Sauce Labs Backpack');
        await expect(this.cartTotalSummary).toContainText('Total: $32.39');
        await this.finishButton.click();
    }

    async checkoutCompletion()
    {
        await expect(this.completeTitle).toContainText('Thank you for your order!');
        expect(this.completeMessage).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        await this.backHomeButton.click();
        await this.page.waitForURL('/inventory.html');

    }


}