let currentExpression = "";
let currentResult = "0";
let history = [];

function updateDisplay() {
  document.getElementById("expression").textContent = currentExpression;
  document.getElementById("result").textContent = currentResult;
}

function appendNumber(number) {
  if (currentResult === "0" || currentResult === "Error") {
    currentResult = number;
  } else {
    currentResult += number;
  }
  updateDisplay();
}

function appendOperator(operator) {
  if (currentResult !== "Error") {
    currentExpression = currentResult + " " + operator + " ";
    currentResult = "0";
    updateDisplay();
  }
}

function appendDecimal() {
  if (!currentResult.includes(".") && currentResult !== "Error") {
    currentResult += ".";
    updateDisplay();
  }
}

function clearDisplay() {
  currentExpression = "";
  currentResult = "0";
  updateDisplay();
}

function backspace() {
  if (currentResult !== "Error" && currentResult !== "0") {
    currentResult = currentResult.slice(0, -1);
    if (currentResult === "") {
      currentResult = "0";
    }
    updateDisplay();
  }
}

function calculate() {
  if (currentExpression && currentResult !== "Error") {
    const fullExpression = currentExpression + currentResult;
    try {
      // Validasi pembagian dengan nol
      if (fullExpression.includes("/ 0")) {
        throw new Error("Tidak bisa membagi dengan nol");
      }

      const result = eval(fullExpression);

      // Menambahkan ke histori
      addToHistory(fullExpression + " = " + result);

      currentExpression = "";
      currentResult = result.toString();
    } catch (error) {
      currentResult = "Error";
    }
    updateDisplay();
  }
}

function addToHistory(calculation) {
  history.unshift(calculation);
  if (history.length > 5) {
    history.pop();
  }
  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";
  history.forEach((calc) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.textContent = calc;
    historyList.appendChild(li);
  });
}
