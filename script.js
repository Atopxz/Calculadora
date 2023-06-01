const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    addDigit(digit){
        if (digit === '.' && currentOperationText.innerText.includes('.')){
            return
        }
        this.currentOperation = digit
        this.updateScreen()
    }
    processOperation(operation){
        if(this.currentOperationText.innerText === "" && operation != 'C'){
            if(this.previousOperationText.innerText != ""){
                this.changeOperation(operation)
            }
            return
        }

        let operationValue
        let previous = +this.previousOperationText.innerText.split(" ")[0]
        let current = +this.currentOperationText.innerText

        switch(operation){
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "CE":
                this.processCE()
                break
            case "C":
                this.processC()
                break
            case "DEL":
                this.processDel()
                break
            case "=":
                this.processEquals()
                break
            default:
                return
        }
    }
    processEquals() {
        const operation = previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation)
    }
    processDel() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1) 
    }
    processCE() {
        this.currentOperationText.innerText = ""
    }
    processC() {
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }

    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
      ) {

        if (operationValue === null) {
          this.currentOperationText.innerText += this.currentOperation;
        } else {
          if (previous === 0) {
            operationValue = current;
          }
          this.previousOperationText.innerText = `${operationValue} ${operation}`;
          this.currentOperationText.innerText = "";
        }
      }
    changeOperation(operation){
        const mathOperations = ["+", "-", "/", "*"]
        
        if (!mathOperations.includes(operation)){
         return   
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
        console.log(value);
      calc.processOperation(value);
    }
  });
});
