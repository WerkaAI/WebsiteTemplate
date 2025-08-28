import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      res.json({
        success: true,
        message: "Dziękujemy za wiadomość! Skontaktujemy się w ciągu 2 godzin roboczych.",
        contactId: contact.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Nieprawidłowe dane formularza",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie."
        });
      }
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existingNewsletters = await storage.getNewsletters();
      const existingEmail = existingNewsletters.find(n => n.email === validatedData.email);
      
      if (existingEmail) {
        res.status(409).json({
          success: false,
          message: "Ten adres email jest już zapisany do newslettera."
        });
        return;
      }

      const newsletter = await storage.createNewsletter(validatedData);
      
      res.json({
        success: true,
        message: "Dziękujemy za zapisanie się! Sprawdź email w celu potwierdzenia.",
        subscriptionId: newsletter.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Nieprawidłowy adres email",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Wystąpił błąd podczas zapisywania do newslettera. Spróbuj ponownie."
        });
      }
    }
  });

  // Get all contacts (admin endpoint)
  app.get("/api/admin/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({
        success: true,
        contacts: contacts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Błąd podczas pobierania kontaktów"
      });
    }
  });

  // Get all newsletter subscriptions (admin endpoint) 
  app.get("/api/admin/newsletters", async (req, res) => {
    try {
      const newsletters = await storage.getNewsletters();
      res.json({
        success: true,
        newsletters: newsletters
          .filter(n => n.subscribed)
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Błąd podczas pobierania subskrypcji newslettera"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      success: true,
      message: "AutoŻaba API is running",
      timestamp: new Date().toISOString()
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
