import React, { useState } from 'react';
import '../styles/MemoryCalendar.css';
import { logEvent } from '../utils/api';

const MemoryCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth] = useState(new Date(2024, 11, 1)); // December 2024

  // Placeholder memory dates
  const memoryDates = {
    7: { 
      type: 'milestone', 
      emoji: '❤️',
      title: 'Our First Anniversary',
      description: 'One whole year of us. Every moment with you has been special.',
      albumId: 'anniversary'
    },
    12: { 
      type: 'birthday', 
      emoji: '💙',
      title: 'Your Birthday',
      description: 'The day the most amazing person came into this world.',
      albumId: 'birthdays'
    },
    25: { 
      type: 'holiday', 
      emoji: '🌸',
      title: 'Christmas Together',
      description: 'Even though we were apart, we celebrated together in our hearts.',
      albumId: 'dates'
    }
  };

  const handleDateClick = (day) => {
    if (memoryDates[day]) {
      setSelectedDate({ day, ...memoryDates[day] });
      logEvent('calendar_date_click', { date: day, type: memoryDates[day].type });
    }
  };

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
      logEvent('calendar_see_photos_click', { dateId: selectedDate?.day });
    }
  };

  const daysInMonth = new Date(2024, 12, 0).getDate();
  const firstDayOfWeek = currentMonth.getDay();

  const calendarDays = [];
  // Empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <section className="tour-search" id="memory-calendar">
      <div className="container">
        <div className="memory-calendar-wrapper">
          <div className="calendar-section">
            <h3 className="memory-calendar-title">Favourite Moments</h3>
            <p className="memory-calendar-subtitle">Click on highlighted dates to relive our memories</p>
            
            <div className="calendar-grid">
              <div className="calendar-header">
                <div className="month-name">December 2024</div>
                <div className="weekdays">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="weekday">{day}</div>
                  ))}
                </div>
              </div>
              <div className="calendar-days">
                {calendarDays.map((day, index) => {
                  const memory = day ? memoryDates[day] : null;
                  return (
                    <div
                      key={index}
                      className={`calendar-day ${memory ? 'has-memory' : ''} ${selectedDate?.day === day ? 'selected' : ''}`}
                      onClick={() => day && handleDateClick(day)}
                    >
                      {day && (
                        <>
                          <span className="day-number">{day}</span>
                          {memory && <span className="memory-emoji">{memory.emoji}</span>}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="memory-detail-panel">
            {selectedDate ? (
              <div className="memory-detail">
                <h3 className="memory-title">
                  {selectedDate.day} December 2024 — {selectedDate.title} {selectedDate.emoji}
                </h3>
                <p className="memory-description">{selectedDate.description}</p>
                <button className="btn btn-secondary" onClick={scrollToGallery}>
                  See Photos From This Day
                </button>
              </div>
            ) : (
              <div className="memory-placeholder">
                <p>Select a date to see the memory</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemoryCalendar;
