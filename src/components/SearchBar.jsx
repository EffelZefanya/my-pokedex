import { useState } from "react";

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm.trim());
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px", textAlign: "center" }}>
            <input
                type="text"
                placeholder="Search Pokémon by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "8px", fontSize: "16px", width: "200px", marginRight: "10px" }}
            />
      <button type="submit" style={{ padding: "8px 12px" }}>Search</button>
    </form>
    );
}

export default SearchBar;