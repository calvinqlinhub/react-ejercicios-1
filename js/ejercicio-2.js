const { html, ExercisePage } = ReactLab;
const { useState } = React;

function App() {
    const [clicks, setClicks] = useState(0);

    return html`
        <${ExercisePage}
            number=${2}
            title="Contador de clics"
            objective="Practicar el manejo de eventos y la actualización del estado en React."
            description="El contador se actualiza inmediatamente cada vez que pulsas el botón."
        >
            <div className="control-stack">
                <div className="result-box" aria-live="polite">
                    <span>Clics registrados</span>
                    <strong className="big-number">${clicks}</strong>
                </div>
                <div className="control-row">
                    <button className="button" type="button" onClick=${() => setClicks(value => value + 1)}>Contar clic</button>
                    <button className="button button-secondary" type="button" onClick=${() => setClicks(0)} disabled=${clicks === 0}>Reiniciar</button>
                </div>
            </div>
        </${ExercisePage}>
    `;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
