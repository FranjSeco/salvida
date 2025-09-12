import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useStore } from '@nanostores/react';
import { userName } from '../stores/user.js';

const queryClient = new QueryClient();

function ProfileData({ userId }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8000/users/${userId}`);
      if (!res.ok) throw new Error('Network error');
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <p>Error al cargar el perfil del usuario</p>
      </div>
    );

  return (
    <div className="profile-content">
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-text">
            {data.name?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{data.name || 'Usuario'}</h2>
          <span className="profile-role">Usuario de Salvida</span>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-section">
          <h3>Información Personal</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Nombre completo:</span>
              <span className="detail-value">
                {data.name || 'No especificado'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">
                {data.email || 'No especificado'}
              </span>
            </div>
            {data.phone && (
              <div className="detail-item">
                <span className="detail-label">Teléfono:</span>
                <span className="detail-value">{data.phone}</span>
              </div>
            )}
            {data.address && (
              <div className="detail-item">
                <span className="detail-label">Dirección:</span>
                <span className="detail-value">{data.address}</span>
              </div>
            )}
          </div>
        </div>

        {data.disability_type && (
          <div className="detail-section">
            <h3>Información de Accesibilidad</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Tipo de discapacidad:</span>
                <span className="detail-value">{data.disability_type}</span>
              </div>
              {data.mobility_aids && (
                <div className="detail-item">
                  <span className="detail-label">Ayudas de movilidad:</span>
                  <span className="detail-value">{data.mobility_aids}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="profile-actions">
        <button className="btn">Editar perfil</button>
        <button className="btn btn-secondary">Cambiar contraseña</button>
        <a href="/" className="btn btn-secondary">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

export default function UserProfile({ userId = 1 }) {
  const name = useStore(userName);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="profile-container">
        <div className="page-header">
          <h1>Mi Perfil</h1>
          <p>Gestiona tu información personal y preferencias</p>
        </div>
        <ProfileData userId={userId} />
      </div>
    </QueryClientProvider>
  );
}
