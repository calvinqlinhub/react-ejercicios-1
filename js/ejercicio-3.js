const { html, ExercisePage } = ReactLab;
const { useState } = React;

function App() {
    const [text, setText] = useState("");
    const [items, setItems] = useState([]);

    function addItem(event) {
        event.preventDefault();
        const cleanText = text.trim();
        if (!cleanText) return;
        setItems(current => [...current, { id: `${Date.now()}-${Math.random()}`, text: cleanText }]);
        setText("");
    }

    function removeItem(id) {
        setItems(current => current.filter(item => item.id !== id));
    }

    return html`
        <${ExercisePage}
            number=${3}
            title="Lista dinámica"
            objective="Trabajar con la creación, eliminación y renderizado de colecciones."
            description="Añade tantos elementos como quieras y elimínalos de forma individual."
        >
            <div className="control-stack">
                <form className="control-row" onSubmit=${addItem}>
                    <div className="field">
                        <label htmlFor="new-item">Nuevo elemento</label>
                        <input id="new-item" value=${text} onInput=${event => setText(event.target.value)} placeholder="Escribe algo..." autoComplete="off" />
                    </div>
                    <button className="button" type="submit">Agregar</button>
                </form>
                ${items.length
                    ? html`
                        <ul className="item-list" aria-live="polite">
                            ${items.map(item => html`
                                <li key=${item.id}>
                                    <span>${item.text}</span>
                                    <button className="icon-button" type="button" aria-label=${`Eliminar ${item.text}`} onClick=${() => removeItem(item.id)}>×</button>
                                </li>
                            `)}
                        </ul>
                    `
                    : html`<p className="empty-state">La lista está vacía. Añade el primer elemento.</p>`}
            </div>
        </${ExercisePage}>
    `;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
