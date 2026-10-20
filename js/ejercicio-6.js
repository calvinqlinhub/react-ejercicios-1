const { html, ExercisePage } = ReactLab;
const { useEffect, useRef, useState } = React;

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map(value => String(value).padStart(2, "0")).join(":");
}

function App() {
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef(null);

    function start() {
        if (intervalRef.current !== null) return;
        setRunning(true);
        intervalRef.current = window.setInterval(() => setSeconds(value => value + 1), 1000);
    }

    function pause() {
        if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setRunning(false);
    }

    function reset() {
        pause();
        setSeconds(0);
    }

    useEffect(() => () => {
        if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    }, []);

    return html`
        <${ExercisePage}
            number=${6}
            title="Temporizador"
            objective="Practicar efectos, funciones de temporización y referencias en React."
            description="Inicia el conteo, páusalo sin perder el tiempo o reinícialo por completo."
        >
            <div className="control-stack">
                <div className="result-box" aria-live="off">
                    <span className="timer-display">${formatTime(seconds)}</span>
                    <span>${running ? "Temporizador en marcha" : seconds ? "Temporizador en pausa" : "Listo para comenzar"}</span>
                </div>
                <div className="control-row">
                    <button className="button" type="button" onClick=${start} disabled=${running}>Iniciar</button>
                    <button className="button button-secondary" type="button" onClick=${pause} disabled=${!running}>Pausar</button>
                    <button className="button button-danger" type="button" onClick=${reset} disabled=${seconds === 0 && !running}>Reiniciar</button>
                </div>
            </div>
        </${ExercisePage}>
    `;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
