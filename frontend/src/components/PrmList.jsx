import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

function PrmData() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['prms'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/prms');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando personas PRM...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <p>Error al cargar las personas PRM</p>
      </div>
    );

  if (!data || data.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay personas PRM registradas</p>
        <a href="/admin" className="btn">
          Registrar persona PRM
        </a>
      </div>
    );
  }

  return (
    <div className="prms-grid">
      {data.map((prm) => (
        <div key={prm.id} className="prm-card">
          <div className="prm-header">
            <div className="prm-avatar">
              <span className="avatar-text">
                {prm.name?.charAt(0)?.toUpperCase() || 'P'}
              </span>
            </div>
            <div className="prm-info">
              <h3 className="prm-name">{prm.name || 'Sin nombre'}</h3>
              <span className="prm-type">Persona PRM</span>
            </div>
          </div>
          <div className="prm-details">
            {prm.email && (
              <div className="prm-info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{prm.email}</span>
              </div>
            )}
            {prm.phone && (
              <div className="prm-info-item">
                <span className="info-label">Teléfono:</span>
                <span className="info-value">{prm.phone}</span>
              </div>
            )}
            {prm.disability_type && (
              <div className="prm-info-item">
                <span className="info-label">Tipo de discapacidad:</span>
                <span className="info-value">{prm.disability_type}</span>
              </div>
            )}
          </div>
          <div className="prm-actions">
            <button className="btn btn-small">Ver perfil</button>
            <button className="btn btn-secondary btn-small">Editar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PrmList() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="prms-container">
        <div className="page-header">
          <h1>Personas PRM</h1>
          <p>Gestiona las personas con movilidad reducida</p>
        </div>
        <PrmData />
      </div>
    </QueryClientProvider>
  );
}
