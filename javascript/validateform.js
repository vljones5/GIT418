/*
GIT 418:  validateform.js
Author:   Victoria Jones
Date:     11/01/2018
*/

"use strict";

//regex vars
const dateRegEx = /\d{1,2}\/\d{1,2}\/\d{4}/;
const nameRegEx = /^(?:\w[.\'\-]? ?){1,30}$/;
const adrsRegEx = /^\d+\s[A-z]+\s[A-z]+/;
const phoneRegEx = /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/;    //^(1-)?(.{3}\-)?(.{3}\-)(.{4})$/;
const emailRegEx = /^[_a-zA-Z0-9\\-]+(\.[_a-zA-Z0-9\\-]+)*@[a-zA-Z0-9\\-]+(\.[a-zA-Z0-9\\-]+)*(\.[a-z]{2,6})$/;

//global vars
let dateObject = new Date();
let dateInput = document.getElementById("servDate");
let dateCells = document.getElementsByTagName("td");
let errBackground = "#ffe6e6";
let errBorder = "#e60000";
let normBackground = "#fff";
let normBorder = "#00b2a1";

//appointment object
/*
  include: date, pet type, pet size,
  grooming package, petname, address, phonenumber,
  email
*/
let yourAppt = {};

//validate form fields in several functions below
function validateFields () {

    /*
      this prob isn't best practice (i dont know) but i'm trying
      to find a more efficient way of doing this without out writing
      it a million times.
      Please let me know your thoughts on this. I rather avoid dangerous
      things...
    */
  const validationArray = [
    validateDate, validatePetType, validatePetSize,
    validatePackage, validatePetName, validateStreetAdr,
    validatePhone, validateEmail
  ];

    //run through array and start each validation function
  for (let i=0; i<validationArray.length; i++) {
    validationArray[i]();
  }
  //run through array and check each boolean value returned from the functions
  for (let i=0; i<validationArray.length; i++) {
    if (!validationArray[i]()) {
      //if any functions return false exit this and do not carry on
      return false;
    }
  }
  //otherwise if everything is true, carry on! :)
  populateObject();
}

//validate date field
function validateDate () {
  let dateErr = document.getElementById("dateErr");
  let dateInputDirty = document.getElementById("servDate");

  //encode potentially harmful input
  let dateInputRep = encodeURIComponent(dateInputDirty.value);
  let dateInputC = dateInputRep.replace(/%2F/g, "/"); //reattach removed /

  //match date to an acceptable date format
  if (!dateRegEx.test(dateInputC)) {
    //match is false show error
    dateErr.innerHTML = "please use a valid date format (month/day/year numerical format)";
    dateErr.style.display = "block";
    dateInputDirty.style.backgroundColor = errBackground;
    dateInputDirty.style.borderColor = errBorder;
    return false;
  } else {
    //match is true, remove error if there is one
    dateErr.innerHTML = "";
    dateErr.style.display = "none";
    dateInputDirty.style.backgroundColor = normBackground;
    dateInputDirty.style.borderColor = normBorder;
    return true;
  }
}
//validate pet type field
function validatePetType () {
  let petErr = document.getElementById("petErr");
  let petType = document.getElementsByName("petType");

  //check if a pet type is selected
  if (petType[0].checked || petType[1].checked) {
    //at least one pet type is selected remove error if one
    petErr.innerHTML = "";
    petErr.style.display = "none";
    return true;
  } else {
    //if there is no radio button selected display error
    petErr.innerHTML = "select a pet type";
    petErr.style.display = "block";
    return false;
  }
}
//validate pet size field
function validatePetSize () {
  let petSErr = document.getElementById("petSErr");
  let petSize = document.getElementsByName("petSize");

  //check if any pet size is selected
  if (petSize[0].checked || petSize[1].checked || petSize[2].checked) {
    //if at least one is selected remove any error
    petSErr.innerHTML = "";
    petSErr.style.display = "none";
    return true;
  } else {
    //if none are selected display an error
    petSErr.innerHTML = "select the size of your pet";
    petSErr.style.display = "block";
    return false;
  }
}
//validate grooming package selection
function validatePackage () {
  let pckgErr = document.getElementById("pckgErr");
  let pckgMenu = document.getElementsByTagName("select")[0];

  //check an option other than default has been selected
  if (pckgMenu.selectedIndex === 0) {
    //display an error if default is still selected
    pckgErr.innerHTML = "select a grooming package";
    pckgErr.style.display = "block";
    return false;
  } else {
    //remove any error if a package has been selected
    pckgErr.innerHTML = "";
    pckgErr.style.display = "none";
    return true;
  }
}
//validate pet name input
function validatePetName () {
  let pnameErr = document.getElementById("pnameErr");
  let pnameInputDirty = document.getElementById("petName");

  //move potentially dangerous characters from input
  let pnameInputRep = pnameInputDirty.value.replace(/(\(*)(\)*)(=*)(!*)(\?*)/g, "");
  let pnameInput = encodeURI(pnameInputRep); //remove other potentially harmful input
  pnameInput = pnameInput.replace(/%20*/g, " ");  //replace all spaces that encodeURI removes

  //check if the pet name input passes the regex test
  if (!nameRegEx.test(pnameInput)) {
    //if false display error
    pnameErr.innerHTML = "please input a pet name that is no longer than 30 characters and does not use any special characters";
    pnameErr.style.display = "block";
    pnameInputDirty.style.backgroundColor = errBackground;
    pnameInputDirty.style.borderColor = errBorder;
    return false;
  } else {
    //if true remove and hide error
    pnameErr.innerHTML = "";
    pnameErr.style.display = "none";
    pnameInputDirty.style.backgroundColor = normBackground;
    pnameInputDirty.style.borderColor = normBorder;
    return true;
  }
}
//validate the street address input
function validateStreetAdr () {
  let adrErr = document.getElementById("adrErr");
  let adrInputDirty = document.getElementById("addr");

  //replace characters that encodeURI would not replace
  let adrInputRep = adrInputDirty.value.replace(/(\(*)(\)*)(=*)(!*)(\?*)/g, "");
  let adrInput = encodeURI(adrInputRep); //this will allow #
  adrInput = adrInput.replace(/%20*/g, " ");  //replace all spaces that encodeURI removes

  //test if street address input matches the regex
  if (!adrsRegEx.test(adrInput)) {
    //if false display error
    adrErr.innerHTML = "please input a valid street address following the format of: 123 street name, do not use special characters";
    adrErr.style.display = "block";
    adrInputDirty.style.backgroundColor = errBackground;
    adrInputDirty.style.borderColor = errBorder;
    return false;
  } else {
    //if true remove and hide error
    adrErr.innerHTML = "";
    adrErr.style.display = "none";
    adrInputDirty.style.backgroundColor = normBackground;
    adrInputDirty.style.borderColor = normBorder;
    return true;
  }
}
//validate phone number input
function validatePhone () {
  let phoneErr = document.getElementById("phoneErr");
  let phoneInputDirty = document.getElementById("phone");

  //remove all occurrences of spaces, ., and ()
  //assist with user inputs, reudce confusion
  let phoneInputRep = phoneInputDirty.value.replace(/( *)(\.*)(\(*)(\)*)/g, "");
  //encode any remaining harmful characters
  let phoneInput = encodeURIComponent(phoneInputRep);

  //test cleaned input
  if (!phoneRegEx.test(phoneInput)) {
    //this phone reg ex allows only numbers and dashes within a specific phone number format
    //if false display an error
    phoneErr.innerHTML = "please enter a valid phone number";
    phoneErr.style.display = "block";
    phoneInputDirty.style.backgroundColor = errBackground;
    phoneInputDirty.style.borderColor = errBorder;
    return false;
  } else {
    //if true remove and hide error
    phoneErr.innerHTML = "";
    phoneErr.style.display = "none";
    phoneInputDirty.style.backgroundColor = normBackground;
    phoneInputDirty.style.borderColor = normBorder;
    return true;
  }
}
//validate the email input
function validateEmail () {
  let emailErr = document.getElementById("emailErr");
  let emailInputDirty = document.getElementById("email");

  //remove any spaces to assit the user and cover some character encodeURI does not cover
  let emailInputRep = emailInputDirty.value.replace(/( *)?(!*)?(\?*)?(=*)?(\(*)?(\)*)?/g, "");
  //encode other characters
  let emailInput = encodeURI(emailInputRep);

  //test cleaned input
  if(!emailRegEx.test(emailInput)) {
    emailErr.innerHTML = "please enter a valid email";
    emailErr.style.display = "block";
    emailInputDirty.style.backgroundColor = errBackground;
    emailInputDirty.style.borderColor = errBorder;
    return false;
  } else {
    emailErr.innerHTML = "";
    emailErr.style.display = "none";
    emailInputDirty.style.backgroundColor = normBackground;
    emailInputDirty.style.borderColor = normBorder;
    return true;
  }
}

//after validation has passed populate the object with user input
function populateObject () {

  let dateInput = document.getElementById("servDate");
  let petType = document.getElementsByName("petType");
  let petSize = document.getElementsByName("petSize");
  let gpckg = document.getElementsByTagName("select")[0];
  let petName = document.getElementById("petName");
  let address = document.getElementById("addr");
  let phone = document.getElementById("phone");
  let email = document.getElementById("email");

  /*
  for later:
    -make changes to remove cleanup of input from
    validation and put in their own functions
    -return cleaned input from the functions to use here
  */
  //i know this is unsafe I plan to change this to the above notes later
  yourAppt["date"] = dateInput.value;
  yourAppt["grooming package"] = gpckg.options[gpckg.selectedIndex].text;
  yourAppt["pet name"] = petName.value;
  yourAppt["address"] = address.value;
  yourAppt["phone number"] = phone.value;
  yourAppt["email"] = email.value;

  //for loops to find the selected options from the radio buttons for the object
  for (let i=0; i<petSize.length; i++) {
    if (petSize[i].checked) {
      yourAppt["pet size"] = petSize[i].id;
    }
  }
  for (let i=0; i<petType.length; i++) {
    if (petType[i].checked) {
      yourAppt["pet type"] = petType[i].id;
    }
  }

  confirmationPage();
}

//display a confirmation page for user's appointment with object information
function confirmationPage () {
  let formSec = document.getElementById("scheduleForm");
  let confirmSec = document.getElementById("confirmation");
  let petNameFill = document.getElementById("yourPetHere");

  formSec.style.display = "none";
  petNameFill.innerHTML = yourAppt["pet name"];
  confirmSec.style.display = "block";
}

/*
  calendar functions (display, populate, fill field)
*/
//populate calendar
function populateCalendar (changeMonth) { //change month comes from the month navigation functions "prviousMonth" and "next month"
  let date;
  let dateToday = new Date();
  let dayOfWeek;
  let daysInMonth;
  let monthCaption;
  let month;
  let year;
  let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  //for navigating the calendar months through "previousMonth" and "Next Month"
  if (changeMonth === -1) {
    dateObject.setMonth(dateObject.getMonth() - 1); //if previous month is clicked navigate backwards and save it to the dateObject
  } else if (changeMonth === 1) {
    dateObject.setMonth(dateObject.getMonth() + 1); //if next month is clicked navigate forward in months and save it to the dateObject
  }

  //set variables with information from dateObject
  month = dateObject.getMonth();
  year = dateObject.getFullYear();
  dateObject.setDate(1); //set the day of the month to 1 for the calendar
  dayOfWeek = dateObject.getDay(); //get the value of todays day of the day of the week
  monthCaption = `${monthArray[month]} ${year}`; //set month to a value in array depending on the dateobject set month

  monthTitle.innerHTML = monthCaption; //set the month value from array to the calendar title in the html

  //set the amount of days in the month according to the selected month, also accounts for leap years
  if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
    //check for months: jan, mar, may, jul, aug, oct, dec then set the days to 31
    daysInMonth = 31;
  } else if (month === 1) {
    //if month is feb do furhter checks for leap year
    if (year % 4 === 0) {
      //learp year test, check if the year modulus 4 is equivalent to 0 (bascially check if there is a remainder when dividing)
      //if true continue the leapyear test
      if (year % 100 === 0) {
        //same as test with modulus 4 but with 100
        //if true continue the test
        if (year % 400 === 0) {
          //if true then it is a leap year!
          daysInMonth = 29;
        } else {
          //not true, not leap year
          daysInMonth = 28;
        }
      } else {
        //leap year test is true
        daysInMonth = 29;
      }
    } else {
      //leap year test is false
      daysInMonth = 28;
    }
  } else {
    //if the month is not from the list in the first check or february:
    //apr, jun, sep, Nov
    daysInMonth = 30;
  }

  //populate the calendar days for the month
  //first clear current dates and any set class names (this will run every time a month is changed as well)
  for (let i=0; i<dateCells.length; i++) {
    dateCells[i].innerHTML = "";
    dateCells[i].className = "";
  }

  //add dates to calendar STARTING with the current day of the week
  //add current day of week to days in month
  for (let i=dayOfWeek; i<daysInMonth + dayOfWeek; i++) {
    dateCells[i].innerHTML = dateObject.getDate(); //add date number to cell
    dateCells[i].className = "date";

    if (dateToday < dateObject) {
      //check both date objects, if todays date is less than the set date object then set the class to "future"
      dateCells[i].className = "future";
    }

    date = dateObject.getDate() + 1;
    dateObject.setDate(date);
  }

  dateObject.setMonth(dateObject.getMonth() - 1);

}

//call selection from eventlisener and fill in the selected date from the calendar
function dateSelection (event) {
  let selection = event.target //store the calendar selection

//if selected cell does not contain a date do not close the calendar
  if (selection.innerHTML === "") {
    calendar.style.display = "block";
    return false; //finish running through this function if there was no valid selection
  }

    dateObject.setDate(selection.innerHTML); //set the date object to selection

    let fullDateToday = new Date();
    //store todays full date
    let dateToday = Date.UTC(fullDateToday.getFullYear(), fullDateToday.getMonth(), fullDateToday.getDate());
    //store the selected full date
    let selectedDate = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());

    //check if the selected date is or before today
    if (selectedDate <= dateToday) {
      calendar.style.display = "block"; //keep calendar open for a valid day selection
      return false; //finish running this function since a valid day was not selected
    }

    //store selection into the yourGroomingAppt object as date and display in the input field
    //yourGroomingAppt.date = dateObject.toLocaleDateString(); //convert to readable string for region ex: for us it is MM/DD/YYYY
    dateInput.value = dateObject.toLocaleDateString('en-US');  //add the now readable date string to yourGroomingAppt Object
    closeCalendar();

}

