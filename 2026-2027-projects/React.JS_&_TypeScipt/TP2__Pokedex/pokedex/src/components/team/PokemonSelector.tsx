import { useEffect, useState } from "react";
import type { Pokemon } from "../../types/Pokemon";
import { useTeamStore } from "../../store/teamStore";

type PokemonSearchResult = {
    name: string;
    url: string;
};

type PokemonSearchResponse = {
    results: PokemonSearchResult[];
};

function PokemonSelector() {
    const [name, setName] = useState("");
    const [results, setResults] = useState<PokemonSearchResult[]>([]);
    const [message, setMessage] = useState("");

    const team = useTeamStore((state) => state.team);
    const addPokemon = useTeamStore((state) => state.addPokemon);

    useEffect(() => {
        if (name.length < 4) {
            setResults([]);
            return;
        }

        const timeout = setTimeout(async () => {
            const response = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=10000"
            );

            if (!response.ok) {
                setMessage("Unable to search for Pokemon.");
                return;
            }

            const data: PokemonSearchResponse =
                await response.json();

            const filteredResults = data.results.filter((pokemon) =>
                pokemon.name.includes(name.toLowerCase())
            );

            setResults(filteredResults.slice(0, 10));
        }, 300);

        return () => clearTimeout(timeout);
    }, [name]);

    const handleAdd = async (result: PokemonSearchResult) => {
        if (team.length >= 6) {
            setMessage("Team is full.");
            return;
        }

        if (team.some((member) => member.name === result.name)) {
            setMessage("Pokemon is already on the team.");
            return;
        }

        const response = await fetch(result.url);

        if (!response.ok) {
            setMessage("Unable to load Pokemon.");
            return;
        }

        const data = await response.json();

        const pokemon: Pokemon = {
            name: data.name,
            dexNumber: data.id,
            slug: data.name,
        };

        addPokemon(pokemon);

        setName("");
        setResults([]);
        setMessage(`${pokemon.name} added.`);
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                        setMessage("");
                    }}
                    placeholder="Search Pokemon"
                />
            </div>

            <div className="flex flex-col">
                {results.map((result) => (
                    <button
                        key={result.name}
                        onClick={() => handleAdd(result)}
                    >
                        {result.name}
                    </button>
                ))}
            </div>

            {message && <p>{message}</p>}
        </div>
    );
}

export default PokemonSelector;