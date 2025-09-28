"use client";

import { useEffect } from "react";

function isElementInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  return (
    rect.top <= viewportHeight * 0.92 &&
    rect.bottom >= viewportHeight * -0.08 &&
    rect.left <= viewportWidth &&
    rect.right >= 0
  );
}

function collectAnimateTargets(root: ParentNode) {
  const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-animate]:not([data-animate-ready])"));
  if (root instanceof HTMLElement && root.hasAttribute("data-animate") && !root.dataset.animateReady) {
    elements.unshift(root);
  }
  return elements;
}

function handleVisible(target: HTMLElement, observer?: IntersectionObserver | null) {
  target.classList.add("is-visible");
  target.dispatchEvent(new CustomEvent("component:visible", { bubbles: false }));
  observer?.unobserve?.(target);
}

function hydrateAnimationTargets(root: ParentNode, observer: IntersectionObserver | null) {
  const elements = collectAnimateTargets(root);
  elements.forEach((element) => {
    element.dataset.animateReady = "true";

    if (element.hasAttribute("data-animate-once")) {
      element.dataset.animateOnce = "true";
    }

    const delay = element.dataset.animateDelay;
    if (delay) {
      element.style.setProperty("--reveal-delay", `${delay}ms`);
    }

    if (!observer) {
      handleVisible(element);
      return;
    }

    if (isElementInViewport(element)) {
      handleVisible(element, observer);
      return;
    }

    observer.observe(element);
  });
}

export default function InteractionLayer() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const body = document.body;
    body.classList.add("reveal-ready");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | null = null;

    if (!prefersReducedMotion.matches) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              handleVisible(target, observer);
            } else if (entry.boundingClientRect.top > 0 && !target.dataset.animateOnce) {
              target.classList.remove("is-visible");
            }
          });
        },
        { rootMargin: "0px 0px -5% 0px", threshold: 0.125 }
      );
    }

    hydrateAnimationTargets(document, observer);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          hydrateAnimationTargets(node, observer);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer?.disconnect();
      body.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
