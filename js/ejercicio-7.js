const { html, ExercisePage } = ReactLab;
const { useState } = React;

const groups = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "0123456789",
    "!@#$%&*+-=?"
];
const allCharacters = groups.join("");

function randomIndex(maximum) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0] % maximum;
}

function shuffle(characters) {
    const result = [...characters];
    for (let index = result.length - 1; index > 0; index -= 1) {
        const random = randomIndex(index + 1);
        [result[index], result[random]] = [result[random], result[index]];
    }
    return result.join("");
}

function buildPassword(length) {
    const required = groups.map(group => group[randomIndex(group.length)]);
    while (required.length < length) {
        required.push(allCharacters[randomIndex(allCharacters.length)]);
    }
    return shuffle(required);
}

function App() {
    const [length, setLength] = useState("12");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    function generate(event) {
        event.preventDefault();
        const numericLength = Number(length);
        setCopied(false);
        if (!Number.isInteger(numericLength) || numericLength < 4) {
            setPassword("");
            setError("La longitud debe ser un número entero mayor o igual a 4.");
            return;
        }
        if (numericLength > 64) {
            setPassword("");
            setError("Para esta práctica, el máximo es de 64 caracteres.");
            return;
        }
        setError("");
        setPassword(buildPassword(numericLength));
    }

    async function copyPassword() {
        if (!password) return;
        await navigator.clipboard.writeText(password);
        setCopied(true);
    }

    return html`
        <${ExercisePage}
            number=${7}
            title="Generador de contraseñas"
            objective="Practicar la generación de cadenas aleatorias y el uso de formularios."
            description="La contraseña incluye mayúsculas, minúsculas, números y caracteres especiales."
        >
            <div className="control-stack">
                <form className="control-row" onSubmit=${generate} noValidate=${true}>
                    <div className="field">
                        <label htmlFor="password-length">Longitud de la contraseña</label>
                        <input id="password-length" type="number" min="4" max="64" value=${length} onInput=${event => setLength(event.target.value)} />
                    </div>
                    <button className="button" type="submit">Generar contraseña</button>
                </form>
                ${error ? html`<p className="error" role="alert">${error}</p>` : null}
                <div className="result-box" aria-live="polite">
                    <span>Contraseña generada</span>
                    <strong className="password-output">${password || "—"}</strong>
                </div>
                <button className="button button-secondary" type="button" onClick=${copyPassword} disabled=${!password}>${copied ? "Copiada" : "Copiar contraseña"}</button>
            </div>
        </${ExercisePage}>
    `;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
