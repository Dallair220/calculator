function add(a,b){
    return a+b;
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
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
        default:
            return "only enter one of these operators: + - * /";
    }
}

let display = 0;
let temp = 0;
let stack = [];

const numbers = document.querySelectorAll('.numbers');
numbers.forEach(number => number.addEventListener('click', addDisplay));

function addDisplay(e){
    display === 0 ? display = e.target.textContent : display += e.target.textContent;
    document.querySelector('.display').textContent = display;
}

const operators = document.querySelectorAll('.operators');
operators.forEach(operator => operator.addEventListener('click', doOperate));

function doOperate(e){
    stack.push[temp]

}