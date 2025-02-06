import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearchSubmit, initialValue = '' }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(inputValue);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search recipes here..."
        value={inputValue}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
