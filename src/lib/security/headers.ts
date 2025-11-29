export type SecurityHeader = Readonly<{ key: string; value: string }>;

export type CspDirectiveKey =
  | "default-src"
  | "base-uri"
  | "frame-ancestors"
  | "form-action"
  | "frame-src"
  | "style-src"
  | "img-src"
  | "font-src"
  | "script-src"
  | "connect-src"
  | "media-src"
  | "object-src"
  | "upgrade-insecure-requests"
  | "report-uri";

export type CspDirectives = Readonly<Record<CspDirectiveKey, readonly string[] | undefined>>;

export interface CreateCspOptions {
  readonly nonce: string;
  readonly allowUnsafeInlineScripts?: boolean;
  readonly allowUnsafeEval?: boolean;
  readonly disableUpgradeInsecureRequests?: boolean;
  readonly reportUri?: string | null;
}

const YOUTUBE_DOMAINS = [
  "https://www.youtube.com",
  "https://www.youtube-nocookie.com",
] as const;

const IMAGE_DOMAINS = [
  "https://images.unsplash.com",
  "https://autozaba-app-storage.fra1.cdn.digitaloceanspaces.com",
  "https://img.youtube.com",
] as const;

const SCRIPT_DOMAINS = [
  "https://challenges.cloudflare.com",
] as const;

const CONNECT_DOMAINS = SCRIPT_DOMAINS;

const PERMISSIONS_POLICY_VALUE = [
  "accelerometer=(self \"https://www.youtube.com\" \"https://www.youtube-nocookie.com\")",
  "autoplay=(self \"https://www.youtube.com\" \"https://www.youtube-nocookie.com\")",
  "camera=()",
  "display-capture=()",
  "fullscreen=(self \"https://www.youtube.com\" \"https://www.youtube-nocookie.com\")",
  "geolocation=()",
  "gyroscope=(self \"https://www.youtube.com\" \"https://www.youtube-nocookie.com\")",
  "magnetometer=()",
  "microphone=()",
  "payment=()",
  "usb=()",
].join(", ");

export function createCspDirectives(options: CreateCspOptions): CspDirectives {
  const {
    nonce,
    allowUnsafeInlineScripts = false,
    allowUnsafeEval = false,
    disableUpgradeInsecureRequests = false,
    reportUri,
  } = options;

  const nonceSource = "'nonce-" + nonce + "'";
  const scriptSrc: string[] = ["'self'", ...SCRIPT_DOMAINS, nonceSource];

  // Always allow unsafe-inline and unsafe-eval in development to prevent blocking
  if (process.env.NODE_ENV === 'development' || allowUnsafeInlineScripts) {
    scriptSrc.push("'unsafe-inline'");
  }
  if (process.env.NODE_ENV === 'development' || allowUnsafeEval) {
    scriptSrc.push("'unsafe-eval'");
  }

  const directives: CspDirectives = {
    "default-src": ["'self'"],
    "base-uri": ["'self'"],
    "frame-ancestors": ["'self'"],
    "form-action": ["'self'", "https://app.autozaba.pl"],
    "frame-src": ["'self'", ...YOUTUBE_DOMAINS, "https://challenges.cloudflare.com"],
    "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"], // unsafe-inline required for some Next.js styles and third-party tools
    "img-src": ["'self'", "data:", ...IMAGE_DOMAINS],
    "font-src": ["'self'", "data:", "https://fonts.gstatic.com"],
    "script-src": scriptSrc,
    "connect-src": ["'self'", ...CONNECT_DOMAINS],
    "media-src": ["'self'", ...YOUTUBE_DOMAINS],
    "object-src": ["'none'"],
    "upgrade-insecure-requests": disableUpgradeInsecureRequests ? undefined : [""],
    "report-uri": reportUri ? [reportUri] : undefined,
  };

  return directives;
}

export function serializeCspDirectives(directives: CspDirectives): string {
  return Object.entries(directives)
    .filter(([, value]) => Array.isArray(value))
    .map(([key, value]) => {
      const entries = (value as readonly string[]).filter((entry) => entry !== "");
      if (entries.length === 0) {
        return key;
      }
      return `${key} ${entries.join(" ")}`;
    })
    .join("; ");
}

export interface BuildSecurityHeadersOptions extends CreateCspOptions {
  readonly mode?: "enforce" | "report-only" | "dual";
  readonly environment?: "development" | "production";
}

export interface BuildSecurityHeadersResult {
  readonly cspHeader?: SecurityHeader;
  readonly cspReportOnlyHeader?: SecurityHeader;
  readonly additionalHeaders: readonly SecurityHeader[];
}

export function buildSecurityHeaders(options: BuildSecurityHeadersOptions): BuildSecurityHeadersResult {
  const {
    mode = "report-only",
    environment = (process.env.NODE_ENV as "development" | "production") || "development",
    ...rest
  } = options;

  const directives = createCspDirectives(rest);
  const policy = serializeCspDirectives(directives);

  const cspHeader: SecurityHeader | undefined =
    mode === "enforce" || mode === "dual"
      ? { key: "Content-Security-Policy", value: policy }
      : undefined;

  const cspReportOnlyHeader: SecurityHeader | undefined =
    mode === "report-only" || mode === "dual"
      ? {
        key: "Content-Security-Policy-Report-Only",
        value: serializeCspDirectives({
          ...directives,
          "upgrade-insecure-requests": undefined // Report-only ignores this directive
        })
      }
      : undefined;

  const additionalHeaders: SecurityHeader[] = [
    { key: "Permissions-Policy", value: PERMISSIONS_POLICY_VALUE },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
  ];

  if (environment === "production") {
    additionalHeaders.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    });
  }

  return {
    cspHeader,
    cspReportOnlyHeader,
    additionalHeaders,
  };
}
