import { expect, test } from '@playwright/test';

test('Add to cart, change quantity and remove from cart', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('[data-test-id="bookCard-1"]').click();
  await page.locator('[data-test-id="bookCard-2"]').click();
  await page.locator('[data-test-id="product-1"]').click();
  await expect(page).toHaveURL('http://localhost:3000/books/1');
  await page.locator('[data-test-id="product-add-to-cart"]').click();
  await expect(page.locator('[data-test-id="cart-count"]')).toContainText('3');
  await page.locator('[data-test-id="cart-link"]').click();
  await expect(page).toHaveURL('http://localhost:3000/cart');
  await expect(
    page.locator('[data-test-id="cart-product-quantity-1"]'),
  ).toContainText('2');
  await expect(
    page.locator(
      'text=Post OfficeCharles Bukowskiremove productQuantity1€ 30.10',
    ),
  ).toHaveCount(1);
  await page.locator('[data-test-id="cart-product-remove-2"]').click();
  await expect(
    page.locator(
      'text=Post OfficeCharles Bukowskiremove productQuantity1€ 30.10',
    ),
  ).toHaveCount(0);
});
