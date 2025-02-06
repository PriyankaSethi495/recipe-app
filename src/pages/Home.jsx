import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import '../styles/home.css';

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      if (data.meals) {
        const query = searchTerm.toLowerCase();
        const filteredMeals = data.meals.filter(meal => {
          const titleMatch = meal.strMeal.toLowerCase().includes(query);
          const categoryMatch = meal.strCategory && meal.strCategory.toLowerCase().includes(query);
          let ingredientMatch = false;
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient && ingredient.toLowerCase().includes(query)) {
              ingredientMatch = true;
              break;
            }
          }
          return titleMatch || categoryMatch || ingredientMatch;
        });
        setMeals(filteredMeals);
      } else {
        setMeals([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('');
  }, []);

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home">
      <h1 className="main-heading">Recipe App - Home</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="meal-container">
        {meals.map(meal => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default Home;
