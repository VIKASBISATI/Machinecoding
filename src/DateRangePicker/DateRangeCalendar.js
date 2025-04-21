import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import calendarBuilder from './helpers';
import CalendarViewer from './calendarViewer';
import Icons from '../Icon';

export default class DateRangeCalendar extends Component {
  constructor(props) {
    super(props);
    const startDate = props.selectedDates.startDate || moment();
    this.state = {
      dateRange: this.updateMonths(startDate),
      startMonth: startDate,
      hoveredDay: '',
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.openCalendar !== this.props.openCalendar && this.props.openCalendar) {
      const startDate = this.props.selectedDates?.startDate
      this.setState({
        startMonth:  startDate || moment(),
        dateRange: this.updateMonths(startDate || moment()),
      })
    }
  }

  hoverFocus = (e, day) => {
    const { selectedDates, focusedInput } = this.props;
    if (
      focusedInput === 'endDate' &&
      !selectedDates?.endDate &&
      day.isAfter(selectedDates.startDate)
    ) {
      this.setState({
        hoveredDay: day,
      });
    }
  };

  updateMonths = startMonth => {
    const { noOfMonths } = this.props;
    const months = [];
    for (let i = 0; i < noOfMonths; i += 1) {
      months.push(calendarBuilder(startMonth.clone().add(i, 'month')));
    }
    return months;
  };

  clearHoveredDay = () => {
    this.setState({
      hoveredDay: '',
    });
  };

  buildDateRange = () => {
    const { dateRange, hoveredDay, startMonth } = this.state;
    const { selectedDates, setDates, focusedInput, disablePreviousDates } = this.props;
    return dateRange.map((calendar, i) => (
      <CalendarViewer
        key={`calendar-${i}`}
        value={startMonth.clone().add(i, 'month')}
        calendar={calendar}
        dateRange={selectedDates}
        focusedInput={focusedInput}
        setSelectedDates={day => setDates(focusedInput, day)}
        hoveredDay={hoveredDay}
        disablePreviousDates={disablePreviousDates}
        hoverFocus={this.hoverFocus}
        clearFocus={this.clearHoveredDay}
      />
    ));
  };

  navigateMonth = type => {
    const { startMonth } = this.state;
    const updatedStartMonth =
      type === 'previous'
        ? startMonth.clone().subtract(1, 'month')
        : startMonth.clone().add(1, 'month');
    const dateRange = this.updateMonths(updatedStartMonth);
    this.setState({
      startMonth: updatedStartMonth,
      dateRange,
    });
  };

  renderNavigation = () => {
    return (
      <div className="calendar-header">
        <div
          tabIndex={1}
          className="left-navigation"
          onClick={() => this.navigateMonth('previous')}
        >
          <Icons type="dropleft" interactive />
        </div>
        <div
          tabIndex={1}
          className="right-navigation"
          onClick={() => this.navigateMonth('next')}
        >
          <Icons type="dropright" interactive />
        </div>
      </div>
    );
  };
  render() {
    const { focusedInput, openCalendar, showTip } = this.props;
    return (
      <div
        className={`hw-date-range-picker ${
          openCalendar ? 'hw-date-range-picker-show' : ''
        }`}
      >
        {showTip && (
          <div
            className={`tip ${
              focusedInput === 'startDate' ? 'left-tip' : 'right-tip'
            }`}
          ></div>
        )}
        {this.buildDateRange()}
        {this.renderNavigation()}
      </div>
    );
  }
}

DateRangeCalendar.propTypes = {
  openCalendar: PropTypes.bool,
  showTip: PropTypes.bool,
  disablePreviousDates: PropTypes.bool,
  noOfMonths: PropTypes.number,
  focusedInput: PropTypes.string,
  selectedDates: PropTypes.object,
  setDates: PropTypes.func,
};

DateRangeCalendar.defaultProps = {
  openCalendar: false,
  showTip: false,
  disablePreviousDates: false,
  noOfMonths: 2,
  focusedInput: '',
  selectedDates: {},
  setDates: () => {},
};
