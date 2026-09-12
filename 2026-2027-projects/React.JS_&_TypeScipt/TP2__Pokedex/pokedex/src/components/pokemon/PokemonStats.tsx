import type { PokemonDetails } from "../../types/PokemonDetails";

type PokemonStatsProps = {
    pokemon: PokemonDetails;
};

function PokemonStats({ pokemon }: PokemonStatsProps) {
    return (
        <section>
            <h2>Stats</h2>

            {pokemon.stats.map((stat) => (
                <p key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                </p>
            ))}
        </section>
    );
}

export default PokemonStats;