import { useMemo, useState } from 'react'

function computeResult(leftRaw, rightRaw, op) {
  if (leftRaw.trim() === '' || rightRaw.trim() === '') {
    return { kind: 'empty' }
  }

  const left = Number(leftRaw)
  const right = Number(rightRaw)

  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    return { kind: 'error', message: 'Please enter valid numbers.' }
  }

  if (op === '/' && right === 0) {
    return { kind: 'error', message: 'Cannot divide by zero.' }
  }

  let value
  switch (op) {
    case '+':
      value = left + right
      break
    case '-':
      value = left - right
      break
    case '*':
      value = left * right
      break
    case '/':
      value = left / right
      break
    default:
      return { kind: 'error', message: 'Unknown operator.' }
  }

  return { kind: 'ok', value }
}

export function Calculator({ onDisable }) {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [op, setOp] = useState('+')

  const result = useMemo(() => computeResult(left, right, op), [left, right, op])

  function reset() {
    setLeft('')
    setRight('')
    setOp('+')
  }

  return (
    <div className="calculator">
      <div className="calculatorHeader">
        <div>
          <h2 className="calculatorTitle">Calculator</h2>
          <p className="calculatorSubtitle">Two inputs + operator = result</p>
        </div>
        <div className="calculatorHeaderActions">
          <button className="secondary" type="button" onClick={reset}>
            Reset
          </button>
          {onDisable ? (
            <button className="secondary" type="button" onClick={onDisable}>
              Disable
            </button>
          ) : null}
        </div>
      </div>

      <div className="calculatorGrid">
        <label className="field">
          <span className="labelText">Left</span>
          <input
            className="input"
            type="number"
            inputMode="decimal"
            placeholder="e.g. 12"
            value={left}
            onChange={(e) => setLeft(e.target.value)}
          />
        </label>

        <label className="field">
          <span className="labelText">Operator</span>
          <select className="select" value={op} onChange={(e) => setOp(e.target.value)}>
            <option value="+">+</option>
            <option value="-">−</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>
        </label>

        <label className="field">
          <span className="labelText">Right</span>
          <input
            className="input"
            type="number"
            inputMode="decimal"
            placeholder="e.g. 3"
            value={right}
            onChange={(e) => setRight(e.target.value)}
          />
        </label>
      </div>

      <div className="result">
        <div className="resultLabel">Result</div>
        {result.kind === 'empty' ? (
          <div className="resultValue muted">Enter two numbers to see the result.</div>
        ) : result.kind === 'error' ? (
          <div className="resultValue error" role="alert">
            {result.message}
          </div>
        ) : (
          <div className="resultValue">{String(result.value)}</div>
        )}
      </div>
    </div>
  )
}

