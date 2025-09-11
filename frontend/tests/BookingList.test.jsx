import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookingList from '../src/components/BookingList.jsx';

describe('BookingList', () => {
  it('muestra reservas después de cargar', async () => {
    const mockBookings = [
      { id: 1, date: '2024-01-01', status: 'confirmada' }
    ];

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockBookings
    });

    render(<BookingList />);

    await waitFor(() => {
      expect(screen.getByText('2024-01-01 - confirmada')).toBeTruthy();
    });

    expect(screen.getByText('Reservas')).toBeTruthy();
    global.fetch.mockRestore();
  });
});
