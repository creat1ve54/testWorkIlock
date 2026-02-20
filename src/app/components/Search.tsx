import React, { ChangeEvent, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

const Search = ({
  onSearch,
  value="",
}: {
  onSearch: (query: string) => void;
  value?: string;
}) => {
  const [query, setQuery] = useState(value);

  const debouncedSearch = useDebounce((value: string) => {
    onSearch(value.trim());
  }, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="search">
      <div className="search__field">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Поиск задач"
          className="search__input"
          aria-label="Поиск задач"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="search__clear"
            aria-label="Очистить поиск"
          >
            &times;
          </button>
        )}
        <div className="search__icon">🔍</div>
      </div>
    </div>
  );
};

export default Search;
