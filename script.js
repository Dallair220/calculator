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
        case '-':
            return subtract(a,b);
        case '×':
        case '*':
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
    let textContentVal = e.type === 'click' ? e.target.textContent : e.key;

    if(secondNumber === 0){
        secondNumber = textContentVal;
    } else if(firstNumber === undefined || operatorVal !== undefined) {
        secondNumber += textContentVal;
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
    let textContentVal = e.type === 'click' ? e.target.textContent : e.key;

    if(firstNumber === undefined && operatorVal === undefined && textContentVal !== '=' && textContentVal !== 'Enter'){  
        // when an operator was clicked the first time
        console.log("first");

        firstNumber = secondNumber;
        secondNumber = 0;
        operatorVal = textContentVal;
        display = (firstNumber + operatorVal);
    }else if(!(firstNumber === 0) && !(firstNumber === undefined) && textContentVal !== '=' && textContentVal !== 'Enter'){  
        // when an operator was clicked at least once
        console.log("second");

        firstNumber = operate(operatorVal, firstNumber, secondNumber);
        secondNumber = 0;
        operatorVal = textContentVal;
        display = firstNumber + textContentVal;
    }else{  
        // when '=' was clicked
        console.log("third");

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


const keyboard = document.querySelector('body');
console.log(keyboard);

keyboard.addEventListener('keydown', addKeyboard);
function addKeyboard(e){
    console.log(e.key);
    switch(e.key){
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            addDisplay(e);
            break;
        case '*':
        case '/':
        case '+':
        case '-':
        case '=':
        case 'Enter':
            doOperate(e);
            break;
        case '.':
        case ',':
            addDecimal(e);
            break;
        case 'Escape':
            clearFn();
            break;
        case "Backspace":
            rmLastDigit();
            break;
    }
}

