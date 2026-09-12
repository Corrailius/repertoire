import type { PokemonDetails } from "../../types/PokemonDetails";

type PokemonTypesProps = {
    pokemon: PokemonDetails;
};

function PokemonTypes({ pokemon }: PokemonTypesProps) {
    return (
        <section>
            <h2>Types</h2>

            {pokemon.types.map((type) => (
                <p key={type.slot}>
                    {type.type.name}
                </p>
            ))}
        </section>
    );
}

export default PokemonTypes;