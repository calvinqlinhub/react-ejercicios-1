(() => {
const html = htm.bind(React.createElement);

const exercises = [
    ["Cambiador de color de fondo", "Eventos y estilos dinámicos"],
    ["Contador de clics", "Estado y actualización de contenido"],
    ["Lista dinámica", "Creación y eliminación de elementos"],
    ["Filtro en tiempo real", "Búsqueda reactiva sobre una colección"],
    ["Calculadora sencilla", "Formularios, validación y operaciones"],
    ["Temporizador", "Efectos, intervalos y referencias"],
    ["Generador de contraseñas", "Cadenas aleatorias y formularios"],
    ["Contador de texto", "Métricas reactivas en tiempo real"],
    ["Lista de tareas", "Persistencia con LocalStorage"]
];

function SiteHeader({ number }) {
    return html`
        <header className="site-header">
            <div className="header-inner">
                <a className="brand" href="index.html" aria-label="Volver al índice">
                    <span className="brand-mark" aria-hidden="true">⚛</span>
                    <span>React Lab</span>
                </a>
                <span className="header-label">${number ? `Ejercicio ${String(number).padStart(2, "0")}` : "Entrega 01"}</span>
            </div>
        </header>
    `;
}

function SiteFooter() {
    return html`
        <footer className="site-footer">
            <div className="site-footer-inner">
                <p>ReactJS · Entrega de ejercicios 1</p>
                <p>9 prácticas independientes</p>
            </div>
        </footer>
    `;
}

function ExercisePage({ number, title, objective, description, children }) {
    const previous = number > 1 ? number - 1 : null;
    const next = number < exercises.length ? number + 1 : null;

    return html`
        <${React.Fragment}>
            <${SiteHeader} number=${number} />
            <main className="page">
                <div className="exercise-shell">
                    <section className="exercise-intro">
                        <p className="eyebrow">Práctica ${String(number).padStart(2, "0")} / ${String(exercises.length).padStart(2, "0")}</p>
                        <h1>${title}</h1>
                        <p className="objective-label">Objetivo</p>
                        <p className="objective">${objective}</p>
                        <nav className="exercise-nav" aria-label="Navegación entre ejercicios">
                            ${previous
                                ? html`<a href=${`ejercicio-${previous}.html`}>← Anterior</a>`
                                : html`<a href="index.html">← Índice</a>`}
                            ${next
                                ? html`<a href=${`ejercicio-${next}.html`}>Siguiente →</a>`
                                : html`<a href="index.html">Índice →</a>`}
                        </nav>
                    </section>
                    <section className="exercise-panel">
                        <div className="panel-heading">
                            <p className="eyebrow">Zona interactiva</p>
                            <h2>Pruébalo aquí</h2>
                            ${description ? html`<p>${description}</p>` : null}
                        </div>
                        ${children}
                    </section>
                </div>
            </main>
            <${SiteFooter} />
        </${React.Fragment}>
    `;
}

window.ReactLab = { html, exercises, SiteHeader, SiteFooter, ExercisePage };
})();
