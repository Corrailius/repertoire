import { Link } from "react-router-dom";

import type { PokemonSpeciesType } from "../../types/PokemonSpecies.type";

type PokemonFormsProps = {
    species: PokemonSpeciesType;
};

function PokemonForms({ species }: PokemonFormsProps) {
    return (
        <section className="pokemon-forms">
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