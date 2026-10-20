const { html, ExercisePage } = ReactLab;
const { useMemo, useState } = React;

function App() {
    const [text, setText] = useState("");
    const metrics = useMemo(() => {
        const cleanText = text.trim();
        return {
            words: cleanText ? cleanText.split(/\s+/).length : 0,
            characters: text.replace(/\s/g, "").length
        };
    }, [text]);

    return html`
        <${ExercisePage}
            number=${8}
            title="Contador de texto"
            objective="Practicar eventos en tiempo real y cálculos derivados del estado."
            description="Los caracteres no incluyen espacios ni saltos de línea; las palabras se separan por espacios."
        >
            <div className="control-stack">
                <div className="field">
                    <label htmlFor="paragraph">Escribe un párrafo</label>
                    <textarea id="paragraph" value=${text} onInput=${event => setText(event.target.value)} placeholder="Empieza a escribir para ver las métricas..." />
                </div>
                <div className="text-metrics" aria-live="polite">
                    <div className="metric"><strong>${metrics.words}</strong><span>palabras</span></div>
                    <div className="metric"><strong>${metrics.characters}</strong><span>caracteres sin espacios</span></div>
                </div>
            </div>
        </${ExercisePage}>
    `;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
