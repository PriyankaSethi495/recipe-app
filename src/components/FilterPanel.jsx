import React, { useState, useEffect } from 'react';
import '../styles/FilterPanel.css';

const FilterPanel = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          const cats = data.meals.map(item => item.strCategory);
          setCategories(cats);
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onFilterChange(category);
  };

  return (
    <div className="filter-panel">
      <label htmlFor="category-select">Filter by Category: </label>
      <select id="category-select" value={selectedCategory} onChange={handleChange}>
        <option value="All">All</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterPanel;
