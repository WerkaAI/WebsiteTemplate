import { BookingWidget } from '@/components/features/booking/BookingWidget';

export const metadata = {
  title: 'Rezerwacja wizyty',
  description: 'Zarezerwuj wizytę online.',
};

export default function BookingPage() {
  return (
    <main className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Umów się na wizytę
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Wybierz dogodny termin i zarezerwuj wizytę w kilku prostych krokach.
          </p>
        </div>

        {/* 
          Tutaj podajemy link do wydarzenia. 
          Zastąp "konsultacja" nazwą (slugiem) wydarzenia, które utworzyłeś w Cal.com 
        */}
        <BookingWidget calLink="ainything-calendar/konsultacja" />
      </div>
    </main>
  );
}
