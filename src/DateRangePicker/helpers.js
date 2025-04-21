const isSelected = (day, value) => value.isSame(day, 'day');

const isBefore = value => value.isBefore(new Date(), 'day');

const isBeforeStart = (monthStart, day) => day.isBefore(monthStart, 'day');

const isAfterEnd = (monthEnd, day) => day.isAfter(monthEnd, 'day');

const isToday = day => day.isSame(new Date(), 'day');

const isDisableDay = (day, value) => {
  const monthStart = value.clone().startOf('month');
  const monthEnd = value.clone().endOf('month');
  return isBeforeStart(monthStart, day) || isAfterEnd(monthEnd, day);
};

const checkRange = (day, startDate, endDate) =>
  day.isAfter(startDate) && day.isBefore(endDate);

const isPrevDate = (day, startDate) => day.isBefore(startDate);

export const getTabIndex = (day, value) => {
  if (isDisableDay(day, value)) {
    return -1;
  }
  return 1;
};

export const getClassName = (
  day,
  value,
  dateRange,
  focusedInput,
  hoveredDay,
  disablePreviousDates
) => {
  let className = 'day';
  const { startDate, endDate } = dateRange;
  if (startDate && isSelected(day, startDate)) {
    className += ' selected-start-day';
  }
  if (endDate && isSelected(day, endDate)) {
    className += ' selected-end-day';
  }
  if (hoveredDay && day.isSame(hoveredDay, 'day')) {
    className += ' hovered-day';
  }
  if (
    focusedInput === 'endDate' &&
    !endDate &&
    checkRange(day, startDate, hoveredDay)
  ) {
    className += ' in-range-day';
  }
  if (day && value && checkRange(day, startDate, endDate)) {
    className += ' in-range-day';
  }
  if (value && isBefore(value)) {
    className += ' before-today';
  }
  if (day && isToday(day)) {
    className += ' today';
  }
  if (day && value && isDisableDay(day, value)) {
    className += ' disable-day';
  }
  if(disablePreviousDates && isBefore(day)) {
    className += ' disable-previous-dates';
  }
  if (day && focusedInput === 'endDate' && isPrevDate(day, startDate)) {
    className += ' disable-previous-dates';
  }
  return className;
};

export default function calendarBuilder(value) {
  const startDay = value
    .clone()
    .startOf('month')
    .startOf('week');
  const endDay = value
    .clone()
    .endOf('month')
    .endOf('week');
  const day = startDay.clone().subtract(1, 'day');
  const calendar = [];
  while (day.isBefore(endDay, 'day')) {
    calendar.push([...Array(7)].map(() => day.add(1, 'day').clone()));
  }
  return calendar;
}
