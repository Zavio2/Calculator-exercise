/************************** Basic variables *******************************************/

let firstNumber;
let nextNumber;

let firstNumberSelected = false;
let nextNumberSelected = false;
let puntoIngresado = false;
let operatorValue = "";
let result = "0";

const punto = document.querySelector(".punto");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector(".display-content");
const numbers = document.querySelectorAll(".number");
const clear = document.querySelector("#clear");
const buttonDelete = document.querySelector(".b-delete");

const equals = document.querySelector("#equals");

/******************************* Functions for operations ******************************/

// Add

const add = function (first, next) {
  result = Number(first) + Number(next);
};

//Subtract

const subtract = function (first, next) {
  result = Number(first) - Number(next);
};

// Multiply

const multiply = function (first, next) {
  result = Number(first) * Number(next);
};

// Divide

const divide = function (first, next) {
  result = Number(first) / Number(next);
};

/************************* Decimales *****************************/

const addDecimal = function () {
  if (!puntoIngresado && !firstNumberSelected && firstNumber !== undefined) {
    firstNumber += punto.value;
    display.value = firstNumber;
    puntoIngresado = true;
  } else if (
    !puntoIngresado &&
    firstNumberSelected &&
    nextNumber !== undefined
  ) {
    nextNumber += punto.value;
    display.value = nextNumber;
    puntoIngresado = true;
  }
};

punto.addEventListener("click", addDecimal);

/***************************** Operators y function operate ********************************/

// *Operators

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    operatorValue = e.target.textContent;
    display.value = operatorValue;
    firstNumberSelected = true;
    puntoIngresado = false;

    if (firstNumber === undefined) {
      firstNumber = "0"
      findEquals();
    }
    if (firstNumberSelected === true && nextNumberSelected === true) {
      findEquals();
    }
  });
});

// *Operate

const operate = function (first, next) {
  if (result !== "0") {
    firstNumber = result;
  }

  if (operatorValue === "+") {
    return add(first, next);
  } else if (operatorValue === "-") {
    return subtract(first, next);
  } else if (operatorValue === "/") {
    return divide(first, next);
  } else if (operatorValue === "*") {
    return multiply(first, next);
  }
};

/******************  selecciona los operands ******************************/

const seleccionaOperands = function (event) {
  if (
    (firstNumber === undefined && !firstNumberSelected) ||
    (firstNumber === "0" && puntoIngresado === false)
  ) {
    firstNumber = event.target.textContent;
    display.value = firstNumber;

  } else if (
    (!firstNumberSelected &&
      firstNumber !== undefined &&
      firstNumber !== "0") ||
    (!firstNumberSelected && firstNumber.includes("."))
  ) {
    firstNumber += event.target.textContent;
    display.value = firstNumber;

  } else if (
    (firstNumberSelected === true && nextNumber === undefined) ||
    (nextNumber == 0 && puntoIngresado === false)
  ) {
    nextNumber = event.target.textContent;
    nextNumberSelected = true;
    display.value = nextNumber;

  } else if (
    (firstNumberSelected === true && nextNumber > 0) ||
    (firstNumberSelected === true && nextNumber.includes("."))
  ) {
    nextNumber += event.target.textContent;
    nextNumberSelected = true;
    display.value = nextNumber;

  }
};

numbers.forEach((number) => {
  number.addEventListener("click", seleccionaOperands);
});

/* ****************************** Clear ********************************* */

const clearAll = function () {
  firstNumber = undefined;
  nextNumber = undefined;
  firstNumberSelected = false;
  nextNumberSelected = false;
  puntoIngresado = false;
  display.value = 0;
  operatorValue = "";
  result = "0";
};

clear.addEventListener("click", clearAll);

/**********************Delete ***************************** */

buttonDelete.addEventListener("click", () => {
  if (
    firstNumber !== undefined &&
    !nextNumberSelected &&
    firstNumber.length !== 1
  ) {
    firstNumber = firstNumber.slice(0, -1);
    display.value = firstNumber;
  } else if (
    firstNumberSelected &&
    nextNumber !== undefined &&
    nextNumber.length !== 1
  ) {
    nextNumber = nextNumber.slice(0, -1);
    display.value = nextNumber;
  } else if (firstNumber !== undefined && firstNumber.length === 1) {
    firstNumber = undefined;
    display.value = 0;
  } else if (nextNumber !== undefined && nextNumber.length === 1) {
    nextNumber = undefined;
    display.value = 0;
  }
});

/* *******************************Equals ***********************************/

const findEquals = () => {
  if (firstNumberSelected === true && nextNumberSelected === true) {
    operate(firstNumber, nextNumber);
    display.value = result;
    nextNumberSelected = false;

    firstNumber = result;
    result = "0";
    nextNumber = undefined;
  }
};

equals.addEventListener("click", findEquals);
