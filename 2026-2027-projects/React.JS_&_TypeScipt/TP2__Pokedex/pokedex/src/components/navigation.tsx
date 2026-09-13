import { Link } from "react-router-dom";
import "../style/navigation.css";

function Navigation() {
    return (
        <header className="site-header">
            <Link to="/" className="site-logo">
                <span className="logo-symbol">◉</span>

                <div>
                    <strong>POKÉDEX</strong>
                    <small>
                        Knowledge. Preservation. For every journey.
                    </small>
                </div>
            </Link>

            <nav className="site-navigation">
                <Link to="/pokedex">Pokédex</Link>
                <Link to="/team">Team</Link>
            </nav>

            <span className="system-status">
                ● System Online
            </span>
        </header>
    );
}

export default Navigation;