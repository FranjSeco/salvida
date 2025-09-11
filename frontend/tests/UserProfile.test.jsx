import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserProfile from '../src/components/UserProfile.jsx';
import { userName } from '../src/stores/user.js';

describe('UserProfile', () => {
  it('muestra información del usuario', async () => {
    userName.set('Carlos');

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ name: 'Carlos', email: 'carlos@example.com' })
    });

    render(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(screen.getByText('Nombre: Carlos')).toBeTruthy();
    });

    expect(screen.getByText('Perfil de Carlos')).toBeTruthy();
    expect(screen.getByText('Email: carlos@example.com')).toBeTruthy();
    global.fetch.mockRestore();
  });
});
