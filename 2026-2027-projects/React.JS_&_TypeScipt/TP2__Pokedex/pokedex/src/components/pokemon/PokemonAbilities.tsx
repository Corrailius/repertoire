import type { PokemonDetails } from "../../types/PokemonDetails";

type PokemonAbilitiesProps = {
    pokemon: PokemonDetails;
};

function PokemonAbilities({ pokemon }: PokemonAbilitiesProps) {
    return (
        <section className="pokemon-abilities">
            <h2>Abilities</h2>

            <div className="ability-list">
                {pokemon.abilities.map((ability) => (
                    <div
                        className="ability-record"
                        key={ability.ability.name}
                    >
                        <div className="ability-header">
                            <strong>
                                {ability.ability.name}
                            </strong>

                            {ability.is_hidden && (
                                <span>HIDDEN</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default PokemonAbilities;