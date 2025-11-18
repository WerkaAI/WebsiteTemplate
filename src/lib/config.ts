/**
 * Application configuration
 * Centralized configuration for URLs and environment-specific settings
 */

export const getAppUrl = (): string => {
  return process.env.NEXT_PUBLIC_APP_URL || "https://app.autozaba.pl";
};

/**
 * Application URLs
 */
export const APP_URLS = {
  base: getAppUrl(),
  register: `${getAppUrl()}/register`,
  login: `${getAppUrl()}/auth`,
  trial: `${getAppUrl()}/register`,
} as const;
