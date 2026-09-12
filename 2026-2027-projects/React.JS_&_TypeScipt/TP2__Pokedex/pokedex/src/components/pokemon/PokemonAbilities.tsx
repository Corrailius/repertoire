import type { PokemonDetails } from "../../types/PokemonDetails";

type PokemonAbilitiesProps = {
    pokemon: PokemonDetails;
};

function PokemonAbilities({ pokemon }: PokemonAbilitiesProps) {
    return (
        <section>
            <h2>Abilities</h2>

            {pokemon.abilities.map((ability) => (
                <p key={ability.ability.name}>
                    {ability.ability.name}
                    {ability.is_hidden ? " (Hidden)" : ""}
                </p>
            ))}
        </section>
    );
}

export default PokemonAbilities;