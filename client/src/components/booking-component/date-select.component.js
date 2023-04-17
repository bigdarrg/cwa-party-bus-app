//This component is a date selecting widget. Upon selecting a date it will run the function passed as the property selectHandler(daySelected, monthSelected).
//The properties day (int) and month (string) will be the date the component's state will be set to by default.

//It will only be used for used for booking for the current year as no year change setting is implemented for this component.
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

//FontAwesome icons for buttons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'

//Loading configuration
import configData from '../../config/config.json';

//Loading all styling modules
import staticFeatures from "../../css-modules/static.module.css";

import cleanStyle from "../../css-modules/clean.module.css";
import modernStyle from "../../css-modules/modern.module.css";
import rusticStyle from "../../css-modules/rustic.module.css";

//Determine website styling module from the config file
const websiteStyle = (function() {
  if (configData.STYLE === "clean"){
    return cleanStyle
  }else if (configData.STYLE === "modern"){
    return modernStyle
  }else if (configData.STYLE === "rustic"){
    return rusticStyle
  }
})();

//This is needed data for the date selector
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var currentDate = new Date();

var currentYear = currentDate.getFullYear();
var currentMonthIndex = parseInt(String(currentDate.getMonth() + 1).padStart(2, '0') - 1);
var currentDay = String(currentDate.getDate()).padStart(2, '0');

//For generating JSX for date select grid.
function generateDaySelectJSX(monthIndex, dayButtonFunction) {
  var JSXforDayArray = [];

  //dayIndex is used to determine whether a button is active or not
  var dayIndex;

  if (monthIndex > currentMonthIndex){
    dayIndex = 0;
  }else if (monthIndex === currentMonthIndex){
    dayIndex = currentDay;
  }else if (monthIndex < currentMonthIndex){
    dayIndex = 32;
  }

  for (let day = 1; day < 32; day++){
    //monthIndex is used to determine whether a button is active or not
    if (daysInEachMonth[monthIndex] === 28){
      if (day >= dayIndex && day < 29){
        JSXforDayArray.push(<button key={day} onClick={() => dayButtonFunction(day)} className={[staticFeatures.dayButton, websiteStyle.dayButton].join(' ')} type="button">{day}</button>);
      }
      else{
        JSXforDayArray.push(<button key={day} disabled className={[staticFeatures.dayButton, websiteStyle.dayButton].join(' ')} type="button">{day}</button>);
      }
    }else if (daysInEachMonth[monthIndex] === 30){
      if (day >= dayIndex && day < 31){
        JSXforDayArray.push(<button key={day} onClick={() => dayButtonFunction(day)} className={[staticFeatures.dayButton, websiteStyle.dayButton].join(' ')} type="button">{day}</button>);
      }
      else{
        JSXforDayArray.push(<button key={day} disabled className={[staticFeatures.dayButton, websiteStyle.dayButton].join(' ')} type="button">{day}</button>);
      }
    }else if (daysInEachMonth[monthIndex] === 31){
      if (day >= dayIndex && day < 32){
        JSXforDayArray.push(<button key={day} onClick={() => dayButtonFunction(day)} className={[staticFeatures.dayButton, websiteStyle.dayButton].join(' ')} type="button">{day}</button>);
      }
      else{
        JSXforDayArray.push(<button key={day} disabled className={[staticFeatures.dayButton, websiteStyle.dayButton].join(' ')} type="button">{day}</button>);
      }
    }
  }

  return JSXforDayArray;
};

export default class DateSelector extends Component { 
  constructor(props) {
    super(props);

    this.state = {month: this.props.month,
                  day: this.props.day,
                  year: currentYear,
                  dayGridJSX: generateDaySelectJSX(months.indexOf(this.props.month), this.handleDayButton.bind(this))
                 };
    
    this.handleLeftArrow = this.handleLeftArrow.bind(this);
    this.handleRightArrow = this.handleRightArrow.bind(this);
    this.handleDayButton = this.handleDayButton.bind(this);
  }

  handleLeftArrow(){
    if (this.state.month === "January"){
      this.setState({
        month: months[0],
        dayGridJSX: generateDaySelectJSX(0, this.handleDayButton)
      });
    }else{
      this.setState({
        month: months[months.indexOf(this.state.month) - 1],
        dayGridJSX: generateDaySelectJSX(months.indexOf(this.state.month) - 1, this.handleDayButton)
      });
    }
  }

  handleRightArrow(){
    if (this.state.month === "December"){
      this.setState({
        month: months[0],
        dayGridJSX: generateDaySelectJSX(0, this.handleDayButton)
      });
    }else{
      this.setState({
        month: months[months.indexOf(this.state.month) + 1],
        dayGridJSX: generateDaySelectJSX(months.indexOf(this.state.month) + 1, this.handleDayButton)
      });
    }
  }

  handleDayButton(dayOnButton){
    this.setState({
      day: dayOnButton
    });

    this.props.handleSelect(dayOnButton, this.state.month);
  }

  render() {
    return (
        <div className={staticFeatures.dateSelectContainer}>
          <div className={staticFeatures.monthSelectorContainer}>
                <button onClick={this.handleLeftArrow} className={[staticFeatures.monthArrowButton, websiteStyle.monthArrowButton].join(' ')} type='button'> <FontAwesomeIcon icon={faChevronLeft} /> </button> 

                <div>
                  {this.state.month} {this.state.year}
                </div>

                <button onClick={this.handleRightArrow} className={[staticFeatures.monthArrowButton, websiteStyle.monthArrowButton].join(' ')} type='button'> <FontAwesomeIcon icon={faChevronRight} /> </button> 
            </div>

            <div className={staticFeatures.dayGrid}>
                {this.state.dayGridJSX} 
            </div> 
        </div>
    );
  }
}