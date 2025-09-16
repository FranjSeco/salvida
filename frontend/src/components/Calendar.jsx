import { useState, useEffect } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

function CalendarData({ selectedDate, onDateSelect, isAdmin = false }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(selectedDate);

  // Obtener reservas para el mes actual
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', currentDate.getFullYear(), currentDate.getMonth()],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/bookings');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    },
  });

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      });
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day);
      const isToday = currentDay.toDateString() === new Date().toDateString();
      const isSelected = selectedDay && currentDay.toDateString() === selectedDay.toDateString();
      
      days.push({
        date: currentDay,
        isCurrentMonth: true,
        isToday,
        isSelected
      });
    }

    // Días del mes siguiente para completar la grilla
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      });
    }

    return days;
  };

  const getBookingsForDay = (dayDate) => {
    if (!bookings || !isAdmin) return [];
    
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate.toDateString() === dayDate.toDateString();
    });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const navigateYear = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setFullYear(prev.getFullYear() + direction);
      return newDate;
    });
  };

  const handleDayClick = (day) => {
    if (day.isCurrentMonth) {
      setSelectedDay(day.date);
      onDateSelect(day.date);
    }
  };

  const days = getDaysInMonth(currentDate);

  if (isLoading) {
    return (
      <div className="calendar-loading">
        <div className="loading-spinner"></div>
        <p>Cargando calendario...</p>
      </div>
    );
  }

  return (
    <div className="calendar-container">
      {/* Header del calendario */}
      <div className="calendar-header">
        <div className="calendar-navigation">
          <button 
            className="calendar-nav-btn" 
            onClick={() => navigateYear(-1)}
            aria-label="Año anterior"
          >
            ‹‹
          </button>
          <button 
            className="calendar-nav-btn" 
            onClick={() => navigateMonth(-1)}
            aria-label="Mes anterior"
          >
            ‹
          </button>
        </div>
        
        <div className="calendar-title">
          <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        </div>
        
        <div className="calendar-navigation">
          <button 
            className="calendar-nav-btn" 
            onClick={() => navigateMonth(1)}
            aria-label="Mes siguiente"
          >
            ›
          </button>
          <button 
            className="calendar-nav-btn" 
            onClick={() => navigateYear(1)}
            aria-label="Año siguiente"
          >
            ››
          </button>
        </div>
      </div>

      {/* Días de la semana */}
      <div className="calendar-weekdays">
        {dayNames.map(day => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
      </div>

      {/* Grid de días */}
      <div className="calendar-grid">
        {days.map((day, index) => {
          const dayBookings = getBookingsForDay(day.date);
          const hasConfirmedBookings = dayBookings.some(b => b.status === 'confirmed');
          const hasPendingBookings = dayBookings.some(b => b.status === 'pending');
          
          return (
            <div
              key={index}
              className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${day.isToday ? 'today' : ''} ${day.isSelected ? 'selected' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              <span className="day-number">{day.date.getDate()}</span>
              
              {/* Indicadores de reservas (solo en modo admin) */}
              {isAdmin && day.isCurrentMonth && (
                <div className="booking-indicators">
                  {hasConfirmedBookings && (
                    <div className="indicator confirmed" title="Reservas confirmadas"></div>
                  )}
                  {hasPendingBookings && (
                    <div className="indicator pending" title="Reservas pendientes"></div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default function Calendar({ selectedDate, onDateSelect, isAdmin = false }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="calendar-wrapper">
        <CalendarData 
          selectedDate={selectedDate} 
          onDateSelect={onDateSelect} 
          isAdmin={isAdmin} 
        />
      </div>
    </QueryClientProvider>
  );
}