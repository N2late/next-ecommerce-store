import { expect, test } from '@playwright/test';

test('Add to cart, change quantity and remove from cart', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('[data-test-id="bookCard-1"]').click();
  await page.locator('[data-test-id="bookCard-3"]').click();
  await page.getByRole('img', { name: 'cart icon' }).click();
  await expect(page).toHaveURL('http://localhost:3000/cart');
  await page
    .locator('[data-test-id="cart-product-quantity-1"]')
    .selectOption('5');
  await page.locator('[data-test-id="cart-product-remove-3"]').click();
});
