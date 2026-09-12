import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import type { Pokemon } from "../types/Pokemon";

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
        <div className="min-h-screen bg-black">
            <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6">
                {pokemons.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.name}
                        pokemon={pokemon}
                    />
                ))}
            </div>
        </div>
    );
}

export default PokedexPage;