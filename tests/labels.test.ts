import { test, expect } from '@playwright/test';
import { FoldersLabelsPage } from '../pages';

test.describe('CreateLabel', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://account.proton.me/u/0/mail/folders-labels');
    let folderPage = new FoldersLabelsPage(page);
    await folderPage.deleteAllLabels();
  });

  test('should add new label and clear popup', async ({ page }) => {
    let folderPage = new FoldersLabelsPage(page);
    await folderPage.addLabel('Home');
    const labelList = await folderPage.getLabelWithColorList();
    expect(labelList).toEqual([[ 'Home', expect.stringMatching(/rgb\((.*)\)/) ]]);
    await folderPage.addLabelButton.click();
    await expect(folderPage.labelNameInput).toBeEmpty();
  });

  test('should add new label with selected color', async ({ page }) => {
    let folderPage = new FoldersLabelsPage(page);
    await folderPage.addLabel('Work', 'rgb(196, 72, 0)');
    const labelList = await folderPage.getLabelWithColorList();
    expect(labelList).toEqual([[ 'Work', 'rgb(196, 72, 0)' ]]);
  });

  // should trim entered text
  // should hide other controls if popup opened  
  // should add duplicated color
  // should add max three labels
  // should not add duplicated label
  // should not add long name label 
  // should not add empty label 
  // should not add after canceling
  // should not add after escaping
  // should not add if request blocked
});

test.describe('EditLabel', () => {
  // should not clear popup input after saving
  // should edit label with new name
  // should edit label with duplicated color
  // should trim entered text
  // should hide other controls if popup opened  
  // should not edit label with duplicated name
  // should not edit label with long name
  // should not edit label with empty name
  // should not edit after canceling
  // should not edit after escaping
  // should not edit if request blocked
});

test.describe('DeleteLabel', () => {
  // should delete all labels
  // should hide other controls if popup opened  
  // should not edit after canceling
  // should not edit after escaping
  // should not delete if request blocked
});

test.describe('MoveLabel', () => {
  // should move top to bottom
  // should move bottom to top
  // should move top to center
  // should move bottom to center
  // should not move if request blocked
});

test.describe('SortLabel', () => {
  // should sort labels
  // should sort after double click
  // should sort after move
  // should not sort if request blocked
});
