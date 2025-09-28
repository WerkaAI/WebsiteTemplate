declare module "resend" {
  type EmailBody = Record<string, unknown> & {
    from: string;
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    reply_to?: string;
  };

  export class Resend {
    constructor(apiKey?: string);
    emails: {
      send<T extends EmailBody>(payload: T): Promise<unknown>;
    };
  }
}

declare module "react-turnstile" {
  import type { ComponentType } from "react";

  export interface TurnstileProps {
    sitekey: string;
    onVerify?: (token: string) => void;
    onError?: () => void;
    onExpire?: () => void;
    theme?: "light" | "dark" | "auto";
    language?: string;
    refreshExpired?: "auto" | "manual";
    className?: string;
    "data-testid"?: string;
  }

  const Turnstile: ComponentType<TurnstileProps>;
  export default Turnstile;
}
