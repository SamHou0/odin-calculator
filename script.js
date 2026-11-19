let a = "", b = "", operator = "";
const operatorInput = document.getElementById("operator-input");
const numInput = document.getElementById("num-input");
const display = document.getElementById("display");
const equalButton = document.getElementById("equal-button");
const clearButton = document.getElementById("clear-button");
const dotButton = document.getElementById("dot-button");
const backspaceButton = document.getElementById("backspace-button");
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const operators = ["+", "-", "*", "/"];
const actions = ["=", "Enter", "Backspace"];
function updateDisplay(isRoundEnabled = false) {
    display.textContent = `${isRoundEnabled ? Math.round(a * 10000) / 10000 : a} ${operator} ${b}`;
    if (operator === "") {
        dotButton.disabled = a.includes(".");
    } else {
        dotButton.disabled = b.includes(".")
    }
}
function reset(isDisplayUpdateRequired = true) {
    a = "";
    b = "";
    operator = "";
    if (isDisplayUpdateRequired)
        updateDisplay();
}
function back() {
    if (operator === "") {
        a = a.slice(0, a.length - 1);
    } else {
        b = b.slice(0, b.length - 1);
    }
    updateDisplay();
}
function operate() {
    if (operator === "+") {
        a = add(+a, +b);
    } else if (operator === "-") {
        a = sub(+a, +b);
    } else if (operator === "*") {
        a = multiply(+a, +b);
    } else if (operator === "/") {
        if (b === "0") {
            display.textContent = "Math Error";
            reset(false);
            return;
        }
        a = divide(+a, +b);
    } else {
        return;
    }
    a = "" + a;
    b = "";
    operator = "";
    updateDisplay(true);
}
function add(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
for (const child of numInput.childNodes) {
    child.addEventListener("click", function () {
        if (operator !== "") {
            b += this.textContent;
        } else {
            a += this.textContent;
        }
        updateDisplay();
    })
}
for (const child of operatorInput.childNodes) {
    child.addEventListener("click", function () {
        if (operator !== "") {
            if (b !== "") {
                operate();
            }
            operator = this.textContent;
        }
        else if (a !== "")
            operator = this.textContent;
        updateDisplay();
    })
}

clearButton.addEventListener("click", reset)
equalButton.addEventListener("click", operate);
backspaceButton.addEventListener("click", function () {
    back();
})

document.addEventListener('keydown', function (event) {
    if (numbers.includes(event.key)) {
        if (operator !== "") {
            b += event.key;
        } else {
            a += event.key;
        }
    } else if (operators.includes(event.key)) {
        if (operator !== "") {
            if (b !== "") {
                operate();
            }
            operator = event.key;
        }
        else if (a !== "")
            operator = event.key;
    } else if (actions.includes(event.key)) {
        if (event.key === "=" || event.key === "Enter") {
            operate();
        } else {
            back();
        }
    }
    updateDisplay();
})