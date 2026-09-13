import {
    PokemonAppearance,
    PokemonBiology,
    PokemonAbilities,
    PokemonStats,
    PokemonMoves,
    PokemonEvolution,
    PokemonForms,
    PokemonHabitat,
    PokemonSpecies,
} from "../components/pokemon";

import type { PokemonDetails } from "../types/PokemonDetails";
import type { PokemonSpeciesType } from "../types/PokemonSpecies.type";
import type { EvolutionChain } from "../types/EvolutionChain";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/pokemon.css";

function PokemonPage() {
    const { slug } = useParams();

    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
    const [species, setSpecies] = useState<PokemonSpeciesType | null>(null);
    const [evolution, setEvolution] = useState<EvolutionChain | null>(null);

    const [activeCategory, setActiveCategory] = useState("species");

    useEffect(() => {
        async function loadPokemon() {
            if (!slug) return;

            const pokemonResponse = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${slug}`
            );

            const pokemonData: PokemonDetails =
                await pokemonResponse.json();

            const speciesResponse = await fetch(
                pokemonData.species.url
            );

            const speciesData: PokemonSpeciesType =
                await speciesResponse.json();

            const evolutionResponse = await fetch(
                speciesData.evolution_chain.url
            );

            const evolutionData: EvolutionChain =
                await evolutionResponse.json();

            setPokemon(pokemonData);
            setSpecies(speciesData);
            setEvolution(evolutionData);
        }

        loadPokemon();
    }, [slug]);

    if (!pokemon || !species || !evolution) {
        return <p>Loading...</p>;
    }

    return (
        <main className="pokemon-page">

            <section className="pokemon-hud">

                <div className="pokemon-hud-header">
                    <span>#{pokemon.id}</span>
                    <h1>{pokemon.name}</h1>
                </div>

                <div className="pokemon-hud-artwork">
                    <PokemonAppearance
                        pokemon={pokemon}
                    />
                </div>

                <PokemonForms species={species} />

            </section>


            <section className="pokemon-record">

                <nav className="pokemon-record-navigation">

                    <button
                        className={activeCategory === "species" ? "active" : ""}
                        onClick={() => setActiveCategory("species")}
                    >
                        SPECIES
                    </button>

                    <button
                        className={activeCategory === "biology" ? "active" : ""}
                        onClick={() => setActiveCategory("biology")}
                    >
                        BIOLOGY
                    </button>

                    <button
                        className={activeCategory === "habitat" ? "active" : ""}
                        onClick={() => setActiveCategory("habitat")}
                    >
                        HABITAT
                    </button>

                    <button
                        className={activeCategory === "abilities" ? "active" : ""}
                        onClick={() => setActiveCategory("abilities")}
                    >
                        ABILITIES
                    </button>

                    <button
                        className={activeCategory === "stats" ? "active" : ""}
                        onClick={() => setActiveCategory("stats")}
                    >
                        STATS
                    </button>

                    <button
                        className={activeCategory === "moves" ? "active" : ""}
                        onClick={() => setActiveCategory("moves")}
                    >
                        MOVES
                    </button>

                    <button
                        className={activeCategory === "evolution" ? "active" : ""}
                        onClick={() => setActiveCategory("evolution")}
                    >
                        EVOLUTION
                    </button>

                </nav>


                <div className="pokemon-record-content">

                    {activeCategory === "species" && (
                        <PokemonSpecies
                            pokemon={pokemon}
                            species={species}
                        />
                    )}

                    {activeCategory === "biology" && (
                        <PokemonBiology
                            pokemon={pokemon}
                            species={species}
                        />
                    )}

                    {activeCategory === "habitat" && (
                        <PokemonHabitat species={species} />
                    )}

                    {activeCategory === "abilities" && (
                        <PokemonAbilities pokemon={pokemon} />
                    )}

                    {activeCategory === "stats" && (
                        <PokemonStats pokemon={pokemon} />
                    )}

                    {activeCategory === "moves" && (
                        <PokemonMoves pokemon={pokemon} />
                    )}

                    {activeCategory === "evolution" && (
                        <PokemonEvolution evolution={evolution} />
                    )}

                </div>

            </section>

        </main>
    );
}

export default PokemonPage;