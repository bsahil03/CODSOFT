document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".btn");
    const display = document.getElementById("display");
    const calculation = document.getElementById("calculation");
    let currentInput = "";
    let operator = null;
    let previousInput = "";
    let calculationString = "";
  
    buttons.forEach(button => {
        button.addEventListener("click", handleButtonClick);
    });
  
    function handleButtonClick() {
        const value = this.getAttribute("data-value");
  
        if (value === "C") {
            resetCalculator();
            return;
        }
  
        if (value === "+/-") {
            toggleSign();
            return;
        }
  
        if (value === "%") {
            percentage();
            return;
        }
  
        if (value === "=") {
            calculateResult();
            return;
        }
  
        if (["+", "-", "*", "/"].includes(value)) {
            handleOperator(value);
            return;
        }
  
        handleNumber(value);
    }
  
    function resetCalculator() {
        currentInput = "";
        previousInput = "";
        operator = null;
        calculationString = "";
        display.textContent = "0";
        calculation.textContent = "";
    }
  
    function toggleSign() {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) * -1).toString();
            display.textContent = currentInput;
        }
    }
  
    function percentage() {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) / 100).toString();
            display.textContent = currentInput;
        }
    }
  
    function calculateResult() {
        if (currentInput && operator && previousInput) {
            calculationString += currentInput;
            currentInput = eval(calculationString).toString();
            display.textContent = currentInput;
            operator = null;
            previousInput = "";
            calculation.textContent = calculationString + " =";
            calculationString = "";
        }
    }
  
    function handleOperator(value) {
        if (currentInput) {
            if (previousInput) {
                previousInput = eval(previousInput + operator + currentInput).toString();
            } else {
                previousInput = currentInput;
            }
            currentInput = "";
            display.textContent = previousInput;
        }
        operator = value;
        calculationString = previousInput + " " + operator + " ";
        calculation.textContent = calculationString;
    }
  
    function handleNumber(value) {
        if (currentInput === "0" && value !== ".") {
            currentInput = value;
        } else {
            currentInput += value;
        }
        display.textContent = currentInput;
    }
  });
  