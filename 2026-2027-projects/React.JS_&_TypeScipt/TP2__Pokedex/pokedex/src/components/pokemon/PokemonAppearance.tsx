import type { PokemonDetails } from "../../types/PokemonDetails";

type PokemonAppearanceProps = {
    pokemon: PokemonDetails;
};

function PokemonAppearance({
    pokemon,
}: PokemonAppearanceProps) {
    return (
        <section>
            <h2>Appearance</h2>

            <img
                src={
                    pokemon.sprites.other?.["official-artwork"]
                        ?.front_default ?? ""
                }
                alt={`${pokemon.name} normal`}
            />

            <img
                src={
                    pokemon.sprites.other?.["official-artwork"]
                        ?.front_shiny ?? ""
                }
                alt={`${pokemon.name} shiny`}
            />
        </section>
    );
}

export default PokemonAppearance;