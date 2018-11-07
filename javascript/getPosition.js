/*
  GIT 418:  getPosition.js
  Author:   Victoria Jones
  Date:     11/07/2018
*/

"use strict";

//after get position button is clicked this runs
function getPosition () {
  //remove any current information from p element
  let currentPos = document.getElementById("yourPos");
  currentPos.innerHTML = "";
  currentPos.style.display = "none";

  //test googlemaps
  mapsTest();
}

//test if googlemaps can be reached
function mapsTest () {
  if (navigator.geolocation) {
    //if google maps can be reached run displayPositions
    //if google maps cannot be reached withint 10 seconds run the requestFail
    navigator.geolocation.getCurrentPosition(displayPosition, requestFail, {timeout: 10000});
  } else {
    //unable to reach googlemaps now run requestFail to show an error
    requestFail();
  }
}

//display the position of the user
function displayPosition (position) { //position takes the geolocation object from mapsTest
  //store latitude and longitude information taken from user in the position object
  let yourLng = position.coords.longitude;
  let yourLat = position.coords.latitude;
  //display the user latitude and longitude 
  let currentPos = document.getElementById("yourPos");
  currentPos.innerHTML = "<b>You are currently located at:</b> <br /><b>Latitude:</b> " + yourLat + "<br /><b>Longitude:</b> " + yourLng;
  currentPos.style.display = "block";
}

//a failure function to tell the user something went wrong
function requestFail () {
  let currentPos = document.getElementById("yourPos");
  currentPos.innerHTML = "uh oh. <br /> We could not get your current positions at this time.";
  currentPos.style.display = "block";
}

//event listener
function createEventListener () {
  let getPosBtn = document.getElementsByClassName("getCrdBtn")[0];
  if (getPosBtn.addEventListener) {
    getPosBtn.addEventListener("click", getPosition, false);
  } else if (getPosBtn.attachEvent) {
    getPosBtn.attachEvent("onclick", getPosition);
  }
}

//on page load
if (window.addEventListener) {
  window.addEventListener("load", createEventListener, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", createEventListener);
}
