import type {
    EvolutionChain,
    EvolutionNode,
} from "../../types/EvolutionChain";

type PokemonEvolutionProps = {
    evolution: EvolutionChain;
};

function PokemonEvolution({ evolution }: PokemonEvolutionProps) {

    function getEvolutionCondition(node: EvolutionNode) {
        const detail = node.evolution_details[0];

        if (!detail) {
            return "—";
        }

        if (detail.min_level !== null) {
            return `Level ${detail.min_level}`;
        }

        if (detail.item) {
            return detail.item.name;
        }

        if (detail.held_item) {
            return `Hold ${detail.held_item.name}`;
        }

        if (detail.min_happiness !== null) {
            return `Friendship ${detail.min_happiness}`;
        }

        if (detail.min_beauty !== null) {
            return `Beauty ${detail.min_beauty}`;
        }

        if (detail.min_affection !== null) {
            return `Affection ${detail.min_affection}`;
        }

        if (detail.time_of_day) {
            return detail.time_of_day;
        }

        if (detail.known_move) {
            return `Know ${detail.known_move.name}`;
        }

        if (detail.known_move_type) {
            return `Know ${detail.known_move_type.name}`;
        }

        if (detail.location) {
            return detail.location.name;
        }

        return detail.trigger.name;
    }

    function renderEvolutionChain(node: EvolutionNode) {
        return (
            <div className="evolution-node" key={node.species.name}>

                <div className="evolution-species">
                    <strong>{node.species.name}</strong>
                </div>

                {node.evolves_to.map((next) => (
                    <div
                        className="evolution-branch"
                        key={next.species.name}
                    >
                        <div className="evolution-condition">
                            {getEvolutionCondition(next)}
                        </div>

                        <div className="evolution-arrow">
                            ↓
                        </div>

                        {renderEvolutionChain(next)}
                    </div>
                ))}

            </div>
        );
    }

    return (
        <section className="pokemon-evolution">

            <h2>Evolution</h2>

            <div className="evolution-chain">
                {renderEvolutionChain(evolution.chain)}
            </div>

        </section>
    );
}

export default PokemonEvolution;