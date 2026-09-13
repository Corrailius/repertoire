import { Link } from "react-router-dom";

import type { PokemonSpecies } from "../../types/PokemonSpecies.type";

type PokemonFormsProps = {
    species: PokemonSpecies;
};

function PokemonForms({ species }: PokemonFormsProps) {
    return (
        <section>
            <h2>Forms</h2>

            {species.varieties.map((variety) => (
                <p key={variety.pokemon.name}>
                    <Link to={`/pokedex/${variety.pokemon.name}`}>
                        {variety.pokemon.name}
                    </Link>
                </p>
            ))}
        </section>
    );
}

export default PokemonForms;