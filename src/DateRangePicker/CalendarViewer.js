import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getClassName, getTabIndex } from './helpers';

const weekDays = moment.weekdaysShort();
export default function CalendarViewer(props) {
  const {
    calendar,
    value,
    setSelectedDates,
    dateRange,
    focusedInput,
    hoveredDay,
    hoverFocus,
    clearFocus,
    disablePreviousDates
  } = props;
  const setSelectedValue = day => {
    setSelectedDates(day);
  };

  const renderWeekDays = () =>
    weekDays.map(dayName => (
      <div key={dayName} className="day-name">
        {dayName}
      </div>
    ));

  const currentMonth = () => value.format('MMMM');

  const currentYear = () => value.year();

  const renderCalendarHeader = () => (
    <div className="calendar-header">
      {currentMonth()}&nbsp;{currentYear()}
    </div>
  );

  const onKeyDown = (e, day) => {
    if (e.key === 'Enter') {
      setSelectedValue(day);
    }
  };

  const onMouseOver = (e, day) => {
    hoverFocus(e, day);
  };

  return (
    <div className="calendar-container">
      {renderCalendarHeader()}
      <div className="date-range-picker-calendar">
        <div className="week-days">{renderWeekDays()}</div>
        {calendar.map((week, weekNo) => (
          <div className="week" key={`${week}-${weekNo}`}>
            {week.map((day, dayNo) => (
              <div
                key={`week-${weekNo}-day-${dayNo}`}
                data-day={`${day.format('D')}-${day.month()}-${day.year()}`}
                onMouseOver={e => onMouseOver(e, day)}
                onMouseOut={clearFocus}
                tabIndex={getTabIndex(day, value)}
                className={getClassName(
                  day,
                  value,
                  dateRange,
                  focusedInput,
                  hoveredDay,
                  disablePreviousDates
                )}
                onClick={() => setSelectedValue(day)}
                onKeyDown={e => onKeyDown(e, day)}
              >
                {day.format('D')}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

CalendarViewer.propTypes = {
  disablePreviousDates: PropTypes.bool,
  focusedInput: PropTypes.string,
  value: PropTypes.any,
  calendar: PropTypes.array,
  dateRange: PropTypes.object,
  hoveredDay: PropTypes.any,
  hoverFocus: PropTypes.func,
  clearFocus: PropTypes.func,
  setSelectedDates: PropTypes.func,
};

CalendarViewer.defaultProps = {
  disablePreviousDates: false,
  focusedInput: '',
  value: '',
  calendar: [],
  dateRange: {},
  hoveredDay: '',
  hoverFocus: () => {},
  clearFocus: () => {},
  setSelectedDates: () => {},
};
