import React, { useState, useEffect } from 'react';
import '../styles/FilterPanel.css';

const FilterPanel = ({ onCategoryChange, onAreaChange }) => {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All');

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          const cats = data.meals.map(item => item.strCategory);
          setCategories(cats);
        }
      })
      .catch(error => console.error('Error fetching categories:', error));

    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          const areaList = data.meals.map(item => item.strArea);
          setAreas(areaList);
        }
      })
      .catch(error => console.error('Error fetching areas:', error));
  }, []);

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    onCategoryChange(cat);
  };

  const handleAreaChange = (e) => {
    const area = e.target.value;
    setSelectedArea(area);
    onAreaChange(area);
  };

  return (
    <div className="filter-panel">
      <div>
        <label htmlFor="category-select">Category: </label>
        <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="area-select">Area: </label>
        <select id="area-select" value={selectedArea} onChange={handleAreaChange}>
          <option value="All">All</option>
          {areas.map((area, index) => (
            <option key={index} value={area}>{area}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
