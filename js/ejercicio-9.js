const { html, ExercisePage } = ReactLab;
const { useEffect, useState } = React;

const storageKey = "react-ejercicios-tareas";

function readTasks() {
    try {
        const saved = JSON.parse(localStorage.getItem(storageKey));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function App() {
    const [text, setText] = useState("");
    const [tasks, setTasks] = useState(readTasks);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
    }, [tasks]);

    function addTask(event) {
        event.preventDefault();
        const cleanText = text.trim();
        if (!cleanText) return;
        const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
        setTasks(current => [...current, { id, text: cleanText, completed: false }]);
        setText("");
    }

    function toggleTask(id) {
        setTasks(current => current.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    }

    function removeTask(id) {
        setTasks(current => current.filter(task => task.id !== id));
    }

    function clearCompleted() {
        setTasks(current => current.filter(task => !task.completed));
    }

    const completed = tasks.filter(task => task.completed).length;

    return html`
        <${ExercisePage}
            number=${9}
            title="Lista de tareas"
            objective="Practicar persistencia de datos con LocalStorage y sincronización de estado."
            description="Las tareas permanecen guardadas aunque cierres o recargues la página."
        >
            <div className="control-stack">
                <form className="control-row" onSubmit=${addTask}>
                    <div className="field">
                        <label htmlFor="new-task">Nueva tarea</label>
                        <input id="new-task" value=${text} onInput=${event => setText(event.target.value)} placeholder="Ejemplo: repasar hooks" autoComplete="off" />
                    </div>
                    <button className="button" type="submit">Añadir tarea</button>
                </form>
                <p aria-live="polite">${tasks.length} ${tasks.length === 1 ? "tarea" : "tareas"} · ${completed} completadas</p>
                ${tasks.length
                    ? html`
                        <ul className="todo-list">
                            ${tasks.map(task => html`
                                <li className=${`todo-item${task.completed ? " is-complete" : ""}`} key=${task.id}>
                                    <label>
                                        <input type="checkbox" checked=${task.completed} onChange=${() => toggleTask(task.id)} />
                                        <span>${task.text}</span>
                                    </label>
                                    <button className="icon-button" type="button" aria-label=${`Eliminar ${task.text}`} onClick=${() => removeTask(task.id)}>×</button>
                                </li>
                            `)}
                        </ul>
                    `
                    : html`<p className="empty-state">Todavía no hay tareas. Añade la primera.</p>`}
                <button className="button button-danger" type="button" onClick=${clearCompleted} disabled=${completed === 0}>Limpiar tareas completadas</button>
            </div>
        </${ExercisePage}>
    `;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
