const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');

// Logic loop for clicking on calculator keys
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType;

        // Calculate function
        const calculate = (n1, operator, n2) => {
            let result = ''

            if (operator === 'add') {
                result = parseFloat(n1) + parseFloat(n2)
            } else if (operator === 'subtract') {
                result = parseFloat(n1) - parseFloat(n2)
            } else if (operator === 'multiply') {
                result = parseFloat(n1) * parseFloat(n2)
            } else if (operator === 'divide') {
                result = parseFloat(n1) / parseFloat(n2)
            }

            return result
        }

        // Remove .is-depressed class from all keys
        Array.from(key.parentNode.children).forEach(k => 
            k.classList.remove('is-depressed'))

        // Logic for number keys
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            } else { // Appends numbers to what is already in the display
                display.textContent = displayedNum + keyContent
            }
        }

        // Logic for operator keys
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            key.classList.add('is-depressed')
            // Add custom attribute
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
        }

        // Logic for decimal key
        if (action === 'decimal') {
            display.textContent = displayedNum + '.'
        }

        // Logic for clear key
        if (action === 'clear') {
            
        }

        // Logic for equal key
        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            display.textContent = calculate(firstValue, operator, secondValue)
        }
    }
});
