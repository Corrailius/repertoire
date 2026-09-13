import { useEffect, useState } from "react";

type MoveDetailsData = {
    name: string;
    power: number | null;
    accuracy: number | null;
    pp: number | null;
    priority: number;
    type: {
        name: string;
    };
    damage_class: {
        name: string;
    };
    effect_entries: {
        effect: string;
        language: {
            name: string;
        };
    }[];
};

type PokemonMoveDetailsProps = {
    url: string;
};

function PokemonMoveDetails({ url }: PokemonMoveDetailsProps) {

    const [move, setMove] = useState<MoveDetailsData | null>(null);

    useEffect(() => {

        async function loadMove() {

            const response = await fetch(url);
            const data: MoveDetailsData = await response.json();

            setMove(data);
        }

        loadMove();

    }, [url]);

    if (!move) {
        return <p>Loading move data...</p>;
    }

    const effect = move.effect_entries.find(
        (entry) => entry.language.name === "en"
    );

    return (
        <section className="move-details">

            <h2>{move.name}</h2>

            <div className="move-details-grid">

                <div>
                    <span>TYPE</span>
                    <strong>{move.type.name}</strong>
                </div>

                <div>
                    <span>CATEGORY</span>
                    <strong>{move.damage_class.name}</strong>
                </div>

                <div>
                    <span>POWER</span>
                    <strong>{move.power ?? "—"}</strong>
                </div>

                <div>
                    <span>ACCURACY</span>
                    <strong>{move.accuracy ?? "—"}</strong>
                </div>

                <div>
                    <span>PP</span>
                    <strong>{move.pp ?? "—"}</strong>
                </div>

                <div>
                    <span>PRIORITY</span>
                    <strong>{move.priority}</strong>
                </div>

            </div>

            {effect && (
                <p className="move-description">
                    {effect.effect}
                </p>
            )}

        </section>
    );
}

export default PokemonMoveDetails;