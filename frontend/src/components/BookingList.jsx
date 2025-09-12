import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

function BookingData() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/bookings');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando reservas...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <p>Error al cargar las reservas</p>
      </div>
    );

  if (!data || data.length === 0) {
    return (
      <div className="empty-state">
        <p>No tienes reservas aún</p>
        <a href="/profile" className="btn">
          Crear primera reserva
        </a>
      </div>
    );
  }

  return (
    <div className="bookings-grid">
      {data.map((booking) => (
        <div key={booking.id} className="booking-card">
          <div className="booking-header">
            <h3 className="booking-title">Reserva #{booking.id}</h3>
            <span
              className={`booking-status status-${booking.status?.toLowerCase()}`}
            >
              {booking.status}
            </span>
          </div>
          <div className="booking-details">
            <div className="booking-info">
              <span className="info-label">Fecha:</span>
              <span className="info-value">
                {new Date(booking.date).toLocaleDateString('es-ES')}
              </span>
            </div>
            <div className="booking-info">
              <span className="info-label">Hora:</span>
              <span className="info-value">
                {new Date(booking.date).toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            {booking.destination && (
              <div className="booking-info">
                <span className="info-label">Destino:</span>
                <span className="info-value">{booking.destination}</span>
              </div>
            )}
          </div>
          <div className="booking-actions">
            <button className="btn btn-small">Ver detalles</button>
            {booking.status === 'pending' && (
              <button className="btn btn-secondary btn-small">Cancelar</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BookingList() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bookings-container">
        <div className="page-header">
          <h1>Mis Reservas</h1>
          <p>Gestiona tus reservas de transporte</p>
        </div>
        <BookingData />
      </div>
    </QueryClientProvider>
  );
}
