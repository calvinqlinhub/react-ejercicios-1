const { html, ExercisePage } = ReactLab;
const { useState } = React;

const operations = [
    ["Sumar", "+"],
    ["Restar", "−"],
    ["Multiplicar", "×"],
    ["Dividir", "÷"]
];

function App() {
    const [first, setFirst] = useState("");
    const [second, setSecond] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    function calculate(operation) {
        setError("");
        if (first.trim() === "" || second.trim() === "") {
            setResult(null);
            setError("Introduce los dos números antes de calcular.");
            return;
        }

        const a = Number(first);
        const b = Number(second);
        if (!Number.isFinite(a) || !Number.isFinite(b)) {
            setResult(null);
            setError("Los valores deben ser números válidos.");
            return;
        }
        if (operation === "÷" && b === 0) {
            setResult(null);
            setError("No es posible dividir entre cero.");
            return;
        }

        const value = operation === "+" ? a + b
            : operation === "−" ? a - b
            : operation === "×" ? a * b
            : a / b;
        setResult(Number.isInteger(value) ? value : Number(value.toFixed(6)));
    }

    return html`
        <${ExercisePage}
            number=${5}
            title="Calculadora sencilla"
            objective="Practicar formularios, validación de datos y lógica aritmética básica."
            description="Introduce dos valores y elige una de las cuatro operaciones disponibles."
        >
            <div className="control-stack">
                <div className="control-row">
                    <div className="field">
                        <label htmlFor="first-number">Primer número</label>
                        <input id="first-number" type="number" step="any" value=${first} onInput=${event => setFirst(event.target.value)} placeholder="12" />
                    </div>
                    <div className="field">
                        <label htmlFor="second-number">Segundo número</label>
                        <input id="second-number" type="number" step="any" value=${second} onInput=${event => setSecond(event.target.value)} placeholder="4" />
                    </div>
                </div>
                <div className="calculator-grid">
                    ${operations.map(([label, symbol]) => html`
                        <button className="button button-secondary" type="button" key=${symbol} onClick=${() => calculate(symbol)}>${label}</button>
                    `)}
                </div>
                ${error ? html`<p className="error" role="alert">${error}</p>` : null}
                <div className="result-box" aria-live="polite">
                    <span>Resultado</span>
                    <strong>${result === null ? "—" : result}</strong>
                </div>
            </div>
        </${ExercisePage}>
    `;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
