import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useStore } from '@nanostores/react';
import { userName } from '../stores/user.js';

const queryClient = new QueryClient();

function ProfileData() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['status'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    }
  });
  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar API</p>;
  return <pre>{JSON.stringify(data)}</pre>;
}

export default function UserProfile() {
  const name = useStore(userName);
  return (
    <QueryClientProvider client={queryClient}>
      <h2>Perfil de {name}</h2>
      <ProfileData />
    </QueryClientProvider>
  );
}
