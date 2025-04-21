import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import DateRangeCalendar from './dateRangeCalendar';
import { formatDate } from '../CommonFunction';

export default class NewDateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = null;
    this.state = {
      openCalendar: false,
      focusedInput: 'startDate',
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    const { openCalendar } = this.state;
    if (
      openCalendar
      && this.wrapperRef
      && !this.wrapperRef.contains(e.target)
    ) {
      this.setState({
        openCalendar: false,
      });
    }
  };

  setDates = (type, value) => {
    const { startDate, endDate, onChange } = this.props;
    if (type === 'startDate') {
      this.setState({
        focusedInput: 'endDate',
      });
      if (value.isAfter(endDate)) {
        onChange(value, '');
      } else {
        onChange(value, endDate);
      }
    } else {
      onChange(startDate, value);
      this.setState({
        focusedInput: 'startDate',
        openCalendar: false,
      });
    }
  };

  showCalendar = () => {
    this.setState({
      openCalendar: !this.state.openCalendar,
    });
  };

  handleIconClick = () => {
    const {
      onChange, startDate, endDate, isClearable,
    } = this.props;
    if (isClearable && startDate && endDate) {
      onChange('', '');
    } else {
      this.showCalendar();
    }
  };

  handleInputClick = (type) => {
    this.setState({
      focusedInput: type,
      openCalendar: !this.state.openCalendar,
    });
  };

  renderSingleInputPicker = () => {
    const {
      startDate,
      endDate,
      format,
      isClearable,
      inputProps,
      shimmer,
      labelShimmerClassName,
      placeholderShimmerClassName,
      labelIcon,
      labelIconText,
      labelIconTooltipPlacement
    } = this.props;
    const value =
      startDate && endDate
        ? `${formatDate(startDate, format)} - ${formatDate(endDate, format)}`
        : '';
    return (
      <div className=" margin-b-10">
        <TextInput
          {...inputProps}
          type="text"
          readOnly
          clearMargin
          iconType="calendar"
          isClearable={isClearable}
          value={value}
          onClick={this.showCalendar}
          onIconClick={this.handleIconClick}
          shimmer={shimmer}
          labelShimmerClassName={labelShimmerClassName}
          placeholderShimmerClassName={placeholderShimmerClassName}
          labelIcon={labelIcon}
          labelIconText={labelIconText}
          labelIconTooltipPlacement={labelIconTooltipPlacement}
        />
      </div>
    );
  };

  renderRangeInputPicker = () => {
    const {
      startDate,
      endDate,
      fromInputProps,
      toInputProps,
      format,
      shimmer, 
      labelShimmerClassName, 
      placeholderShimmerClassName,
      labelIcon,
      labelIconText,
      labelIconTooltipPlacement
    } = this.props;
    const startValue = startDate ? formatDate(startDate, format) : '';
    const endValue = endDate ? formatDate(endDate, format) : '';
    return (
      <div className="d-flex full-width">
        <div className="margin-r-20 full-width">
          <TextInput
            {...fromInputProps}
            iconType="calendar"
            onIconClick={() => this.handleInputClick('startDate')}
            onClick={() => this.handleInputClick('startDate')}
            value={startValue}
            shimmer={shimmer}
            labelShimmerClassName={labelShimmerClassName}
            placeholderShimmerClassName={placeholderShimmerClassName}
            labelIcon={labelIcon}
            labelIconText={labelIconText}
            labelIconTooltipPlacement={labelIconTooltipPlacement}
          />
        </div>
        <div className="full-width">
          <TextInput
            {...toInputProps}
            iconType="calendar"
            onIconClick={() => this.handleInputClick('endDate')}
            onClick={() => this.handleInputClick('endDate')}
            value={endValue}
            shimmer={shimmer}
            labelShimmerClassName={labelShimmerClassName}
            placeholderShimmerClassName={placeholderShimmerClassName}
            labelIcon={labelIcon}
            labelIconText={labelIconText}
            labelIconTooltipPlacement={labelIconTooltipPlacement}
          />
        </div>
      </div>
    );
  };

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  render() {
    const {
      startDate, endDate, noOfMonths, singleInput, showTip, disablePreviousDates, shimmer,
    } = this.props;
    const { focusedInput, openCalendar } = this.state;
    return (
      <div className="pos-relative" ref={this.setWrapperRef}>
        {singleInput
          ? this.renderSingleInputPicker()
          : this.renderRangeInputPicker()}
        {!shimmer
        && (
        <div className="pos-absolute">
          <DateRangeCalendar
            noOfMonths={noOfMonths}
            selectedDates={{ startDate, endDate }}
            setDates={this.setDates}
            focusedInput={focusedInput}
            openCalendar={openCalendar}
            showTip={showTip}
            disablePreviousDates={disablePreviousDates}
          />
        </div>
        )}
      </div>
    );
  }
}

NewDateRangePicker.propTypes = {
  // Starting date of the Date Range ideally of type moment
  startDate: PropTypes.any,
  // Ending date of the Date Range ideally of type moment
  endDate: PropTypes.any,
  // singleInput prop used for showing one input for both start and end date range
  singleInput: PropTypes.bool,
  // showTip prop used for showing the tip to be visible on the top of date range or not
  showTip: PropTypes.bool,
  // Used for disabling previous dates with respect to today
  disablePreviousDates: PropTypes.bool,
  // format prop is used for showing in which format the startDates and endDates should be show(DD MMM YYYY or DD/MM/YYYY) etc.
  format: PropTypes.string,
  // noOfMonths prop is used to render the specified number of months on to the DateRangePicker UI
  noOfMonths: PropTypes.number,
  // fromInputProps is used in case of double input picker(!singleInput) props which goes to "From Date" TextInput
  fromInputProps: PropTypes.object,
  // toInputProps is used in case of double input picker(!singleInput) which goes to "To date" TextInput
  toInputProps: PropTypes.object,
  // toInputProps is used in case of singleInput which goes to to date TextInput
  inputProps: PropTypes.object,
  // onChange is used as handler function while changing the start and end dates
  onChange: PropTypes.func,
  /** This should be used when shimmer is required in place of label and placeholder */
  shimmer: PropTypes.bool,
  /**  This should be used to style label shimmer */
  labelShimmerClassName: PropTypes.string,
  /**  This should be used to style placeholder shimmer */
  placeholderShimmerClassName: PropTypes.string,
  labelIcon: PropTypes.string,
  /** Shows tooltip text on hover of info icon */
  labelIconText: PropTypes.string,
  /** This is for placement of tooltip on hover of info icon */
  labelIconTooltipPlacement: PropTypes.string
};

NewDateRangePicker.defaultProps = {
  startDate: '',
  endDate: '',
  singleInput: false,
  showTip: false,
  disablePreviousDates: false,
  format: 'DD MMM YYYY',
  noOfMonths: 2,
  fromInputProps: {},
  toInputProps: {},
  inputProps: {},
  onChange: () => {},
  shimmer: false, // to be used when shimmer is required in place of label and placeholder
  labelShimmerClassName: '', // to style label shimmer
  placeholderShimmerClassName: '', // to style placeholder shimmer
  labelIcon: '',
  labelIconText: '',
  labelIconTooltipPlacement: "hw-bottom-left"
};
