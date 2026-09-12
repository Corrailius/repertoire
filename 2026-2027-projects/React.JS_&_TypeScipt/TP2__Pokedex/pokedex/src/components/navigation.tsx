import { Link } from "react-router-dom";

function Navigation() {
    return (
        <header>
            <nav>
                <Link to="/pokedex">Pokédex</Link>
                <Link to="/team">Team Builder</Link>
            </nav>
        </header>
    );
}

export default Navigation;