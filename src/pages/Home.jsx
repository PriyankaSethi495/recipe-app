import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import '../styles/home.css';

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          setMeals(data.meals);
        } else {
          setMeals([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home">
      <h1 className='main-heading'>Kitchen Quest: Unleash Your Inner Chef Today</h1>
      <div className="meal-container">
        {meals.map(meal => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default Home;
