/*
  GIT 418:  api.js
  Author:   Victoria Jones
  Date:     11/14/2018
*/

"use strict";

//globals
let httpRequest = false;

//create a new xml request object
function getRequestObject () {
  //try catch tests if the current browser being used supports xmlhttprequest objects
  try {
    httpRequest = new XMLHttpRequest();
  } catch (requestError) {  //error if the browser does not support this
    console.log("error with httpRequest");
  }

  return httpRequest;
}

//get request
//runs on page load
function getDogPic () {
  //check if httpRequest is falsey (or empty)
  if (!httpRequest) {
    httpRequest = getRequestObject(); //if false create an xmlhttprequest object
  }

  httpRequest.abort(); //end any current request before starting a new one
  httpRequest.open("get","api.php?"); //get info from request with GET
  httpRequest.send(null); //GET used, so this is needs to be set ot null

  httpRequest.onreadystatechange = displayDogPic; //change "onreadystatechange" of the xml object to displayDogPic, when ready that function will run
}

//fill request data
function displayDogPic () {
  //test if the http request was successful with no errors
  if (httpRequest.readyState === 4 && httpRequest.status === 200) {
    let dogPicInfo = JSON.parse(httpRequest.responseText);  //if successful parse the response
    let dogPicUrl = dogPicInfo[0].url; //store picture url from response

    //create and img element and append it to the hero section
    let heroSec = document.getElementById("hero");
    let newImg = document.createElement("img");
    newImg.class = "hero";
    newImg.src = dogPicUrl;
    heroSec.appendChild(newImg);
  }
}

//event listener
if (window.addEventListener) {
  window.addEventListener("load", getDogPic, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", getDogPic);
}
