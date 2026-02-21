"use client";

import { useState, useEffect, type ReactNode } from "react";

interface ABTestProps {
  id: string;
  variants: {
    [key: string]: ReactNode;
  };
}

export function ABTest({ id, variants }: ABTestProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  useEffect(() => {
    // Check if a variant is already stored in localStorage
    const storedVariant = localStorage.getItem(`ab-test-${id}`);
    const variantKeys = Object.keys(variants);

    if (storedVariant && variantKeys.includes(storedVariant)) {
      setSelectedVariant(storedVariant);
    } else {
      // Randomly select a variant
      const randomVariant = variantKeys[Math.floor(Math.random() * variantKeys.length)];
      setSelectedVariant(randomVariant);
      localStorage.setItem(`ab-test-${id}`, randomVariant);
      
      // Here you would typically also send an event to your analytics provider
      // e.g., trackEvent('ab_test_assigned', { test_id: id, variant: randomVariant })
    }
  }, [id, variants]);

  if (!selectedVariant) {
    return null; // Or a loading skeleton if preferred
  }

  return <>{variants[selectedVariant]}</>;
}
