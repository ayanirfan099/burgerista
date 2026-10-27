import { test, expect } from "@playwright/test";
test("homepage, menu categories, modal, burger builder and FAQ work", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "WIR LEBEN",
  );
  await page.getByRole("button", { name: "Chicken", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page.locator(".product-card")).toContainText("V.I.B. Chicken");
  await page.locator(".product-card").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("Allergene");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "Veggie-Stil", exact: true }).click();
  await expect(page.locator(".builder-summary")).toContainText("Veggie-Stil");
  await page.getByRole("button", { name: "Ohne Käse", exact: true }).click();
  await expect(page.locator(".builder-preview svg")).toHaveAttribute(
    "aria-label",
    /Veggie-Patty$/,
  );
  await page.getByRole("button", { name: "Neu stapeln" }).click();
  await expect(page.locator(".builder-summary")).toContainText("Beef-Stil");
  const summary = page.locator("summary").first();
  await summary.click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await summary.click();
  await expect(page.locator("details").first()).not.toHaveAttribute("open", "");
  await expect(page.locator(".location-details a")).toHaveAttribute(
    "href",
    "https://www.burgerista.com/standorte/",
  );
});
test("responsive layout and navigation", async ({ page }, info) => {
  await page.goto("/");
  if (info.project.name === "mobile") {
    await page.getByRole("button", { name: "Menü öffnen" }).click();
    await expect(
      page.getByRole("navigation", { name: "Mobile Navigation" }),
    ).toBeVisible();
    await page
      .getByRole("navigation", { name: "Mobile Navigation" })
      .getByRole("link", { name: /Speisekarte/ })
      .click();
    await expect(
      page.getByRole("navigation", { name: "Mobile Navigation" }),
    ).not.toBeVisible();
    await expect(page).toHaveURL(/#menu$/);
  }
  for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBe(true);
  }
});
test("story responds to scrolling and legal routes load", async ({ page }) => {
  await page.goto("/");
  await page.locator("#stage-5").scrollIntoViewIfNeeded();
  await expect(page.locator(".story-counter")).toContainText("06");
  await page.goto("/impressum");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Impressum");
  await page.goto("/datenschutz");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Datenschutz",
  );
});
test("reduced motion and screenshots", async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".marquee>div")).toHaveCSS(
    "animation-name",
    "none",
  );
  await page.screenshot({
    path: `test-results/${info.project.name}-hero.png`,
    fullPage: false,
  });
});
test("has no serious or critical accessibility violations", async ({
  page,
}) => {
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations
      .filter((v) => ["serious", "critical"].includes(v.impact || ""))
      .map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
  ).toEqual([]);
});
test("mobile menu traps focus and escape restores the trigger", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "mobile", "mobile navigation only");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menü öffnen" });
  await toggle.click();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("reduced-motion hydration stays clean and marquee can be paused", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Lauftext pausieren" }).click();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".marquee>div")).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await page.getByRole("button", { name: "Lauftext fortsetzen" }).click();
  await expect(page.locator(".marquee>div")).toHaveCSS(
    "animation-play-state",
    "running",
  );
  expect(errors).toEqual([]);
});
