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

// console.log(add(5,5));      // 10
// console.log(subtract(5,5)); //  0
// console.log(multiply(5,5)); // 25
// console.log(divide(5,5));   //  1

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

console.log(operate('+', 10,5));