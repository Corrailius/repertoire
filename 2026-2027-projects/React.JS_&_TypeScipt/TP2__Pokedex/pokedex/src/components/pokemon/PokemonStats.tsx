import type { PokemonDetails } from "../../types/PokemonDetails";

type PokemonStatsProps = {
    pokemon: PokemonDetails;
};

function PokemonStats({ pokemon }: PokemonStatsProps) {

    return (
        <section className="pokemon-stats">

            <h2>Base Stat Profile</h2>

            <div className="pokemon-stat-list">

                {pokemon.stats.map((stat) => {

                    const percentage =
                        (stat.base_stat / 255) * 100;

                    return (
                        <div
                            className="pokemon-stat"
                            key={stat.stat.name}
                        >

                            <div className="pokemon-stat-header">

                                <span>
                                    {stat.stat.name}
                                </span>

                                <span>
                                    {stat.base_stat}
                                </span>

                            </div>

                            <div className="pokemon-stat-bar">

                                <div
                                    className="pokemon-stat-fill"
                                    style={{
                                        width: `${percentage}%`
                                    }}
                                />

                            </div>

                            <div className="pokemon-stat-scale">
                                <span>0</span>
                                <span>255</span>
                            </div>

                        </div>
                    );
                })}

            </div>

        </section>
    );
}

export default PokemonStats;