const { html, ExercisePage } = ReactLab;
const { useEffect, useState } = React;

function randomColor() {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;
}

function readableText(hex) {
    const value = hex.slice(1);
    const red = parseInt(value.slice(0, 2), 16);
    const green = parseInt(value.slice(2, 4), 16);
    const blue = parseInt(value.slice(4, 6), 16);
    return (red * 299 + green * 587 + blue * 114) / 1000 > 145 ? "#081018" : "#ffffff";
}

function App() {
    const [color, setColor] = useState("#83f5d2");

    useEffect(() => {
        document.body.style.background = color;
        return () => {
            document.body.style.background = "";
        };
    }, [color]);

    return html`
        <${ExercisePage}
            number=${1}
            title="Cambiador de color"
            objective="Practicar eventos en React y la actualización dinámica de estilos."
            description="Cada clic genera un color hexadecimal nuevo y actualiza el fondo de la página."
        >
            <div className="control-stack">
                <div className="color-stage" style=${{ backgroundColor: color, color: readableText(color) }}>
                    <div>
                        <span>Color actual</span>
                        <strong className="color-code">${color.toUpperCase()}</strong>
                    </div>
                </div>
                <button className="button" type="button" onClick=${() => setColor(randomColor())}>Cambiar color</button>
            </div>
        </${ExercisePage}>
    `;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
