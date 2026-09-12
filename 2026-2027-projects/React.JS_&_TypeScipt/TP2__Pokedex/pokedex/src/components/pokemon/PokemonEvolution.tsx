import type {
    EvolutionChain,
    EvolutionNode,
} from "../../types/EvolutionChain";

type PokemonEvolutionProps = {
    evolution: EvolutionChain;
};

function PokemonEvolution({ evolution }: PokemonEvolutionProps) {

    function renderEvolutionChain(node: EvolutionNode) {
        return (
            <div key={node.species.name}>
                <p>{node.species.name}</p>

                {node.evolves_to.map((next) => (
                    <div key={next.species.name}>
                        {next.evolution_details.map((detail, index) => (
                            <div key={index}>
                                {detail.min_level !== null && (
                                    <p>
                                        Level: {detail.min_level}
                                    </p>
                                )}

                                {detail.item && (
                                    <p>
                                        Item: {detail.item.name}
                                    </p>
                                )}

                                {detail.held_item && (
                                    <p>
                                        Held item: {detail.held_item.name}
                                    </p>
                                )}

                                {detail.min_happiness !== null && (
                                    <p>
                                        Friendship: {detail.min_happiness}
                                    </p>
                                )}

                                {detail.min_beauty !== null && (
                                    <p>
                                        Beauty: {detail.min_beauty}
                                    </p>
                                )}

                                {detail.min_affection !== null && (
                                    <p>
                                        Affection: {detail.min_affection}
                                    </p>
                                )}

                                {detail.time_of_day && (
                                    <p>
                                        Time: {detail.time_of_day}
                                    </p>
                                )}

                                {detail.known_move && (
                                    <p>
                                        Known move: {detail.known_move.name}
                                    </p>
                                )}

                                {detail.known_move_type && (
                                    <p>
                                        Known move type: {detail.known_move_type.name}
                                    </p>
                                )}

                                {detail.location && (
                                    <p>
                                        Location: {detail.location.name}
                                    </p>
                                )}

                                {detail.trigger.name && (
                                    <p>
                                        Trigger: {detail.trigger.name}
                                    </p>
                                )}
                            </div>
                        ))}

                        {renderEvolutionChain(next)}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <section>
            <h2>Evolution</h2>

            {renderEvolutionChain(evolution.chain)}
        </section>
    );
}

export default PokemonEvolution;