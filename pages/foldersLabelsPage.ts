import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class FoldersLabelsPage extends BasePage {

    addLabelButton = this.page.getByRole('button', { name: 'Add label' });

    // List

    labelList = this.page.locator('[data-test-id="folders\/labels\:item-type\:label"]');

    labelName = this.labelList.locator('[data-test-id="folders\/labels\:item-name"]');

    labelColor = this.labelList.locator('css=svg[role][style]');

    labelArrowIcon = this.page.locator('[data-test-id="dropdown\:open"]').first();

    labelDeleteButton = this.page.locator('[data-test-id="folders\/labels\:item-delete"]').first();

    // Create 

    labelNameInput = this.page.getByPlaceholder('Label name');

    colorInput = this.createModal.getByTestId('dropdown-button');

    saveButton = this.createModal.locator('role=button[name="Save"]');

    // Delete

    deleteButton = this.deleteModal.locator('role=button[name="Delete"]');

    async addLabel(name: string, color?: string): Promise<void> {
        await this.addLabelButton.click();
        await this.labelNameInput.fill(name);
        if (color) {
            await this.colorInput.click();
            await this.page.locator(`xpath=//label[contains(@style,"${color}")]`).click();
        }
        await this.saveButton.click();
        await this.successAlert.locator(`text=${name} created`).waitFor();
    }

    async getLabelWithColorList() {
        if (await this.locatorExists(this.labelList.first())) {
            let list: string[][] = [];
            for (let i = 0; i < await this.labelList.count(); i += 1) {
                list.push(
                    [
                        await this.labelName.nth(i).innerText(),
                        //@ts-ignore
                        (await this.labelColor.nth(i).getAttribute('style')).match(/rgb\((.*)\)/)[0]
                    ]
                )
            }
            return list;
        } else {
            return false;
        }
    }

    async deleteAllLabels(): Promise<void> {
        await this.addLabelButton.waitFor();
        let labelList = await this.getLabelWithColorList();
        while (labelList && labelList.length) {
            await this.labelArrowIcon.click();
            await this.labelDeleteButton.click();
            await this.deleteButton.click();
            await this.deleteModal.waitFor({ state: 'hidden' });
            await this.successAlert.locator(`text=${labelList[0][0]} removed`).waitFor();
            labelList = await this.getLabelWithColorList();
        }
    }
}