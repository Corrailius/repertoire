import PokemonSelector from "../components/team/PokemonSelector";
import TeamSlot from "../components/team/TeamSlot";
import { useTeamStore } from "../store/teamStore";

function TeamPage() {
    const team = useTeamStore((state) => state.team);
    const removePokemon = useTeamStore((state) => state.removePokemon);
    const movePokemon = useTeamStore((state) => state.movePokemon);

    return (
        <div>
            <h1>Team Builder</h1>
            <PokemonSelector />

            <div>
                {Array.from({ length: 6 }).map((_, index) => (
                    <TeamSlot
                        key={index}
                        index={index}
                        pokemon={team[index]}
                        onRemove={removePokemon}
                        onMove={movePokemon}
                    />
                ))}
            </div>
        </div>
    );
}

export default TeamPage;