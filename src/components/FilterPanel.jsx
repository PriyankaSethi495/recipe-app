import React from 'react';
import '../styles/FilterPanel.css';

const FilterPanel = ({
  availableCategories,
  availableAreas,
  selectedCategory,
  selectedArea,
  onCategoryChange,
  onAreaChange,
}) => {
  return (
    <div className="filter-panel">
      <div>
        <label htmlFor="category-select">Category: </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          {availableCategories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="area-select">Area: </label>
        <select
          id="area-select"
          value={selectedArea}
          onChange={(e) => onAreaChange(e.target.value)}
        >
          <option value="All">All</option>
          {availableAreas.map((area, index) => (
            <option key={index} value={area}>{area}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
