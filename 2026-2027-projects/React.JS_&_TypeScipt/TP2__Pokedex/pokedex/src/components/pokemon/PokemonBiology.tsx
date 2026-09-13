import type { PokemonDetails } from "../../types/PokemonDetails";
import type { PokemonSpeciesType } from "../../types/PokemonSpecies.type";

type PokemonBiologyProps = {
    pokemon: PokemonDetails;
    species: PokemonSpeciesType;
};

function PokemonBiology({
    pokemon,
    species,
}: PokemonBiologyProps) {

    return (
        <section className="pokemon-biology">

            <h2>Biology</h2>

            <div className="biology-section">

                <h3>Physical Profile</h3>

                <div className="biology-profile">

                    <div className="biology-measurement">
                        <span>Height</span>
                        <strong>
                            {(pokemon.height / 10).toFixed(1)} m
                        </strong>
                    </div>

                    <div className="biology-measurement">
                        <span>Weight</span>
                        <strong>
                            {(pokemon.weight / 10).toFixed(1)} kg
                        </strong>
                    </div>

                </div>

            </div>

            <div className="biology-section">

                <h3>Classification</h3>

                <div className="biology-classification">

                    <span className="biology-label">
                        Egg groups
                    </span>

                    <span className="biology-value">
                        {species.egg_groups
                            .map((group) => group.name)
                            .join(" · ")}
                    </span>

                </div>

            </div>

        </section>
    );
}

export default PokemonBiology;