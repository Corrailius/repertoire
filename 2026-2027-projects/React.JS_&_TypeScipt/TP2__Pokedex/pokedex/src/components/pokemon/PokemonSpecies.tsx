import type { PokemonDetails } from "../../types/PokemonDetails";
import type { PokemonSpeciesType as PokemonSpeciesData } from "../../types/PokemonSpecies.type";

type PokemonSpeciesProps = {
    pokemon: PokemonDetails;
    species: PokemonSpeciesData;
};

function PokemonSpecies({
    pokemon,
    species,
}: PokemonSpeciesProps) {

    const genus =
        species.genera.find(
            (entry) => entry.language.name === "en"
        )?.genus ?? "Unknown";

    const description =
        species.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
        )?.flavor_text ?? "No description available.";

    return (
        <section className="pokemon-species">

            <h2>Species</h2>

            <div className="species-classification">
                <span>CLASSIFICATION</span>
                <strong>{genus}</strong>
            </div>

            <div className="species-profile">

                <div className="species-data">
                    <span>TYPE</span>

                    <strong>
                        {pokemon.types
                            .map((type) => type.type.name)
                            .join(" / ")}
                    </strong>
                </div>

                <div className="species-data">
                    <span>BASE EXPERIENCE</span>

                    <strong>
                        {pokemon.base_experience}
                    </strong>
                </div>

                <div className="species-data">
                    <span>CAPTURE RATE</span>

                    <strong>
                        {species.capture_rate}
                    </strong>
                </div>

            </div>

            <div className="species-description">

                <span>FIELD NOTES</span>

                <p>{description}</p>

            </div>

        </section>
    );
}

export default PokemonSpecies;