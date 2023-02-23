// changes

function add(a,b){
    return (+a) + (+b);
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return +b !== 0 ? a / b : ('Dont you dare to divide by zero');
}

function operate(operator, a, b){
    switch(operator){
        case '+':
            return add(a,b);
        case '−':
            return subtract(a,b);
        case '×':
            return multiply(a,b);
        case '÷':
            return Math.round(divide(a,b) * Math.pow(10,11)) / Math.pow(10,11);
        default:
            return "only enter one of these operators: + - * /";
    }
}

// Global variables
let display = undefined;
let firstNumber = undefined;
let operatorVal = undefined;
let secondNumber = 0;

const numbers = document.querySelectorAll('.numbers');
numbers.forEach(number => number.addEventListener('click', addDisplay));
// Enter numbers
function addDisplay(e){
    if(secondNumber === 0){
        secondNumber = e.target.textContent;
    } else if(firstNumber === undefined || operatorVal !== undefined) {
        secondNumber += e.target.textContent;
    } else {
        clearFn();
        addDisplay(e);
    }

    display = (firstNumber === undefined) ? secondNumber : (firstNumber + operatorVal + secondNumber);
    document.querySelector('.display').textContent = display;
}

const operators = document.querySelectorAll('.operators');
operators.forEach(operator => operator.addEventListener('click', doOperate));
// Operator functionality
function doOperate(e){
    if(firstNumber === undefined && operatorVal === undefined && e.target.textContent !== '='){  
        // when an operator was clicked the first time
        firstNumber = secondNumber;
        secondNumber = 0;
        operatorVal = e.target.textContent;
        display = (firstNumber + operatorVal);
    }else if(!(firstNumber === 0) && !(firstNumber === undefined) && e.target.textContent !== '='){  
        // when an operator was clicked at least once
        firstNumber = operate(operatorVal, firstNumber, secondNumber);
        secondNumber = 0;
        operatorVal = e.target.textContent;
        display = firstNumber + e.target.textContent;
    }else{  
        // when '=' was clicked
        if(operatorVal === undefined) return;
        firstNumber = operate(operatorVal, firstNumber, secondNumber);
        secondNumber = firstNumber;
        operatorVal = undefined;
        display = firstNumber;
    }
    
    document.querySelector('.display').textContent = display;
}

const clearButton = document.querySelector('.ac');
clearButton.addEventListener('click', clearFn);
// Clear Functionality
function clearFn(e){
    display = undefined;
    firstNumber = undefined;
    operatorVal = undefined;
    secondNumber = 0;

    document.querySelector('.display').textContent = secondNumber;
}

const backspace = document.querySelector('.backspace');
backspace.addEventListener('click', rmLastDigit);
// Backspace functionality; not clean but does the job
function rmLastDigit(e){
    if(secondNumber !== 0) secondNumber = secondNumber.substring(0, secondNumber.length-1);
    if(secondNumber.length === 0) secondNumber = 0;
    (firstNumber === undefined) 
        ? document.querySelector('.display').textContent = secondNumber
        : document.querySelector('.display').textContent = firstNumber + operatorVal + secondNumber;

}


const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', addDecimal);
// Decimal functionality
function addDecimal(e){
    if(secondNumber === 0) secondNumber = "0."

    if(!secondNumber.includes(".")) secondNumber += ".";

    (firstNumber === undefined) 
        ? document.querySelector('.display').textContent = secondNumber
        : document.querySelector('.display').textContent = firstNumber + operatorVal + secondNumber;
}