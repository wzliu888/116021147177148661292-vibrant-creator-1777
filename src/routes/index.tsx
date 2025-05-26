import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: Calculator,
})

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForNewValue(true)
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
        return secondValue !== 0 ? firstValue / secondValue : 0
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const clearAll = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const Button = ({ onClick, className, children }: {
    onClick: () => void
    className?: string
    children: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-medium rounded-lg transition-colors hover:opacity-80 active:scale-95 ${className}`}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <div className="mb-4">
          <div className="bg-gray-900 text-white text-right p-4 rounded-lg text-3xl font-mono min-h-[4rem] flex items-center justify-end">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <Button
            onClick={clearAll}
            className="col-span-2 bg-red-500 text-white"
          >
            Clear
          </Button>
          <Button
            onClick={() => inputOperation('÷')}
            className="bg-blue-500 text-white"
          >
            ÷
          </Button>
          <Button
            onClick={() => inputOperation('×')}
            className="bg-blue-500 text-white"
          >
            ×
          </Button>
          
          {[7, 8, 9].map(num => (
            <Button
              key={num}
              onClick={() => inputNumber(String(num))}
              className="bg-gray-200 text-gray-800"
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => inputOperation('-')}
            className="bg-blue-500 text-white"
          >
            -
          </Button>
          
          {[4, 5, 6].map(num => (
            <Button
              key={num}
              onClick={() => inputNumber(String(num))}
              className="bg-gray-200 text-gray-800"
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => inputOperation('+')}
            className="bg-blue-500 text-white"
          >
            +
          </Button>
          
          {[1, 2, 3].map(num => (
            <Button
              key={num}
              onClick={() => inputNumber(String(num))}
              className="bg-gray-200 text-gray-800"
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={performCalculation}
            className="row-span-2 bg-green-500 text-white"
          >
            =
          </Button>
          
          <Button
            onClick={() => inputNumber('0')}
            className="col-span-2 bg-gray-200 text-gray-800"
          >
            0
          </Button>
          <Button
            onClick={() => inputNumber('.')}
            className="bg-gray-200 text-gray-800"
          >
            .
          </Button>
        </div>
      </div>
    </div>
  )
}
