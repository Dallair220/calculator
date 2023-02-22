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
    return a / b;
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
            return divide(a,b);
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
    console.log(secondNumber);
    if(secondNumber === 0){
        secondNumber = e.target.textContent;
    } else {
        secondNumber += e.target.textContent;
    }    

    display = (firstNumber === undefined) ? secondNumber : (firstNumber + operatorVal + secondNumber);
    document.querySelector('.display').textContent = display;
}

const operators = document.querySelectorAll('.operators');
operators.forEach(operator => operator.addEventListener('click', doOperate));
// Operator functionality
function doOperate(e){
    if(operatorVal === undefined){  // when the operator was clicked the first time
        firstNumber = secondNumber;
        secondNumber = 0;
        operatorVal = e.target.textContent;
        display = (firstNumber + operatorVal);
    }else if(e.target.textContent !== '='){ 
        firstNumber = operate(operatorVal, firstNumber, secondNumber);
        secondNumber = 0;
        operatorVal = e.target.textContent;
        display = firstNumber + e.target.textContent;
    }else{
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
