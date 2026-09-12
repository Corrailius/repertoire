import { Link } from "react-router-dom";
import "../style/landing.css";

function LandingPage() {
    return (
        <main className="landing-room">

            <header className="landing-header">
                <div className="logo">
                    <span className="logo-symbol">◉</span>
                    <div>
                        <strong>POKÉDEX</strong>
                        <small>Knowledge. Preservation. For every journey.</small>
                    </div>
                </div>

                <nav>
                    <Link to="/pokedex">Pokédex</Link>
                    <Link to="/team">Team</Link>
                </nav>

                <span className="system-status">
                    ● System Online
                </span>
            </header>


            <section className="landing-intro">
                <p>MORE THAN A</p>
                <h1>POKÉDEX</h1>

                <span>
                    A lifetime of knowledge.<br />
                    A device built to last.<br />
                    Because some journeys<br />
                    never end.
                </span>

                <Link to="/pokedex" className="primary-button">
                    OPEN POKÉDEX →
                </Link>

                <Link to="/team" className="secondary-button">
                    VIEW TEAM →
                </Link>
            </section>


            <Link to="/pokedex" className="pokedex-device">
                <div className="device-top-light" />

                <div className="device-screen">
                    <div className="screen-time">10:24</div>
                    <div className="screen-date">12 Sept.</div>

                    <div className="pokeball">
                        <span />
                    </div>

                    <div className="device-menu">
                        <span>◉ Pokédex →</span>
                        <span>♙ Équipe →</span>
                        <span>▤ Données →</span>
                        <span>⚙ Paramètres →</span>
                    </div>
                </div>

                <div className="device-light device-light-left" />
                <div className="device-light device-light-right" />
                <div className="device-bottom-light" />
            </Link>


            <aside className="feature-panel">
                <h2>CONÇU POUR L'IMPOSSIBLE</h2>

                <p>
                    Résistance extrême, technologie avancée,
                    et une autonomie pensée pour durer.
                </p>

                <div>◈ <span>Châssis ultra-résistant</span></div>
                <div>▣ <span>Écran haute luminosité</span></div>
                <div>◉ <span>Batterie longue durée</span></div>
                <div>⌁ <span>Connectivité complète</span></div>
            </aside>


            <Link to="/team" className="field-notebook">
                <div className="notebook-cover">
                    <div className="notebook-stains" />
                    <div className="notebook-scratches" />
                    <div className="notebook-label">
                        TEAM BUILDER
                    </div>
                </div>

                <div className="notebook-pages">
                    <div />
                    <div />
                    <div />
                </div>

                <div className="notebook-bookmarks">
                    <span className="bookmark bookmark-blue" />
                    <span className="bookmark bookmark-purple" />
                    <span className="bookmark bookmark-rose" />
                    <span className="bookmark bookmark-green" />
                    <span className="bookmark bookmark-yellow" />
                </div>
            </Link>

            <footer className="landing-footer">
                <span>POKÉDEX</span>
                <span>RECHERCHE</span>
                <span>COMPAGNON</span>
                <span>TOUJOURS</span>
            </footer>

        </main>
    );
}

export default LandingPage;