//next and previous buttons on calendar
function prevMonth () {
  populateCalendar(-1);
}
function nextMonth() {
  populateCalendar(1);
}

//open calendar when field for "pick a date for service" is clicked
 function displayCalendar () {
   populateCalendar();
   calendar.style.display = "block";
 }

//close calendar when close button is hit or a date selection is made
 function closeCalendar () {
   calendar.style.display = "none";
 }

//populate appointment confirmation

//event listeners
function createEventListeners () {

  //close calendar button
  let exitCal = document.getElementById("close");
  if (exitCal.addEventListener) {
    exitCal.addEventListener("click", closeCalendar, false);
  } else if (exitCal.attachEvent) {
    exitCal.attachEvent("onclick", closeCalendar);
  }

  //open calendar button
  let dateInput = document.getElementById("servDate");
  if (dateInput.addEventListener) {
    dateInput.addEventListener("click", displayCalendar, false);
  } else if (dateInput.attachEvent) {
    dateInput.attachEvent("onclick", displayCalendar);
  }

  //next and back button for calendar
  let prevBtn = document.getElementById("prev");
  let nextBtn = document.getElementById("next");
  if (prevBtn.addEventListener) {
    prevBtn.addEventListener("click", prevMonth, false);
  } else if (prevBtn.attachEvent) {
    prevBtn.attachEvent("onclick", prevMonth);
  }
  if (nextBtn.addEventListener) {
    nextBtn.addEventListener("click", nextMonth, false);
  } else if (nextBtn.attachEvent) {
    nextBtn.attachEvent("onclick", nextMonth);
  }

  //calendar date selection
  if (dateCells[0].addEventListener) {
    for (let i=0;i<dateCells.length; i++) {
      dateCells[i].addEventListener("click", dateSelection, false);
    }
  } else if (dateCells[0].attachEvent) {
    for (let i=0; i<dateCells.length; i++) {
      dateCells[i].attachEvent("onclick", dateSelection);
    }
  }

  //book button
  let book = document.getElementById("submitBtn");
  if (book.addEventListener) {
    book.addEventListener("click", validateFields, false);
  } else if (book.attachEvent) {
    book.attachEvent("onclick", validateFields);
  }
}

//on page laod
if (window.addEventListener) {
  window.addEventListener("load", createEventListeners,false);
} else if (window.attachEvent) {
  window.attachEvent("onload", createEventListeners);
}
