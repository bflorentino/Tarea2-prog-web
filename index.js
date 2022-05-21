let rightValue = 0;
let leftValue = 0;
let wasArtOperatorPressed = false; 
let wasArtOperatorPressedLast = false; 
let operatorPressed = '';
let completedCalc = false;
const historyContainer = document.querySelector('#history-container');
const calc = document.querySelector('#calc');
const historyList = document.querySelector('#history-list');
const noOperation = document.querySelector('#no-operation');
const backOperation = document.querySelector('#back-operation');
const operationsHistory = JSON.parse(window.localStorage.getItem("History")) || [];

// Actualizar los valores del input del cálculo
const updateCalcScreen = (number) => {

    if(completedCalc){
        reset()
        completedCalc = false;
    }

    if(calc.value === '0' || wasArtOperatorPressedLast){
        calc.value = ''
        wasArtOperatorPressedLast = false;
    }

    calc.value = `${calc.value}${number}`;
    !wasArtOperatorPressed ? leftValue = parseInt(calc.value) : rightValue = parseInt(calc.value);
} 

// Las siguientes 4 funciones Asignan un signo aritmético a la operación matemática que se quiere realizar

const sum = () => {
    wasArtOperatorPressed = true;
    wasArtOperatorPressedLast = true;
    operatorPressed = "+";
    backOperation.innerHTML = `${calc.value} +`
}

const substract = () => {
    wasArtOperatorPressed = true;
    wasArtOperatorPressedLast = true;
    operatorPressed = "-";
    backOperation.innerHTML = `${calc.value} -`
}

const multiply = () => {
    wasArtOperatorPressed = true;
    wasArtOperatorPressedLast = true;
    operatorPressed = "*";
    backOperation.innerHTML = `${calc.value} *`
}

const divide = () => {
    wasArtOperatorPressed = true;
    wasArtOperatorPressedLast = true;
    operatorPressed = "/";
    backOperation.innerHTML = `${calc.value} /`;
}

const getResult = () => {
    if(checkOperation()){
        calc.value = checkOperation();
        saveInHistory();
        completedCalc = true;
        backOperation.innerHTML = '';
    }
}


// Realizar operación matemática
const checkOperation = () => {

    switch(operatorPressed){

        case '+' : return leftValue + rightValue;
        case '-' : return leftValue - rightValue; 
        case '*' : return leftValue * rightValue;
        
        case '/' : if(rightValue !== 0){
            return leftValue / rightValue
        } else{
            alert("No se puede dividir entre 0")
        } break;
        
        default : alert("No se ha seleccionado una operación a realizar"); break;
    }    
}


// Reiniciar los valores de la calculadora y el input

const resetInput = () => {
    calc.value = '0';
}

const reset = () => {
    resetInput();
    rightValue = 0;
    leftValue = 0;
    operatorPressed = '';
    wasArtOperatorPressed = false;
}


// Las siguientes funciones trabajan con el Guardado y la lectura de operaciones almacenadas en el localStorage

const saveInHistory = () => {
    operationsHistory.push(`${leftValue} ${operatorPressed} ${rightValue} = ${checkOperation()}`);
    window.localStorage.setItem("History", JSON.stringify(operationsHistory));
}

const deleteHistory = () => {
    window.localStorage.removeItem("History");
    operationsHistory.length = 0;
    setHistory();
}

const showHistory = () => {
    historyContainer.classList.add('show');
    setHistory();
}

const closeHistory = () => {
    historyContainer.classList.remove('show');
    historyList.innerHTML = ''
}

const setHistory = () => {

    noOperation.innerHTML = '';
    historyList.innerHTML = ''

    if(operationsHistory.length > 0){
        historyList.classList.add('showSection')
        noOperation.classList.remove('showSection')
        (operationsHistory.reverse().map(operation => {
            const grid = document.createElement('p');
            grid.innerHTML = operation
            historyList.appendChild(grid)
        }))
    } 
    else{
        noOperation.classList.add('showSection')
        historyList.classList.remove('showSection')
        const message = document.createElement('h3');
        message.innerHTML = "No hay ninguna operación en el historial"
        noOperation.appendChild(message)
    }
}