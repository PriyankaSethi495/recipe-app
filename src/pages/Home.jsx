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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All');
  const [showFavorites, setShowFavorites] = useState(false);

   //Fetch all recipes and filter based on search term
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

  //Fetch recipes and apply category/area filters
  const fetchMeals = async () => {
    setLoading(true);
    setError('');
    try {
      const raw = await fetchAllMeals();
      setRawMeals(raw);
      let results = raw;
      if (selectedCategory !== 'All') {
        results = results.filter(meal => meal.strCategory === selectedCategory);
      }
      if (selectedArea !== 'All') {
        results = results.filter(meal => meal.strArea === selectedArea);
      }
      setMeals(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //Fetch recipes initially and when filters change
  useEffect(() => {
    fetchMeals();
  }, [searchTerm, selectedCategory, selectedArea]);

  const handleSearchSubmit = (term) => {
    setSearchTerm(term);
    setSelectedCategory('All');
    setSelectedArea('All');
  };

  //Get available categories based on current filters
  const availableCategories = Array.from(
    new Set(
      rawMeals
        .filter(meal => selectedArea === 'All' || meal.strArea === selectedArea)
        .map(meal => meal.strCategory)
        .filter(Boolean)
    )
  );

  //Get available areas based on current filters
  const availableAreas = Array.from(
    new Set(
      rawMeals
        .filter(meal => selectedCategory === 'All' || meal.strCategory === selectedCategory)
        .map(meal => meal.strArea)
        .filter(Boolean)
    )
  );

  //Handle category change
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
  };

  //Handle area change
  const handleAreaChange = (area) => {
    setSelectedArea(area);
  };

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home">
      <div className="header-container">
        <h1 className="main-heading">Kitchen Quest</h1>
        <button className="favorites-toggle-btn" onClick={() => setShowFavorites(true)}>
          Favorites
        </button>
      </div>
      <SearchBar onSearchSubmit={handleSearchSubmit} initialValue={searchTerm} />
      <FilterPanel
        availableCategories={availableCategories}
        availableAreas={availableAreas}
        selectedCategory={selectedCategory}
        selectedArea={selectedArea}
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
