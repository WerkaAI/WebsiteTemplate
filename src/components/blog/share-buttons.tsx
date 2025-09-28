"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Copy, Linkedin, Twitter, Mail } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
  className?: string;
}

function buildShareUrl(slug: string) {
  if (typeof window !== "undefined" && window.location) {
    return `${window.location.origin}/blog/${slug}`;
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/blog/${slug}`;
  }
  return `https://autozaba.pl/blog/${slug}`;
}

export default function ShareButtons({ title, slug, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => buildShareUrl(slug), [slug]);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  async function handleCopy() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy share link", error);
    }
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10"
          onClick={handleCopy}
          type="button"
          aria-label="Kopiuj link"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10"
          asChild
          aria-label="Udostępnij na LinkedIn"
        >
          <Link
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10"
          asChild
          aria-label="Udostępnij na X (Twitter)"
        >
          <Link
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10"
          asChild
          aria-label="Udostępnij e-mailem"
        >
          <Link
            href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Link: {shareUrl}
      </p>
    </div>
  );
}
