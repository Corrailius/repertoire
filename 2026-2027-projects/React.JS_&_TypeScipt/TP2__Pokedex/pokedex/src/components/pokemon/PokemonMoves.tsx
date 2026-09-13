import type { PokemonDetails } from "../../types/PokemonDetails";
import PokemonMoveDetails from "./PokemonMoveDetails";
import { useState } from "react";

type PokemonMovesProps = {
    pokemon: PokemonDetails;
};

function PokemonMoves({ pokemon }: PokemonMovesProps) {

    const [selectedMove, setSelectedMove] = useState<string | null>(null);

    const levelUpMoves = pokemon.moves.filter((move) =>
        move.version_group_details.some(
            (detail) =>
                detail.move_learn_method.name === "level-up"
        )
    );

    const machineMoves = pokemon.moves.filter((move) =>
        move.version_group_details.some(
            (detail) =>
                detail.move_learn_method.name === "machine"
        )
    );

    const eggMoves = pokemon.moves.filter((move) =>
        move.version_group_details.some(
            (detail) =>
                detail.move_learn_method.name === "egg"
        )
    );

    const tutorMoves = pokemon.moves.filter((move) =>
        move.version_group_details.some(
            (detail) =>
                detail.move_learn_method.name === "tutor"
        )
    );

    return (
        <section className="pokemon-moves">
            <h2>Moves</h2>

            {selectedMove && (
                <PokemonMoveDetails url={selectedMove} />
            )}

            <div className="move-section">
                <h3>Level Up</h3>

                <div className="move-list">
                    {levelUpMoves.map((move) => {

                        const detail =
                            move.version_group_details.find(
                                (detail) =>
                                    detail.move_learn_method.name === "level-up"
                            );

                        return (
                            <button
                                className="move-record"
                                key={move.move.name}
                                onClick={() => setSelectedMove(move.move.url)}
                            >
                                <strong>
                                    {move.move.name}
                                </strong>

                                <span>
                                    Lv. {detail?.level_learned_at}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="move-section">
                <h3>TM / Machine</h3>

                <div className="move-list">
                    {machineMoves.map((move) => (
                        <button
                            className="move-record"
                            key={move.move.name}
                            onClick={() => setSelectedMove(move.move.url)}
                        >
                            <strong>
                                {move.move.name}
                            </strong>
                        </button>
                    ))}
                </div>
            </div>

            <div className="move-section">
                <h3>Egg</h3>

                <div className="move-list">
                    {eggMoves.map((move) => (
                        <button
                            className="move-record"
                            key={move.move.name}
                            onClick={() => setSelectedMove(move.move.url)}
                        >
                            <strong>
                                {move.move.name}
                            </strong>
                        </button>
                    ))}
                </div>
            </div>

            <div className="move-section">
                <h3>Tutor</h3>

                <div className="move-list">
                    {tutorMoves.map((move) => (
                        <button
                            className="move-record"
                            key={move.move.name}
                            onClick={() => setSelectedMove(move.move.url)}
                        >
                            <strong>
                                {move.move.name}
                            </strong>
                        </button>
                    ))}
                </div>
            </div>

        </section>
    );
}

export default PokemonMoves;