import { Page, Locator } from '@playwright/test'
import {BasePage} from "./basePage"
export class CartPage extends BasePage

{
    readonly page: Page;
    readonly checkoutButton: Locator

    constructor ( page: Page)
    {
       super(page);
       this.page = page;
       this.checkoutButton = page.locator('#checkout');
       
    }


    override async goTo(): Promise<void>
    {
        await this.page.goto('/cart.html');
    }

    async isProductInCart(productName: string) : Promise<boolean>
    {
        const cartItem : Locator = this.page.locator(`:text('${productName}')`);
        const foundItem = await cartItem.isVisible();
        return foundItem
    }

    async checkOut() : Promise<void>
    {
        await this.checkoutButton.click();
    }

}

