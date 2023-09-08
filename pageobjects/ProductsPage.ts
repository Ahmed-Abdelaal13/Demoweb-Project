import { Page} from '@playwright/test';
import {BasePage} from "./basePage"
export class ProductsPage extends BasePage

{
    readonly page: Page;

    constructor (page: Page)
    {
        super(page);
        this.page = page;
    }

    override async goTo(): Promise<void>
    {
        await this.page.goto('/inventory.html');
    }

    async areProductsVisible()
    {
        const products= this.page.locator('.inventory_list');
        await products.isVisible();
    }

    async addProductToCart(productName: string)
    {
        const id = `#add-to-cart-${productName.toLowerCase().split(" ").join("-")}`
        console.log(id);
        const product = this.page.locator(id);
        await product.click();

    }

}

