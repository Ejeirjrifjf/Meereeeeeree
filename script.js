let display = document.getElementById('display');
let current = '';
let operation = '';
let previous = '';
let resultDisplayed = false;

function updateDisplay() {
    let text = current || '0';
    if (text.length > 9) {
        display.style.fontSize = '40px';
    } else if (text.length > 7) {
        display.style.fontSize = '50px';
    } else {
        display.style.fontSize = '60px';
    }
    display.textContent = text;
}

function clear() {
    current = '';
    operation = '';
    previous = '';
    resultDisplayed = false;
}

function toggleSign() {
    if (current) {
        current = current.startsWith('-') ? current.slice(1) : '-' + current;
    }
}

function percentage() {
    if (current) {
        current = (parseFloat(current) / 100).toString();
    }
}

function operationClick(op) {
    if (current) {
        if (previous && operation) {
            calculate();
        }
        previous = current;
        current = '';
        operation = op;
        resultDisplayed = false;
    }
}

function calculate() {
    if (previous && current && operation) {
        let prevVal = parseFloat(previous);
        let currVal = parseFloat(current);
        let result;
        switch (operation) {
            case '+':
                result = prevVal + currVal;
                break;
            case '-':
                result = prevVal - currVal;
                break;
            case '×':
                result = prevVal * currVal;
                break;
            case '÷':
                result = currVal !== 0 ? prevVal / currVal : 'Error';
                break;
        }
        if (result !== 'Error') {
            result = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
        }
        current = result.toString();
        previous = '';
        operation = '';
        resultDisplayed = true;
    }
}

function decimalPoint() {
    if (resultDisplayed) {
        current = '0';
        resultDisplayed = false;
    }
    if (!current.includes('.')) {
        current = current || '0';
        current += '.';
    }
}

function numberClick(num) {
    if (resultDisplayed) {
        current = '';
        resultDisplayed = false;
    }
    if (current === '0') {
        current = num;
    } else if (current.length < 9) {
        current += num;
    }
}

// Event listeners
document.getElementById('ac').addEventListener('click', () => { clear(); updateDisplay(); });
document.getElementById('toggle').addEventListener('click', () => { toggleSign(); updateDisplay(); });
document.getElementById('percent').addEventListener('click', () => { percentage(); updateDisplay(); });
document.getElementById('divide').addEventListener('click', () => operationClick('÷'));
document.getElementById('multiply').addEventListener('click', () => operationClick('×'));
document.getElementById('subtract').addEventListener('click', () => operationClick('-'));
document.getElementById('add').addEventListener('click', () => operationClick('+'));
document.getElementById('equals').addEventListener('click', () => { calculate(); updateDisplay(); });
document.getElementById('decimal').addEventListener('click', () => { decimalPoint(); updateDisplay(); });
document.getElementById('zero').addEventListener('click', () => { numberClick('0'); updateDisplay(); });
document.getElementById('one').addEventListener('click', () => { numberClick('1'); updateDisplay(); });
document.getElementById('two').addEventListener('click', () => { numberClick('2'); updateDisplay(); });
document.getElementById('three').addEventListener('click', () => { numberClick('3'); updateDisplay(); });
document.getElementById('four').addEventListener('click', () => { numberClick('4'); updateDisplay(); });
document.getElementById('five').addEventListener('click', () => { numberClick('5'); updateDisplay(); });
document.getElementById('six').addEventListener('click', () => { numberClick('6'); updateDisplay(); });
document.getElementById('seven').addEventListener('click', () => { numberClick('7'); updateDisplay(); });
document.getElementById('eight').addEventListener('click', () => { numberClick('8'); updateDisplay(); });
document.getElementById('nine').addEventListener('click', () => { numberClick('9'); updateDisplay(); });

// Keyboard support (optional)
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') numberClick(e.key);
    else if (e.key === '.') decimalPoint();
    else if (e.key === '+') operationClick('+');
    else if (e.key === '-') operationClick('-');
    else if (e.key === '*') operationClick('×');
    else if (e.key === '/') operationClick('÷');
    else if (e.key === 'Enter' || e.key === '=') { calculate(); updateDisplay(); }
    else if (e.key === 'Escape') { clear(); updateDisplay(); }
    updateDisplay();
});