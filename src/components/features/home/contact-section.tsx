"use client";

import { CardContent } from "@/components/ui/card";
import { Mail, Clock, Headphones, Video } from "lucide-react";
import ContactForm from "@/components/features/contact/contact-form";
import { motion } from "framer-motion";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "autozaba@ainything.pl",
    iconColor: "text-primary",
  },
  {
    icon: Clock,
    title: "Godziny wsparcia",
    content: "Pon-Pt: 9:00-17:00",
    iconColor: "text-secondary",
  },
  {
    icon: Headphones,
    title: "Wsparcie w języku",
    content: "Polskim, angielskim, ukraińskim",
    iconColor: "text-accent",
  },
];

const quickHelp = [
  { icon: Video, label: "Przewodniki wideo", href: "/tutoriale" },
];

export default function ContactSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="section-padding bg-muted flex flex-col items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="text-center space-y-4 mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground" data-testid="text-contact-title">
            Potrzebujesz <span className="text-primary dark:text-emerald-300">pomocy</span>?
          </h2>
          <p className="text-xl text-muted-foreground copy-max mx-auto" data-testid="text-contact-subtitle">
            Jesteśmy tu, by odpowiedzieć na Twoje pytania i pomóc we wdrożeniu
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <h3 className="text-xl font-semibold text-foreground" data-testid="text-contact-info-title">
                Skontaktuj się z nami
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.title}
                      className="flex items-center space-x-4"
                      variants={itemVariants}
                      data-testid={`contact-info-${index}`}
                    >
                      <div className="tinted-media w-12 h-12 rounded-xl flex items-center justify-center bg-muted">
                        <Icon className={`w-5 h-5 ${info.iconColor}`} />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{info.title}</div>
                        <div className="text-muted-foreground">{info.content}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick help */}
            <motion.div
              className="glass-premium rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <CardContent className="p-5 sm:p-6 space-y-4">
                <h4 className="font-semibold text-foreground" data-testid="text-quick-help-title">
                  Szybka pomoc
                </h4>
                <div className="space-y-3 text-sm">
                  {quickHelp.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center text-primary dark:text-emerald-300 hover:text-primary/80 dark:hover:text-emerald-200 transition-colors"
                        data-testid={`quick-help-${index}`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            className="glass-premium rounded-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CardContent className="p-6 sm:p-8 space-y-6">
              <ContactForm
                showPhone={false}
                showShops
                successToast={{
                  title: "Dziękujemy za wiadomość!",
                  description: "Skontaktujemy się w ciągu 2 godzin roboczych.",
                }}
                submitLabel="Wyślij wiadomość"
                submitButtonSize="touch"
                submitButtonClassName="text-primary-foreground font-semibold disabled:opacity-60 button-border-animated"
              />
              <p className="text-xs text-muted-foreground text-center" data-testid="text-contact-response-time">
                Odpowiemy w ciągu 2 godzin roboczych
              </p>
            </CardContent>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
