import { Page } from '@playwright/test';

export abstract class BasePage
{
	readonly page: Page;

    constructor( page : Page )
	{
		this.page = page;
	}

    async goTo(path?: string): Promise<void> 
	{
		if (path) await this.page.goto(path);
		else await this.page.goto('/');
	} 

	/*async screenShot()
	{
		await this.page.screenshot();
	}*/
}