import type { Pokemon } from "../../types/Pokemon";

type TeamSlotProps = {
    pokemon?: Pokemon;
    onRemove: (name: string) => void;
    index: number;
    onMove: (fromIndex: number, toIndex: number) => void;
};

function TeamSlot({
    pokemon,
    onRemove,
    index,
    onMove,
}: TeamSlotProps) {

    if (!pokemon) {
        return (
            <div className="team-slot">
                <span className="empty-specimen">
                    SPECIMEN
                    <br />
                    — UNASSIGNED —
                </span>
            </div>
        );
    }

    return (
        <div
            className="team-slot"
            draggable
            onDragStart={(event) => {
                event.dataTransfer.setData(
                    "text/plain",
                    index.toString()
                );
            }}
            onDragOver={(event) => {
                event.preventDefault();
            }}
            onDrop={(event) => {
                event.preventDefault();

                const fromIndex = Number(
                    event.dataTransfer.getData("text/plain")
                );

                onMove(fromIndex, index);
            }}
        >
            <p>{pokemon.name}</p>

            <button
                onClick={() => onRemove(pokemon.name)}
            >
                Remove
            </button>
        </div>
    );
}

export default TeamSlot;