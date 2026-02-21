/**
 * Utility for triggering haptic feedback on supported devices (mostly Android).
 * iOS Safari does not support the Vibration API.
 */

type HapticPattern = "light" | "medium" | "heavy" | "success" | "error";

export const triggerHaptic = (pattern: HapticPattern = "light") => {
  if (typeof window === "undefined" || !window.navigator || !window.navigator.vibrate) {
    return;
  }

  try {
    switch (pattern) {
      case "light":
        window.navigator.vibrate(10);
        break;
      case "medium":
        window.navigator.vibrate(30);
        break;
      case "heavy":
        window.navigator.vibrate(50);
        break;
      case "success":
        window.navigator.vibrate([10, 30, 20]);
        break;
      case "error":
        window.navigator.vibrate([50, 50, 50]);
        break;
      default:
        window.navigator.vibrate(10);
    }
  } catch (error) {
    // Ignore errors (e.g., user hasn't interacted with the page yet)
    console.warn("Haptic feedback failed", error);
  }
};
