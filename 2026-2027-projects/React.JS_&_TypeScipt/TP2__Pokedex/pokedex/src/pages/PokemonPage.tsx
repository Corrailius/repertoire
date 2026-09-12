import { PokemonAppearance, PokemonBiology, PokemonTypes, PokemonAbilities, PokemonStats, PokemonMoves, PokemonEvolution, PokemonForms, } from "../components/pokemon";
import type { PokemonDetails } from "../types/PokemonDetails";
import type { PokemonSpecies } from "../types/PokemonSpecies";
import type { EvolutionChain } from "../types/EvolutionChain";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PokemonPage() {
    const { slug } = useParams();

    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
    const [species, setSpecies] = useState<PokemonSpecies | null>(null);
    const [evolution, setEvolution] = useState<EvolutionChain | null>(null);

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

            const speciesData: PokemonSpecies =
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
        <div>
            <h1>
                #{pokemon.id} {pokemon.name}
            </h1>
            <PokemonAppearance pokemon={pokemon} species={species} />
            <PokemonForms species={species} />
            <PokemonBiology pokemon={pokemon} species={species} />
            <PokemonTypes pokemon={pokemon} />
            <PokemonAbilities pokemon={pokemon} />
            <PokemonStats pokemon={pokemon} />
            <PokemonMoves pokemon={pokemon} />
            <PokemonEvolution evolution={evolution} />
        </div>
    );
}

export default PokemonPage;