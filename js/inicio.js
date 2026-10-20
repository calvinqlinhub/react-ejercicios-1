const { html, exercises, SiteHeader, SiteFooter } = ReactLab;

function App() {
    return html`
        <${React.Fragment}>
            <${SiteHeader} />
            <main className="page">
                <section className="hero">
                    <p className="eyebrow">ReactJS · Entrega 01</p>
                    <h1>Pequeñas ideas. <span>Estado real.</span></h1>
                    <p className="lead">Nueve ejercicios independientes para practicar componentes, estado, eventos, efectos y persistencia de datos con React.</p>
                    <div className="hero-stats" aria-label="Resumen del proyecto">
                        <div className="hero-stat"><strong>09</strong><span>ejercicios</span></div>
                        <div className="hero-stat"><strong>100%</strong><span>interactivos</span></div>
                        <div className="hero-stat"><strong>React</strong><span>sin compilación</span></div>
                    </div>
                </section>

                <section className="index-section" aria-labelledby="indice-title">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">Índice de prácticas</p>
                            <h2 id="indice-title">Elige un ejercicio</h2>
                        </div>
                        <p>Cada práctica vive en su propia página y mantiene la lógica React en un archivo JavaScript separado.</p>
                    </div>
                    <div className="exercise-grid">
                        ${exercises.map(([title, description], index) => {
                            const number = index + 1;
                            return html`
                                <a className="exercise-card" href=${`ejercicio-${number}.html`} data-number=${String(number).padStart(2, "0")}>
                                    <span className="card-number">${String(number).padStart(2, "0")}</span>
                                    <h3>${title}</h3>
                                    <p>${description}</p>
                                </a>
                            `;
                        })}
                    </div>
                </section>
            </main>
            <${SiteFooter} />
        </${React.Fragment}>
    `;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
