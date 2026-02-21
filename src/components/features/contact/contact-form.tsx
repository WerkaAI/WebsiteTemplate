"use client";

import { ComponentProps, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import Turnstile from "react-turnstile";

import {
  ContactPayload,
  SHOP_OPTIONS,
  SHOP_OPTION_LABELS,
  createContactSchema,
} from "@/lib/validation/contact";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  showPhone?: boolean;
  showShops?: boolean;
  requireShops?: boolean;
  successToast?: {
    title: string;
    description?: string;
  };
  submitLabel?: string;
  className?: string;
  submitButtonClassName?: string;
  submitButtonSize?: ComponentProps<typeof Button>["size"];
}

export default function ContactForm({
  showPhone = true,
  showShops = false,
  requireShops = showShops,
  successToast,
  submitLabel = "Wyślij wiadomość",
  className,
  submitButtonClassName,
  submitButtonSize,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldRenderTurnstile, setShouldRenderTurnstile] = useState(false);
  const { toast } = useToast();
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const requiresToken = Boolean(turnstileSiteKey);

  const validationSchema = useMemo(
    () =>
      createContactSchema({
        requireShops,
        requireToken: requiresToken,
      }),
    [requireShops, requiresToken]
  );

  const defaultValues = useMemo<ContactPayload>(
    () => ({
      name: "",
      email: "",
      phone: "",
      shops: undefined,
      message: "",
      consent: false,
      token: requiresToken ? "" : "dev-bypass-token",
      company: "",
    }),
    [requiresToken]
  );

  const form = useForm<ContactPayload>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const onSubmit = async (data: ContactPayload) => {
    setIsSubmitting(true);
    const { token, ...payload } = data;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payload, token }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: successToast?.title ?? "Sukces!",
          description: successToast?.description ?? result.message ?? "Wiadomość została wysłana",
        });
        form.reset(defaultValues);
      } else {
        toast({
          variant: "destructive",
          title: "Błąd",
          description: result.error || "Wystąpił błąd podczas wysyłania wiadomości",
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Wystąpił błąd podczas wysyłania wiadomości",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTurnstileVerify = (token: string) => {
    form.setValue('token', token, { shouldValidate: true });
  };

  const handleTurnstileError = () => {
    form.setValue('token', undefined, { shouldValidate: true });
    toast({
      variant: "destructive",
      title: "Błąd weryfikacji",
      description: "Spróbuj ponownie lub odśwież stronę",
    });
  };

  const handleConsentChange = (checked: boolean | "indeterminate") => {
    const isChecked = checked === true;
    form.setValue('consent', isChecked, { shouldValidate: true });
  };

  const consentValue = form.watch('consent');

  useEffect(() => {
    if (!requiresToken) {
      if (shouldRenderTurnstile) {
        setShouldRenderTurnstile(false);
      }
      return;
    }

    if (consentValue) {
      if (!shouldRenderTurnstile) {
        setShouldRenderTurnstile(true);
      }
    } else {
      if (shouldRenderTurnstile) {
        setShouldRenderTurnstile(false);
      }

      const currentToken = form.getValues('token');
      if (currentToken) {
        form.setValue('token', '', { shouldValidate: false });
      }
    }
  }, [consentValue, form, requiresToken, shouldRenderTurnstile]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className={cn("space-y-6", className)}
    >
      {/* Honeypot field - stays out of the accessibility tree */}
      <input
        type="hidden"
        {...form.register('company')}
        autoComplete="off"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {/* Name field */}
        <div className="space-y-2">
          <Label htmlFor="name">
            Imię i nazwisko <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            {...form.register('name')}
            placeholder="Jan Kowalski"
            data-testid="input-contact-name"
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500" data-testid="error-name">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Email field */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...form.register('email')}
            placeholder="jan@example.com"
            data-testid="input-contact-email"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500" data-testid="error-email">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
      </div>

      {showPhone && (
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon (opcjonalnie)</Label>
          <Input
            id="phone"
            type="tel"
            {...form.register('phone')}
            placeholder="+48 123 456 789"
            data-testid="input-contact-phone"
          />
          {form.formState.errors.phone && (
            <p className="text-sm text-red-500" data-testid="error-phone">
              {form.formState.errors.phone.message}
            </p>
          )}
        </div>
      )}

      {showShops && (
        <div className="space-y-2">
          <Label htmlFor="shops" id="contact-shops-label">
            Liczba lokalizacji <span className="text-red-500">*</span>
          </Label>
          <Controller
            control={form.control}
            name="shops"
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger
                  id="shops"
                  aria-labelledby="contact-shops-label"
                  aria-invalid={!!form.formState.errors.shops}
                  aria-describedby={form.formState.errors.shops ? "shops-error" : undefined}
                  data-testid="select-contact-shops"
                >
                  <SelectValue placeholder="Wybierz liczbę lokalizacji" />
                </SelectTrigger>
                <SelectContent>
                  {SHOP_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {SHOP_OPTION_LABELS[option]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.shops && (
            <p className="text-sm text-red-500" id="shops-error" data-testid="error-shops">
              {form.formState.errors.shops.message}
            </p>
          )}
        </div>
      )}

      {/* Message field */}
      <div className="space-y-2">
        <Label htmlFor="message">
          Wiadomość <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          {...form.register('message')}
          placeholder="Opisz swoje pytanie lub potrzeby..."
          className="min-h-[120px]"
          data-testid="input-contact-message"
        />
        {form.formState.errors.message && (
          <p className="text-sm text-red-500" data-testid="error-message">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      {/* Consent checkbox */}
      <div className="flex items-start space-x-3">
        <Checkbox
          id="consent"
          checked={consentValue}
          onCheckedChange={handleConsentChange}
          data-testid="checkbox-consent"
        />
        <div className="space-y-1">
          <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
            Wyrażam zgodę na przetwarzanie moich danych osobowych w celu udzielenia odpowiedzi na zapytanie zgodnie z{' '}
            <a href="/polityka-prywatnosci" className="text-primary dark:text-emerald-300 underline hover:underline">
              polityką prywatności
            </a>
            . <span className="text-red-500">*</span>
          </Label>
          {form.formState.errors.consent && (
            <p className="text-sm text-red-500" data-testid="error-consent">
              {form.formState.errors.consent.message}
            </p>
          )}
        </div>
      </div>

      {/* Turnstile CAPTCHA */}
      {requiresToken && shouldRenderTurnstile && (
        <div className="space-y-2">
          <Turnstile
            sitekey={turnstileSiteKey!}
            onVerify={handleTurnstileVerify}
            onError={handleTurnstileError}
            theme="auto"
            language="auto"
            data-testid="turnstile-widget"
          />
          {form.formState.errors.token && (
            <p className="text-sm text-red-500" data-testid="error-token">
              {form.formState.errors.token.message}
            </p>
          )}
        </div>
      )}

      {/* Submit button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        size={submitButtonSize}
        className={cn("w-full bg-primary hover:bg-primary/90", submitButtonClassName)}
        data-testid="button-submit-contact"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Wysyłanie...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            {submitLabel}
          </>
        )}
      </Button>
    </form>
  );
}