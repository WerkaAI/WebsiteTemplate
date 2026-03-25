/**
 * Application configuration
 * Centralized configuration for URLs and environment-specific settings
 */

export const getAppUrl = (): string => {
  return process.env.NEXT_PUBLIC_APP_URL || "https://app.example.com";
};

/** External booking URL — Aneta's ZnanyLekarz profile */
export const BOOKING_URL =
  "https://www.znanylekarz.pl/aneta-koloszynska/fizjoterapeuta/wroclaw";

/**
 * Application URLs
 */
export const APP_URLS = {
  base: getAppUrl(),
  register: `${getAppUrl()}/register`,
  login: `${getAppUrl()}/auth`,
  trial: `${getAppUrl()}/register`,
} as const;
