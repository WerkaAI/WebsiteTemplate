"use client";

import { useEffect } from "react";

const ANIMATE_SELECTOR = "[data-animate]";

export default function InteractionLayer() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }
    const schedule = (window as typeof window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
    }).requestIdleCallback;
    const cancelSchedule = (window as typeof window & {
      cancelIdleCallback?: (handle: number) => void;
    }).cancelIdleCallback;

  let idleHandle: number | null = null;
  let timeoutHandle: number | null = null;
    let cleanup: (() => void) | undefined;

    const runSetup = () => {
      const body = document.body;
      body.classList.add("reveal-ready");

      const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
      const supportsIntersectionObserver = "IntersectionObserver" in window;

      const markVisible = (element: HTMLElement) => {
        if (!element.classList.contains("is-visible")) {
          element.classList.add("is-visible");
          element.dispatchEvent(new CustomEvent("component:visible", { bubbles: false }));
        }
      };

      const primeElement = (element: HTMLElement) => {
        if (element.dataset.animateReady === "true") {
          return;
        }
        element.dataset.animateReady = "true";

        if (element.hasAttribute("data-animate-once")) {
          element.dataset.animateOnce = "true";
        }

        const delay = element.dataset.animateDelay;
        if (delay) {
          element.style.setProperty("--reveal-delay", `${delay}ms`);
        }
      };

      const revealImmediately = (root: ParentNode = document) => {
        root.querySelectorAll<HTMLElement>(ANIMATE_SELECTOR).forEach((element) => {
          primeElement(element);
          markVisible(element);
        });
      };

      if (prefersReducedMotion || !supportsIntersectionObserver) {
        revealImmediately();
        cleanup = () => {
          body.classList.remove("reveal-ready");
        };
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement;
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              markVisible(element);
              observer.unobserve(element);
              return;
            }

            const exitingView = entry.boundingClientRect.top > 0;
            const fullyHidden = (entry.intersectionRatio ?? 0) <= 0;

            if (!element.dataset.animateOnce && exitingView && fullyHidden) {
              element.classList.remove("is-visible");
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
      );

      const observeElement = (element: HTMLElement) => {
        primeElement(element);

        if (isElementInViewport(element)) {
          markVisible(element);
          return;
        }

        observer.observe(element);
      };

      const hydrate = (root: ParentNode = document) => {
        root.querySelectorAll<HTMLElement>(`${ANIMATE_SELECTOR}:not([data-animate-ready="true"])`).forEach(observeElement);
      };

      let rafId = window.requestAnimationFrame(() => {
        hydrate();
        rafId = window.requestAnimationFrame(() => hydrate());
      });

      const ensureVisibleFallback = window.setTimeout(() => {
        document
          .querySelectorAll<HTMLElement>(`${ANIMATE_SELECTOR}:not(.is-visible)`)
          .forEach((element) => {
            primeElement(element);
            markVisible(element);
          });
      }, 1200);

      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof Element)) {
              return;
            }

            if (node.matches(ANIMATE_SELECTOR)) {
              observeElement(node as HTMLElement);
            }

            node.querySelectorAll<HTMLElement>(ANIMATE_SELECTOR).forEach(observeElement);
          });
        });
      });

      mutationObserver.observe(document.body, { childList: true, subtree: true });

      const handleResize = () => {
        document
          .querySelectorAll<HTMLElement>(`${ANIMATE_SELECTOR}:not(.is-visible)`)
          .forEach((element) => {
            if (isElementInViewport(element)) {
              markVisible(element);
            }
          });
      };

      window.addEventListener("load", handleResize, { once: true });
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleResize, { passive: true });

      cleanup = () => {
        window.cancelAnimationFrame(rafId);
        window.clearTimeout(ensureVisibleFallback);
        observer.disconnect();
        mutationObserver.disconnect();
        window.removeEventListener("load", handleResize);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleResize);
        body.classList.remove("reveal-ready");
        document
          .querySelectorAll<HTMLElement>(ANIMATE_SELECTOR)
          .forEach((element) => delete element.dataset.animateReady);
      };
    };

    const run = () => {
      if (!cleanup) {
        runSetup();
      }
    };

    if (schedule) {
      idleHandle = schedule(run, { timeout: 200 });
    } else {
      timeoutHandle = window.setTimeout(run, 160);
    }

    return () => {
      if (idleHandle !== null && cancelSchedule) {
        cancelSchedule(idleHandle);
      }
      if (timeoutHandle !== null) {
        window.clearTimeout(timeoutHandle);
      }
      cleanup?.();
    };
  }, []);

  return null;
}

function isElementInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.top <= viewportHeight * 0.95 &&
    rect.bottom >= viewportHeight * -0.1 &&
    rect.left <= viewportWidth &&
    rect.right >= 0
  );
}
