'use client';

import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';

interface BookingWidgetProps {
  calLink: string; // np. "ainything-calendar/konsultacja"
  theme?: 'light' | 'dark' | 'auto';
}

export function BookingWidget({ calLink, theme = 'auto' }: BookingWidgetProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', {
        theme,
        styles: { branding: { brandColor: '#000000' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, [theme]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
          Zarezerwuj wizytę
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Wybierz dogodny termin z kalendarza poniżej.
        </p>
      </div>
      <div className="p-4">
        <div
          style={{ width: '100%', height: '100%', overflow: 'scroll' }}
          id="my-cal-inline"
        >
          <button
            data-cal-link={calLink}
            data-cal-config={`{"layout":"month_view","theme":"${theme}"}`}
            className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg font-medium transition-colors dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            Otwórz kalendarz rezerwacji
          </button>
        </div>
      </div>
    </div>
  );
}
