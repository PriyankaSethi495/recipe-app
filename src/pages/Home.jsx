import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import Spinner from '../components/Spinner';
import FavoritesPopup from '../components/FavoritesPopup';
import '../styles/home.css';

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [rawMeals, setRawMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [area, setArea] = useState('All');
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchAllMeals = async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await res.json();
    if (data.meals) {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = data.meals.filter((meal) => {
        const nameMatch = meal.strMeal.toLowerCase().includes(lowerSearch);
        const categoryMatch = meal.strCategory && meal.strCategory.toLowerCase().includes(lowerSearch);
        let ingredientMatch = false;
        for (let i = 1; i <= 20; i++) {
          const ing = meal[`strIngredient${i}`];
          if (ing && ing.toLowerCase().includes(lowerSearch)) {
            ingredientMatch = true;
            break;
          }
        }
        const tagMatch = meal.strTags && meal.strTags.toLowerCase().includes(lowerSearch);
        const areaMatch = meal.strArea && meal.strArea.toLowerCase().includes(lowerSearch);
        return nameMatch || categoryMatch || ingredientMatch || tagMatch || areaMatch;
      });
      return filtered;
    }
    return [];
  };

  const fetchMeals = async () => {
    setLoading(true);
    setError('');
    try {
      const raw = await fetchAllMeals();
      setRawMeals(raw);
      let results = raw;
      if (category !== 'All') {
        results = results.filter(meal => meal.strCategory === category);
      }
      if (area !== 'All') {
        results = results.filter(meal => meal.strArea === area);
      }
      setMeals(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [searchTerm, category, area]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCategory('All');
    setArea('All');
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };

  const handleAreaChange = (selectedArea) => {
    setArea(selectedArea);
  };

  const availableCategories = Array.from(
    new Set(rawMeals.map(meal => meal.strCategory).filter(Boolean))
  );
  const availableAreas = Array.from(
    new Set(rawMeals.map(meal => meal.strArea).filter(Boolean))
  );

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home">
      <div className="header-container">
        <h1 className="main-heading">Kitchen Quest: Unleash Your Inner Chef Today</h1>
        <button className="favorites-toggle-btn" onClick={() => setShowFavorites(true)}>
          Favorites
        </button>
      </div>
      <SearchBar onSearchSubmit={handleSearch} />
      <FilterPanel
        availableCategories={availableCategories}
        availableAreas={availableAreas}
        selectedCategory={category}
        selectedArea={area}
        onCategoryChange={handleCategoryChange}
        onAreaChange={handleAreaChange}
      />
      <div className="meal-container">
        {meals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
      {showFavorites && <FavoritesPopup onClose={() => setShowFavorites(false)} />}
    </div>
  );
};

export default Home;
