import { useState } from 'react'
import './App.css'
import { Calculator } from './components/Calculator.jsx'

function App() {
  const [enabled, setEnabled] = useState(false)
  const [calculatorInstance, setCalculatorInstance] = useState(0)

  function enableCalculator() {
    setEnabled(true)
  }

  function disableCalculator() {
    setEnabled(false)
    setCalculatorInstance((n) => n + 1)
  }

  return (
    <div className="page">
      <header className="hero">
        <h1 className="title">React Experiments</h1>
        <p className="subtitle">
          Click the button below to unlock a simple calculator.
        </p>
      </header>

      {!enabled ? (
        <section className="card">
          <button className="primary" onClick={enableCalculator}>
            Enable calculator
          </button>
          <p className="hint">
            This is a small React exercise: clicking the button updates state and
            conditionally renders the calculator component.
          </p>
        </section>
      ) : (
        <section className="card">
          <Calculator key={calculatorInstance} onDisable={disableCalculator} />
        </section>
      )}
    </div>
  )
}

export default App
