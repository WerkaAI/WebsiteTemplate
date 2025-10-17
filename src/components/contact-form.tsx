"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import Turnstile from "react-turnstile";

// Form validation schema - make token optional when CAPTCHA is not configured
const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Imię musi mieć co najmniej 2 znaki').max(50, 'Imię jest za długie'),
  email: z.string().trim().email('Nieprawidłowy adres email').max(100, 'Email jest za długi'),
  phone: z.string().trim().max(20, 'Numer telefonu jest za długi').optional(),
  message: z.string().trim().min(10, 'Wiadomość musi mieć co najmniej 10 znaków').max(2000, 'Wiadomość jest za długa'),
  consent: z.boolean().refine(val => val === true, 'Musisz wyrazić zgodę na przetwarzanie danych'),
  token: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY 
    ? z.string().min(1, 'Błąd weryfikacji CAPTCHA')
    : z.string().optional(),
  company: z.string().optional(), // Honeypot field
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      consent: false,
      token: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? '' : 'dev-bypass-token',
      company: '', // Honeypot
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Sukces!",
          description: result.message || "Wiadomość została wysłana",
        });
        form.reset();
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
    form.setValue('token', token);
  };

  const handleTurnstileError = () => {
    form.setValue('token', '');
    toast({
      variant: "destructive",
      title: "Błąd weryfikacji",
      description: "Spróbuj ponownie lub odśwież stronę",
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

      {/* Phone field */}
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
          checked={form.watch('consent')}
          onCheckedChange={(checked) => form.setValue('consent', checked as boolean)}
          data-testid="checkbox-consent"
        />
        <div className="space-y-1">
          <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
            Wyrażam zgodę na przetwarzanie moich danych osobowych w celu udzielenia odpowiedzi na zapytanie zgodnie z{' '}
            <a href="/polityka-prywatnosci" className="text-primary dark:text-primary-foreground hover:underline dark:hover:text-primary-foreground/80">
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
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <div className="space-y-2">
          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
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
        className="w-full bg-primary hover:bg-primary/90"
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
            Wyślij wiadomość
          </>
        )}
      </Button>
    </form>
  );
}