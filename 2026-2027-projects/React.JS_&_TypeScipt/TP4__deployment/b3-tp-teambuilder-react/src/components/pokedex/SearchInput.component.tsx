type SearchInputProps = {
  search: string;
  onSearchChange: (search: string) => void;
};

const SearchInput = ({ search, onSearchChange }: SearchInputProps) => {
  return (
    <input
      type="text"
      value={search}
      placeholder="Rechercher un Pokémon…"
      onChange={(event) => onSearchChange(event.target.value)}
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:border-red-500 focus:outline-none"
    />
  );
};

export default SearchInput;
