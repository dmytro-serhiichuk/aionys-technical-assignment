import { test, expect } from '@playwright/test';

test('user can create, edit and delete a note', async ({ page }) => {
  const id = Date.now();
  const title = `E2E note ${id}`;
  const editedTitle = `${title} (edited)`;

  await page.goto('/');

  await page.getByRole('link', { name: 'Create' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill(title);
  await page.getByRole('textbox', { name: 'Content' }).fill('test content');
  await page.getByRole('button', { name: 'Create' }).click();

  const note = page.getByTestId('note').filter({ hasText: title });
  await expect(note).toBeVisible();
  await expect(note).toContainText('test content');

  await note.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill(editedTitle);
  await page.getByRole('textbox', { name: 'Content' }).fill('test content (new)');
  await page.getByRole('button', { name: 'Update' }).click();

  const edited = page.getByTestId('note').filter({ hasText: editedTitle });
  await expect(edited).toBeVisible();
  await expect(edited).toContainText('test content (new)');

  await edited.getByRole('button', { name: 'Remove' }).click();
  await expect(edited).toHaveCount(0);
});