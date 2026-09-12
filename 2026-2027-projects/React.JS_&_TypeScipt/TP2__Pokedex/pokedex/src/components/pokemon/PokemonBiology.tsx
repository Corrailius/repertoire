import type { PokemonDetails } from "../../types/PokemonDetails";
import type { PokemonSpecies } from "../../types/PokemonSpecies";

type PokemonBiologyProps = {
    pokemon: PokemonDetails;
    species: PokemonSpecies;
};

function PokemonBiology({
    pokemon,
    species,
}: PokemonBiologyProps) {
    return (
        <section>
            <h2>Biology</h2>

            <p>Height: {pokemon.height}</p>

            <p>Weight: {pokemon.weight}</p>

            <p>
                Egg groups:{" "}
                {species.egg_groups
                    .map((group) => group.name)
                    .join(", ")}
            </p>
        </section>
    );
}

export default PokemonBiology;