#!/usr/bin/env node
import puppeteer from "puppeteer";
import { ensureServer } from "./utils/dev-server.mjs";

const baseUrlInput = process.env.CONTACT_E2E_BASE_URL || "http://localhost:3000";

if (process.env.CONTACT_E2E_KEEP_TURNSTILE !== '1') {
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = '';
  process.env.TURNSTILE_SECRET_KEY = '';
  process.env.TURNSTILE_BYPASS = 'true';
}

async function installFetchDelay(page) {
  await page.evaluateOnNewDocument(() => {
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (...args) => {
      const input = args[0];
      const url = typeof input === "string" ? input : input?.url ?? "";
      if (typeof url === "string" && url.includes("/api/contact")) {
        await new Promise((resolve) => setTimeout(resolve, 350));
      }
      return originalFetch(...args);
    };
  });
}

async function assertVisible(page, selector, label) {
  await page.waitForSelector(selector, { timeout: 8000 });
  const element = await page.$(selector);
  if (!element) {
    throw new Error(`Missing expected element: ${label}`);
  }
}

async function fillContactForm(page, {
  name,
  email,
  message,
  withPhone,
  withShops,
}) {
  await page.type('[data-testid="input-contact-name"]', name);
  await page.type('[data-testid="input-contact-email"]', email);

  if (withPhone) {
    await page.type('[data-testid="input-contact-phone"]', "+48123456789");
  }

  if (withShops) {
    await page.click('[data-testid="select-contact-shops"]');
    await page.waitForSelector('[role="option"]', { timeout: 5000 });
    await page.evaluate(() => {
      const firstOption = document.querySelector('[role="option"]');
      if (!(firstOption instanceof HTMLElement)) {
        throw new Error('Shops option is not available');
      }
      firstOption.click();
    });
  }

  await page.type('[data-testid="input-contact-message"]', message);

  const consentState = await page.$eval(
    '[data-testid="checkbox-consent"]',
    (node) => node.getAttribute('data-state')
  );

  if (consentState !== 'checked') {
    await page.click('[data-testid="checkbox-consent"]');
    await page.waitForFunction(
      () =>
        document
          .querySelector('[data-testid="checkbox-consent"]')
          ?.getAttribute('data-state') === 'checked',
      { timeout: 5000 }
    );
  }
}

async function submitAndAssertLoading(page) {
  await page.click('[data-testid="button-submit-contact"]');

  try {
    await page.waitForFunction(
      () => {
        const btn = document.querySelector('[data-testid="button-submit-contact"]');
        return Boolean(btn && btn.hasAttribute('disabled'));
      },
      { timeout: 6000 }
    );
  } catch {
    const errors = await page.$$eval('[data-testid^="error-"]', (nodes) =>
      nodes
        .map((node) => node.textContent?.trim())
        .filter((value) => typeof value === 'string' && value.length > 0)
    );

    throw new Error(`Submit did not enter loading state. Current errors: ${errors.join(' | ') || 'none'}`);
  }
}

async function assertToastContains(page, text) {
  await page.waitForFunction(
    (value) => document.body.innerText.includes(value),
    { timeout: 8000 },
    text
  );
}

async function runLandingFlow(page, baseUrl) {
  await page.goto(new URL('/#contact', baseUrl).toString(), { waitUntil: 'networkidle2' });
  await assertVisible(page, '[data-testid="input-contact-name"]', 'landing form name input');

  // Validation state
  await page.click('[data-testid="button-submit-contact"]');
  await assertVisible(page, '[data-testid="error-name"]', 'landing validation error name');
  await assertVisible(page, '[data-testid="error-shops"]', 'landing validation error shops');

  await fillContactForm(page, {
    name: 'Jan Kowalski',
    email: 'jan.kowalski@example.com',
    message: 'Chcę porozmawiać o wdrożeniu i konfiguracji dla mojego zespołu.',
    withPhone: false,
    withShops: true,
  });

  await submitAndAssertLoading(page);
  await assertToastContains(page, 'Dziękujemy za wiadomość!');

  console.log('✓ landing contact form: validation + loading + success toast');
}

async function runContactPageFlow(page, baseUrl) {
  await page.goto(new URL('/kontakt', baseUrl).toString(), { waitUntil: 'networkidle2' });
  await assertVisible(page, '[data-testid="input-contact-name"]', 'kontakt form name input');

  // Validation state
  await page.click('[data-testid="button-submit-contact"]');
  await assertVisible(page, '[data-testid="error-name"]', 'kontakt validation error name');

  await fillContactForm(page, {
    name: 'Kontakt Test Success',
    email: 'kontakt.success@example.com',
    message: 'To jest poprawna wiadomość testowa dla sprawdzenia sukcesu formularza.',
    withPhone: true,
    withShops: false,
  });

  await submitAndAssertLoading(page);
  await assertToastContains(page, 'Sukces!');

  await page.setOfflineMode(true);

  await fillContactForm(page, {
    name: 'Kontakt Test Error',
    email: 'kontakt.error@example.com',
    message: 'To jest poprawna wiadomość testowa dla sprawdzenia błędu sieciowego.',
    withPhone: true,
    withShops: false,
  });

  await submitAndAssertLoading(page);
  await assertToastContains(page, 'Wystąpił błąd podczas wysyłania wiadomości');
  await page.setOfflineMode(false);

  console.log('✓ /kontakt form: validation + loading + success/error toasts');
}

async function run() {
  const { stop, baseUrl } = await ensureServer(baseUrlInput, {
    autoStartEnvVar: 'CONTACT_E2E_AUTO_START',
  });

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await installFetchDelay(page);

  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  let hasFailure = false;

  try {
    try {
      await runLandingFlow(page, baseUrl);
    } catch (error) {
      hasFailure = true;
      console.error('✗ landing contact form flow failed:', error instanceof Error ? error.message : error);
    }

    try {
      await runContactPageFlow(page, baseUrl);
    } catch (error) {
      hasFailure = true;
      console.error('✗ /kontakt form flow failed:', error instanceof Error ? error.message : error);
    }
  } finally {
    await browser.close();
    await stop();
  }

  if (hasFailure) {
    process.exit(1);
  }

  console.log('Contact form E2E completed successfully.');
  process.exit(0);
}

run().catch((error) => {
  console.error('Contact form E2E failed:', error);
  process.exit(1);
});
