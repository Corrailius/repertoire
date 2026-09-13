import "../style/landing.css";
import "../style/teambuilder.css";

import TeamSlot from "../components/team/TeamSlot";
import PokemonSelector from "../components/team/PokemonSelector";
import { useTeamStore } from "../store/teamStore";

function TeamBuilderPage() {
    const team = useTeamStore((state) => state.team);

    const removePokemon = useTeamStore(
        (state) => state.removePokemon
    );

    const movePokemon = useTeamStore(
        (state) => state.movePokemon
    );

    return (
        <main className="team-builder">
            <div className="research-sheet">

                <header className="research-header">
                    <span>
                        FIELD RESEARCH — TEAM RECORD
                    </span>

                    <span>
                        OBSERVATION LOG // 117
                    </span>
                </header>


                <section className="team-section">
                    <h1>Current Team</h1>

                    <div className="team-grid">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <TeamSlot
                                key={index}
                                pokemon={team[index]}
                                index={index}
                                onRemove={removePokemon}
                                onMove={movePokemon}
                            />
                        ))}
                    </div>
                </section>


                <aside className="research-notes">
                    <p>Observations</p>

                    <p>
                        Track behaviour carefully.
                        <br />
                        Do not assume species
                        from appearance.
                    </p>

                    <p>
                        Current specimens: {team.length}/6
                    </p>
                </aside>


                <section className="pokemon-selection">
                    <h2>Field Selection</h2>

                    <PokemonSelector />
                </section>

            </div>
        </main>
    );
}

export default TeamBuilderPage;