import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

function BookingData() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/bookings');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    }
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar reservas</p>;

  return (
    <ul>
      {data.map((booking) => (
        <li key={booking.id}>{booking.date} - {booking.status}</li>
      ))}
    </ul>
  );
}

export default function BookingList() {
  return (
    <QueryClientProvider client={queryClient}>
      <h2>Reservas</h2>
      <BookingData />
    </QueryClientProvider>
  );
}

