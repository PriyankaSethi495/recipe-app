import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import '../styles/Home.css';

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

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
        return nameMatch || categoryMatch || ingredientMatch;
      });
      return filtered;
    }
    return [];
  };

  const fetchMeals = async () => {
    setLoading(true);
    setError('');
    try {
      let results = await fetchAllMeals();
      if (category !== 'All') {
        results = results.filter(meal => meal.strCategory === category);
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
  }, [searchTerm, category]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (cat) => {
    setCategory(cat);
  };

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home">
      <h1 className="main-heading">Kitchen Quest: Unleash Your Inner Chef Today</h1>
      <SearchBar onSearch={handleSearch} />
      <FilterPanel onFilterChange={handleFilterChange} />
      <div className="meal-container">
        {meals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default Home;
