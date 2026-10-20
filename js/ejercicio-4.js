const { html, ExercisePage } = ReactLab;
const { useMemo, useState } = React;

const items = ["Perro", "Gato", "Pez", "Conejo", "Tortuga", "Canario", "Hámster", "Caballo"];

function normalize(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function App() {
    const [query, setQuery] = useState("");
    const filteredItems = useMemo(
        () => items.filter(item => normalize(item).includes(normalize(query.trim()))),
        [query]
    );

    return html`
        <${ExercisePage}
            number=${4}
            title="Filtro en tiempo real"
            objective="Practicar la actualización reactiva de una lista a partir de la entrada del usuario."
            description="La búsqueda ignora mayúsculas y acentos y reacciona mientras escribes."
        >
            <div className="control-stack">
                <div className="field">
                    <label htmlFor="search">Buscar animal</label>
                    <input id="search" type="search" value=${query} onInput=${event => setQuery(event.target.value)} placeholder="Prueba con Ga..." autoComplete="off" />
                </div>
                <p aria-live="polite">${filteredItems.length} ${filteredItems.length === 1 ? "resultado" : "resultados"}</p>
                ${filteredItems.length
                    ? html`<ul className="filter-list">${filteredItems.map(item => html`<li key=${item}>${item}</li>`)}</ul>`
                    : html`<p className="empty-state">No hay coincidencias para “${query}”.</p>`}
            </div>
        </${ExercisePage}>
    `;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
