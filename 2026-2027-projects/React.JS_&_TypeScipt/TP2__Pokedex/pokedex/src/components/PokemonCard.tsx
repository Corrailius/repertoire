import { Link } from "react-router-dom";
import type { Pokemon } from "../types/Pokemon";

type PokemonCardProps = {
    pokemon: Pokemon
};

function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <Link to={`/pokedex/${pokemon.slug}`}>
            <div className="flex flex-col items-center gap-2 bg-white p-3">
                <p>#{pokemon.dexNumber}</p>
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.dexNumber}.png`}
                    alt={pokemon.name}
                    className="w-full"
                />
                <p>{pokemon.name}</p>
            </div>
        </Link>
    )
}

export default PokemonCard;