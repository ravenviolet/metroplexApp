import * as React from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  format,
  addMonths,
  subMonths,
} from 'date-fns';
import './CalendarMonth.css';

function CalendarMonth({ currentDate, handleNextDate, handlePreviousDate, filteredJobs }) {
  const monthStartDate = startOfMonth(currentDate);
  const monthEndDate = endOfMonth(currentDate);
  const calendarStartDate = startOfWeek(monthStartDate);
  const calendarEndDate = endOfWeek(monthEndDate);

  const days = eachDayOfInterval({ start: calendarStartDate, end: calendarEndDate });

  return (
    <div className="calendar-month">
      <div className="header">
        <button onClick={() => handlePreviousDate(subMonths(currentDate, 1))}>&lt;</button>
        <span>{format(currentDate, 'MMMM yyyy')}</span>
        <button onClick={() => handleNextDate(addMonths(currentDate, 1))}>&gt;</button>
      </div>
      <div className="weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday) => (
          <div key={weekday} className="weekday">
            {weekday}
          </div>
        ))}
      </div>
      <div className="days">
        {days.map((day) => (
          <div key={day.toISOString()} className={`day ${format(day, 'MMM') !== format(currentDate, 'MMM') ? 'outside-month' : ''}`}>
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarMonth;