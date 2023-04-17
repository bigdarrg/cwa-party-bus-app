//This component is a time selecting widget. Upon selecting a date it will run the function passed as the property selectHandler(hourSelected, minuteSelected).

//It has the properties day and month, the TimeSelector component will show the times appropiate for this date this date in
//correspondence with the opening hours provided in config data, it will also filter out any times already booked.
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

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

//Useful functions
function formatIntToTwoDigits(number){
  let twoDigit = number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  return twoDigit;
}

//This is needed data for the time selector
//---- Hours & minutes (ALL)
const minutes = configData.SLOTS;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var currentDateTime = new Date();
var currentYear = currentDateTime.getFullYear();

//---- Read opening hours from config file
const openHours = (function() {
    function getHoursOpen(open, close){
      var openHours = [];

      for (var hourIndex = open; hourIndex <= close; hourIndex++){
        openHours.push(hourIndex);
      }

      return openHours;
    }

    var openingTimes = []

    Object.keys(configData.OPENINGTIMES).forEach(day => {
        var openClose = {
            openHour: configData.OPENINGTIMES[day].slice(0, 2),
            openMinute: configData.OPENINGTIMES[day].slice(3, 5),
            closeHour: configData.OPENINGTIMES[day].slice(6, 8),
            closeMinute: configData.OPENINGTIMES[day].slice(9, 11)
        }

        openingTimes.push(openClose);
    })

    var openHours = [];
    
    for (var dayOfTheWeekIndex = 0; dayOfTheWeekIndex < 7; dayOfTheWeekIndex++){
      var openingHour = parseInt(openingTimes[dayOfTheWeekIndex].openHour)
      var closingHour = parseInt(openingTimes[dayOfTheWeekIndex].closeHour)

      openHours.push(getHoursOpen(openingHour, closingHour))
    }

    return openHours
})();

//For generating JSX for time select
function generateAvailableTimesJSX(availableTimes, availableTimeButtonFunction){
    var JSXArray = [];

    availableTimes.forEach((time) => {JSXArray.push(
      <button onClick={() => availableTimeButtonFunction([time[0], time[1]])} className={[staticFeatures.availableTimeButton, websiteStyle.availableTimeButton].join(' ')}>
        <p>{formatIntToTwoDigits(time[0])}.{formatIntToTwoDigits(time[1])}
        {(time[0] < 12) &&
        "am"
        }
        {(time[0] >= 12) && 
        "pm"
        }
        </p>
      </button>
    )});

    return  JSXArray;
}


export default class TimeSelector extends Component {
  constructor(props) {
    super(props);

  this.state = {
    hourSelected : undefined,
    minuteSelected : undefined
  };

  this.handleTimeSelected = this.handleTimeSelected.bind(this);
  }

  getAvailableTimes(day, month, year) {
    //Calculate based on opening hours in config file
    const dateObj = new Date(
      month + " " + String(formatIntToTwoDigits(day)) + "," + year
    );

    const dayOfTheWeekIndex = ((dateObj.getDay() + 6) % 7);

    const hoursOpen = openHours[dayOfTheWeekIndex].slice(0, -1);

    var availabilityAll = [];

    hoursOpen.forEach((hour) => {
      //If date selected is today calculate based on current time 
      if((day === currentDateTime.getDate())&&(months.indexOf(month) === currentDateTime.getMonth())){
        //If hour is current hour
        if(hour === currentDateTime.getHours()){
          minutes.forEach((time) => {
            //If minute is greater than current time
            if(time > currentDateTime.getMinutes()){
              availabilityAll.push([hour, time]);
            }
          });
        //If hour is greater than current hour
        }else if(hour > currentDateTime.getHours()){ 
          minutes.forEach((time) => {
            availabilityAll.push([hour, time]);});
        }
      }else{
        minutes.forEach((time) => {
          availabilityAll.push([hour, time]);});
      }
    });

    //Exclude times already booked
    availabilityAll.forEach(time => {
      //For each booking
      this.props.bookings.forEach(booking => {
        //If date on the booking matches
        if ((formatIntToTwoDigits(day) === booking.date.slice(0, 2)) && (formatIntToTwoDigits(months.indexOf(month) + 1) === booking.date.slice(3, 5))){
          //If hour on the booking matches
          if (formatIntToTwoDigits(time[0]) === booking.time.slice(0, 2)){
            //If minute on the booking matches
            if (formatIntToTwoDigits(time[1]) === booking.time.slice(3, 5)) {
              //Remove from available times
              var indexOfTimeToRemove = (function() {
                for (var i = 0; i < availabilityAll.length; i++) { //Must use this solution as indexOf() does not support 2D arrays
                  if ((availabilityAll[i][0] === time[0]) && (availabilityAll[i][1] === time[1])){
                    return i;
                  }
                } 
              })();

              availabilityAll.splice(indexOfTimeToRemove, 1);
            }
          }
        }
      });
    });

    return availabilityAll;
  }

  handleTimeSelected(timeSelected) {
    this.setState({ 
      hourSelected: timeSelected[0],
      minuteSelected: timeSelected[1]
    });

    this.props.handleSelect(timeSelected[0], timeSelected[1])
  }

  render() {
    const daySelected = this.props.day;
    const monthSelected = this.props.month;

    return (
        <div className={staticFeatures.timeSelectContainer}>
            <div>Slot availability</div>

            <div className={staticFeatures.availableTimesContainer}>
              {generateAvailableTimesJSX(this.getAvailableTimes(daySelected, monthSelected, currentYear), this.handleTimeSelected)}
            </div>
        </div>
    );
  }
}         