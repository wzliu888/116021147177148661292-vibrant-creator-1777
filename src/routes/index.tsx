import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNumber, setWaitingForNumber] = useState(false)

  const handleNumber = (num: string) => {
    if (waitingForNumber) {
      setDisplay(num)
      setWaitingForNumber(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForNumber(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNumber(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNumber(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Simple Calculator</h1>
        
        <div className="bg-gray-900 text-white p-4 rounded mb-4 text-right text-2xl font-mono">
          {display}
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={handleClear}
            className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded"
          >
            Clear
          </button>
          <button
            onClick={() => handleOperation('÷')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded"
          >
            ÷
          </button>
          <button
            onClick={() => handleOperation('×')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded"
          >
            ×
          </button>

          <button
            onClick={() => handleNumber('7')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded"
          >
            7
          </button>
          <button
            onClick={() => handleNumber('8')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded"
          >
            8
          </button>
          <button
            onClick={() => handleNumber('9')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded"
          >
            9
          </button>
          <button
            onClick={() => handleOperation('-')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded"
          >
            -
          </button>

          <button
            onClick={() => handleNumber('4')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded"
          >
            4
          </button>
          <button
            onClick={() => handleNumber('5')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded"
          >
            5
          </button>
          <button
            onClick={() => handleNumber('6')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded"
          >
            6
          </button>
          <button
            onClick={() => handleOperation('+')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded"
          >
            +
          </button>

          <button
            onClick={() => handleNumber('1')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded"
          >
            1
          </button>
          <button
            onClick={() => handleNumber('2')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded"
          >
            2
          </button>
          <button
            onClick={() => handleNumber('3')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded"
          >
            3
          </button>
          <button
            onClick={handleEquals}
            className="row-span-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded"
          >
            =
          </button>

          <button
            onClick={() => handleNumber('0')}
            className="col-span-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded"
          >
            0
          </button>
          <button
            onClick={() => handleNumber('.')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded"
          >
            .
          </button>
        </div>
      </div>
    </div>
  )
}
