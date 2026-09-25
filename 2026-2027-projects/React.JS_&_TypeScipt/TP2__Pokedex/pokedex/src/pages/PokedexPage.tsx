import { useEffect, useMemo, useState } from "react";
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

type TypeApiResult = {
    pokemon: {
        pokemon: {
            name: string;
            url: string;
        };
        slot: number;
    }[];
};

type PokemonType = {
    name: string;
    color: string;
};

type Region = {
    id: string;
    name: string;

    range: [number, number] | null;
};

const MIN_SEARCH_LENGTH = 3;


const MAX_SELECTED_TYPES = 2;

const POKEMON_TYPES: PokemonType[] = [
    { name: "normal", color: "#A8A878" },
    { name: "fire", color: "#F08030" },
    { name: "water", color: "#6890F0" },
    { name: "electric", color: "#F8D030" },
    { name: "grass", color: "#78C850" },
    { name: "ice", color: "#98D8D8" },
    { name: "fighting", color: "#C03028" },
    { name: "poison", color: "#A040A0" },
    { name: "ground", color: "#E0C068" },
    { name: "flying", color: "#A890F0" },
    { name: "psychic", color: "#F85888" },
    { name: "bug", color: "#A8B820" },
    { name: "rock", color: "#B8A038" },
    { name: "ghost", color: "#705898" },
    { name: "dragon", color: "#7038F8" },
    { name: "dark", color: "#705848" },
    { name: "steel", color: "#B8B8D0" },
    { name: "fairy", color: "#EE99AC" },
];

const REGIONS: Region[] = [
    { id: "all", name: "All Regions", range: null },
    { id: "kanto", name: "Kanto", range: [1, 151] },
    { id: "johto", name: "Johto", range: [152, 251] },
    { id: "hoenn", name: "Hoenn", range: [252, 386] },
    { id: "sinnoh", name: "Sinnoh", range: [387, 493] },
    { id: "unova", name: "Unova", range: [494, 649] },
    { id: "kalos", name: "Kalos", range: [650, 721] },
    { id: "alola", name: "Alola", range: [722, 809] },
    { id: "galar", name: "Galar", range: [810, 905] },
    { id: "paldea", name: "Paldea", range: [906, 1025] },
];

function PokedexPage() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    const [search, setSearch] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("all");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const [typePokemonCache, setTypePokemonCache] = useState<
        Record<string, Set<string>>
    >({});
    const [isLoadingTypes, setIsLoadingTypes] = useState(false);

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

    useEffect(() => {
        const missingTypes = selectedTypes.filter(
            (type) => !typePokemonCache[type]
        );

        if (missingTypes.length === 0) {
            return;
        }

        let cancelled = false;

        async function loadTypes() {
            setIsLoadingTypes(true);

            const entries = await Promise.all(
                missingTypes.map(async (type) => {
                    const response = await fetch(
                        `https://pokeapi.co/api/v2/type/${type}`
                    );

                    const data: TypeApiResult = await response.json();

                    const names = new Set(
                        data.pokemon.map((entry) => entry.pokemon.name)
                    );

                    return [type, names] as const;
                })
            );

            if (cancelled) return;

            setTypePokemonCache((previous) => {
                const next = { ...previous };

                for (const [type, names] of entries) {
                    next[type] = names;
                }

                return next;
            });

            setIsLoadingTypes(false);
        }

        loadTypes();

        return () => {
            cancelled = true;
        };
    }, [selectedTypes, typePokemonCache]);

    const toggleType = (type: string) => {
        setSelectedTypes((previous) => {
            if (previous.includes(type)) {
                return previous.filter((entry) => entry !== type);
            }

            if (previous.length >= MAX_SELECTED_TYPES) {
                return previous;
            }

            return [...previous, type];
        });
    };

    const activeRegion = useMemo(
        () => REGIONS.find((region) => region.id === selectedRegion),
        [selectedRegion]
    );

    const typesReady = selectedTypes.every(
        (type) => typePokemonCache[type] !== undefined
    );

    const filteredPokemons = useMemo(() => {
        const trimmedSearch = search.trim().toLowerCase();
        const isSearchingByName = trimmedSearch.length >= MIN_SEARCH_LENGTH;

        return pokemons.filter((pokemon) => {
            if (isSearchingByName && !pokemon.name.includes(trimmedSearch)) {
                return false;
            }

            if (activeRegion?.range) {
                const [start, end] = activeRegion.range;

                if (pokemon.dexNumber < start || pokemon.dexNumber > end) {
                    return false;
                }
            }

            if (selectedTypes.length > 0) {
                if (!typesReady) {
                    return false;
                }

                const matchesAllTypes = selectedTypes.every((type) =>
                    typePokemonCache[type]?.has(pokemon.name)
                );

                if (!matchesAllTypes) {
                    return false;
                }
            }

            return true;
        });
    }, [
        pokemons,
        search,
        activeRegion,
        selectedTypes,
        typePokemonCache,
        typesReady,
    ]);

    const hasActiveFilters =
        search.trim().length > 0 ||
        selectedRegion !== "all" ||
        selectedTypes.length > 0;

    const clearFilters = () => {
        setSearch("");
        setSelectedRegion("all");
        setSelectedTypes([]);
    };

    return (
        <main className="pokedex-page">

            <header className="pokedex-header">
                <div>
                    <h1>Pokédex</h1>
                    <p>FIELD DATABASE // SPECIMEN REGISTRY</p>
                </div>

                <span>
                    {filteredPokemons.length} SPECIMENS
                </span>
            </header>

            <section className="pokedex-controls">
                <input
                    type="search"
                    placeholder={`Search Pokémon... (min. ${MIN_SEARCH_LENGTH} letters)`}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                <select
                    className="pokedex-region-select"
                    value={selectedRegion}
                    onChange={(event) => setSelectedRegion(event.target.value)}
                    aria-label="Filter by region"
                >
                    {REGIONS.map((region) => (
                        <option key={region.id} value={region.id}>
                            {region.name}
                        </option>
                    ))}
                </select>

                {hasActiveFilters && (
                    <button
                        type="button"
                        className="pokedex-clear-filters"
                        onClick={clearFilters}
                    >
                        CLEAR
                    </button>
                )}
            </section>

            <section className="pokedex-type-filters">
                {POKEMON_TYPES.map((type) => {
                    const isSelected = selectedTypes.includes(type.name);
                    const isDisabled =
                        !isSelected &&
                        selectedTypes.length >= MAX_SELECTED_TYPES;

                    return (
                        <button
                            key={type.name}
                            type="button"
                            className={`type-pill${isSelected ? " active" : ""}`}
                            style={{
                                borderColor: type.color,
                                backgroundColor: isSelected
                                    ? type.color
                                    : undefined,
                            }}
                            disabled={isDisabled}
                            aria-pressed={isSelected}
                            onClick={() => toggleType(type.name)}
                        >
                            {type.name}
                        </button>
                    );
                })}

                {selectedTypes.length > 0 && isLoadingTypes && (
                    <span className="pokedex-type-loading">
                        Loading type data...
                    </span>
                )}
            </section>

            <section className="pokemon-grid">
                {filteredPokemons.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.name}
                        pokemon={pokemon}
                    />
                ))}
            </section>

            {filteredPokemons.length === 0 && (
                <p className="pokedex-empty-state">
                    No specimens match these filters.
                </p>
            )}

        </main>
    );
}

export default PokedexPage;
