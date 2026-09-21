import { Link } from "react-router-dom";

import type { Pokemon } from "../types/Pokemon";

type PokemonCardProps = {
    pokemon: Pokemon;
};

function PokemonCard({ pokemon }: PokemonCardProps) {

    return (

        <Link
            to={`/pokedex/${pokemon.slug}`}
            className="pokemon-card-link"
        >

            <article className="pokemon-card">

                <span className="pokemon-card-number">
                    #{pokemon.dexNumber.toString().padStart(3, "0")}
                </span>

                <div className="pokemon-card-artwork">

                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.dexNumber}.png`}
                        alt={pokemon.name}
                    />

                </div>

                <div className="pokemon-card-info">

                    <p className="pokemon-card-name">
                        {pokemon.name}
                    </p>

                    <p className="pokemon-card-type">
                        SPECIMEN
                    </p>

                </div>

            </article>

        </Link>

    );
}

export default PokemonCard;