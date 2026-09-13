import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import type { Pokemon } from "../types/Pokemon";
import "../style/pokedex.css";

type PokemonApiResult = {
    name: string;
    url: string;
};

type PokemonResponse = {
    results: PokemonApiResult[];
};

function PokedexPage() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
        async function loadPokemons() {
            const response = await fetch(
                "https://pokeapi.co/api/v2/pokemon-species?limit=10000"
            );

            const data: PokemonResponse = await response.json();

            const pokemons: Pokemon[] = data.results.map((pokemon) => {
                const dexNumber = Number(
                    pokemon.url.split("/").filter(Boolean).pop()
                );

                return {
                    name: pokemon.name,
                    dexNumber: dexNumber,
                    slug: pokemon.name,
                };
            });

            setPokemons(pokemons);
        }

        loadPokemons();
    }, []);

    return (
        <main className="pokedex-page">

            <header className="pokedex-header">
                <div>
                    <h1>Pokédex</h1>
                    <p>FIELD DATABASE // SPECIMEN REGISTRY</p>
                </div>

                <span>
                    {pokemons.length} SPECIMENS
                </span>
            </header>

            <section className="pokedex-controls">
                <input
                    type="search"
                    placeholder="Search Pokémon..."
                />
            </section>

            <section className="pokemon-grid">
                {pokemons.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.name}
                        pokemon={pokemon}
                    />
                ))}
            </section>

        </main>
    );
}

export default PokedexPage;