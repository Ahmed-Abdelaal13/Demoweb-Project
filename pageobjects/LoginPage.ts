import {Page, Locator} from '@playwright/test';
import {BasePage} from "./basePage"
export class LoginPage extends BasePage

{
    readonly page: Page;
    readonly logInbutton: Locator;
    readonly userName: Locator;
    readonly passWord: Locator;


    constructor (page: Page)
    {
        super(page);
        this.page = page;
        this.userName = page.locator("#user-name");
        this.passWord = page.locator("#password");
        this.logInbutton = page.locator("#login-button");
    }

    override async goTo(): Promise<void>
    {
        await this.page.goto('/');
    }

    async login(username: string, password: string)
    {
        await this.userName.type(username);
        await this.passWord.type(password);
        await this.logInbutton.click();
    }

    async getErrorMessage()
    {
        const error = this.page.locator('*[data-test=error]');
        return error.innerText();
    }

}
