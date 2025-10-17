import { useState } from 'react'
import { Button } from './components/Button'
import Pantalla from './components/Pantalla'
import './App.css'

function App() {
  const [output, setOutput] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  function handleClick(text) {
    if (!isNaN(text) || text === '.') {
      // Number or decimal point
      handleNumber(text)
    } else {
      // Operator or function
      handleOperator(text)
    }
  }

  function handleNumber(num) {
    if (waitingForNewValue) {
      setOutput(String(num))
      setWaitingForNewValue(false)
    }else {
      setOutput(output === '0' ? String(num) : output + num)
    }
  }

  function handleOperator(op) {
    switch (op) {
      case 'C':
        setOutput('0')
        setPreviousValue(null)
        setOperation(null)
        setWaitingForNewValue(false)
        break
      case '⌫':
        setOutput(output.length === 1 ? '0' : output.slice(0, -1))
        break
      case '+/-':
        setOutput(String(parseFloat(output) * -1))
        break
      case '%':
        setOutput(String(parseFloat(output) / 100))
        break
      case '=':
        if (previousValue !== null && operation !== null) {
          const current = parseFloat(output)
          const previous = parseFloat(previousValue)
          let result
          switch (operation) {
            case '+': result = previous + current; break
            case '-': result = previous - current; break
            case 'x': result = previous * current; break
            case '÷': result = previous / current; break
            default: return
          }
          
          if(result === 10) {setOutput("Te amo🤍")}
          else{setOutput(String(result))}
          setPreviousValue(null)
          setOperation(null)
          setWaitingForNewValue(true)
        }
        
        break
      case '+':
      case '-':
      case 'x':
      case '÷':
        if (previousValue === null) {
          setPreviousValue(output)
        } else if (!waitingForNewValue) {
          handleOperator('=')
          setPreviousValue(output)
        }
        setOperation(op)
        setWaitingForNewValue(true)
        break
      default:
        break
    }
  }
  

  const items = [
    {id: 14, text: '⌫'},
    {id: 17, text: 'C'},
    {id: 18, text: '%'},
    {id: 19, text: '÷'},

    {id: 7, text: '7'},
    {id: 8, text: '8'},
    {id: 9, text: '9'},
    {id: 12, text: 'x'},

    {id: 4, text: '4'},
    {id: 5, text: '5'},
    {id: 6, text: '6'},
    {id: 10, text: '-'},

    {id: 1, text: '1'},
    {id: 2, text: '2'},
    {id: 3, text: '3'},
    {id: 11, text: '+'},
    
    {id: 16, text: '+/-'},
    {id: 0, text: '0'},
    {id: 15, text: '.'},
    {id: 13, text: '='}   
  ]

  return (
    <>
      <h1>Calculadora</h1>
      <Pantalla text={output}/>
      <div className='grid'>
        {items.map(item => (<Button  onClick={() => handleClick(item.text)}
                                    key={item.id} caracter={item.text}/>
                        )
          )} 
      </div>  
    </>
  )
}

export default App
