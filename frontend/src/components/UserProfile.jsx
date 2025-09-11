import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
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
    }
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar usuario</p>;

  return (
    <div>
      <p>Nombre: {data.name}</p>
      <p>Email: {data.email}</p>
    </div>
  );
}

export default function UserProfile({ userId = 1 }) {
  const name = useStore(userName);
  return (
    <QueryClientProvider client={queryClient}>
      <h2>Perfil de {name}</h2>
      <ProfileData userId={userId} />
    </QueryClientProvider>
  );
}
