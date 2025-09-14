import React from 'react';
import { Calendar as AntCalendar } from 'antd';
import dayjs from 'dayjs';

const Calendar = ({ 
  onSelect, 
  onChange, 
  disabledDate, 
  value,
  ...props 
}) => {
  // Convertir value a dayjs si es necesario
  const calendarValue = value ? dayjs(value) : undefined;

  return (
    <AntCalendar
      value={calendarValue}
      onSelect={onSelect}
      onChange={onChange}
      disabledDate={disabledDate}
      {...props}
    />
  );
};

export default Calendar;
