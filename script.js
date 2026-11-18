let a = "", b = "", operator = "";
const operatorInput = document.getElementById("operator-input");
const numInput = document.getElementById("num-input");
const display = document.getElementById("display");
const equalButton = document.getElementById("equal-button");
const clearButton = document.getElementById("clear-button");
function updateDisplay() {
    display.textContent = `${Math.round(a * 10000) / 10000} ${operator} ${b}`;
}
function reset(isDisplayUpdateRequired = true) {
    a = "";
    b = "";
    operator = "";
    if (isDisplayUpdateRequired)
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
    b = "";
    operator = "";
    updateDisplay();
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