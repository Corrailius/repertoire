import type { PokemonSpeciesType } from "../../types/PokemonSpecies.type";

type PokemonHabitatProps = {
    species: PokemonSpeciesType;
};

function PokemonHabitat({ species }: PokemonHabitatProps) {
    const habitat = species.habitat?.name ?? "Unknown";

    return (
        <section className="pokemon-habitat">
            <h2>Habitat</h2>

            <div className="habitat-record">
                <span>PRIMARY HABITAT</span>

                <strong>
                    {habitat}
                </strong>
            </div>

            <div className="habitat-notes">
                <span>FIELD NOTES</span>

                <p>
                    This record identifies the known natural habitat
                    associated with this species.
                </p>
            </div>
        </section>
    );
}

export default PokemonHabitat;