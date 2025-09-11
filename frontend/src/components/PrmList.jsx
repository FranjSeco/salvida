import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

function PrmData() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['prms'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/prms');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    }
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar PRMs</p>;

  return (
    <ul>
      {data.map((prm) => (
        <li key={prm.id}>{prm.name}</li>
      ))}
    </ul>
  );
}

export default function PrmList() {
  return (
    <QueryClientProvider client={queryClient}>
      <h2>Personas PRM</h2>
      <PrmData />
    </QueryClientProvider>
  );
}

