"use strict";

console.log("This Works");

const buttons = document.querySelectorAll(".timer__button");
const form = document.querySelector("form");
const countdown = document.querySelector(".time__left");
const backBy = document.querySelector(".time__end");

const intervals = [];

function displayTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  countdown.textContent = `${minutes}:${seconds.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`;
}

function beBack(time) {
  const date = new Date();
  const backTime = new Date(date.getTime() + time * 1000);
  backBy.textContent = `Be back by ${backTime.getHours()}:${backTime
    .getMinutes()
    .toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
}

function setTime(time = this) {
  intervals.forEach(clearInterval);

  let i = time.target ? time.target.dataset.time : time * 60;
  displayTime(i);

  const timer = function () {
    if (i >= 0) {
      displayTime(i);
      i--;
    } else {
      clearInterval(interval);
    }
  };
  const interval = setInterval(timer, 1000);
  intervals.push(interval);
  beBack(i);
}

function formInput(e) {
  e.preventDefault();
  // console.log("e", e.target[0].value);
  setTime(e.target[0].value);
}

function checkDigit(e) {
  // console.log("here", e.keyCode);
  const keyCode = e.keyCode;
  if (keyCode > 64 && keyCode < 92) {
    alert("Please enter only digits!!!");
    form.querySelector("input").value = "";
  }
}

buttons.forEach((button) => button.addEventListener("click", setTime));
form.addEventListener("keyup", checkDigit);
form.addEventListener("submit", formInput);
