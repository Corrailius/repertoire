import type { PokemonDetails } from "../../types/PokemonDetails";

type PokemonMovesProps = {
    pokemon: PokemonDetails;
};

function PokemonMoves({ pokemon }: PokemonMovesProps) {
    return (
        <section>
            <h2>Moves</h2>

            <h3>Level Up</h3>

            {pokemon.moves.map((move) => {
                const levelUpMoves = move.version_group_details.filter(
                    (detail) =>
                        detail.move_learn_method.name === "level-up"
                );

                if (levelUpMoves.length === 0) return null;

                return (
                    <div key={move.move.name}>
                        <p>{move.move.name}</p>

                        {levelUpMoves.map((detail) => (
                            <p key={detail.version_group.name}>
                                Level {detail.level_learned_at}
                                {" — "}
                                {detail.version_group.name}
                            </p>
                        ))}
                    </div>
                );
            })}

            <h3>TM / Machine</h3>

            {pokemon.moves.map((move) => {
                const machine = move.version_group_details.find(
                    (detail) =>
                        detail.move_learn_method.name === "machine"
                );

                if (!machine) return null;

                return (
                    <p key={move.move.name}>
                        {move.move.name}
                    </p>
                );
            })}

            <h3>Egg</h3>

            {pokemon.moves.map((move) => {
                const egg = move.version_group_details.find(
                    (detail) =>
                        detail.move_learn_method.name === "egg"
                );

                if (!egg) return null;

                return (
                    <p key={move.move.name}>
                        {move.move.name}
                    </p>
                );
            })}

            <h3>Tutor</h3>

            {pokemon.moves.map((move) => {
                const tutor = move.version_group_details.find(
                    (detail) =>
                        detail.move_learn_method.name === "tutor"
                );

                if (!tutor) return null;

                return (
                    <p key={move.move.name}>
                        {move.move.name}
                    </p>
                );
            })}
        </section>
    );
}

export default PokemonMoves;