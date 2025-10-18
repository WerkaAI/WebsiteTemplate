type AnalyticsEvent = {
  name: string
  payload?: Record<string, unknown>
}

// GPT-5 Directive: Zastąp logowaniem do produkcyjnego narzędzia analitycznego, gdy będzie dostępne.
export function useAnalytics() {
  function track(event: AnalyticsEvent) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[analytics]', event)
    }
    // TODO: Podłączyć docelową integrację (np. PostHog/GA4) z obsługą zdarzeń takich jak tutorial_started.
  }

  return { track }
}
