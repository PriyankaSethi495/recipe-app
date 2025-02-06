import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import '../styles/RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMealDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        if (data.meals) {
          setMeal(data.meals[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMealDetail();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;
  if (!meal) return <div>No recipe found.</div>;

  // Extract ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="recipe-detail">
      <h1 className="main-heading">{meal.strMeal}</h1>
      <div className="detail-content">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="detail-image" />
        <div className="recipe-info">
          <h2>Instructions</h2>
          <p>{meal.strInstructions}</p>
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>
                {item.ingredient} - {item.measure}
              </li>
            ))}
          </ul>
          <p><strong>Category:</strong> {meal.strCategory}</p>
          <p><strong>Area:</strong> {meal.strArea}</p>
          {meal.strTags && <p><strong>Tags:</strong> {meal.strTags}</p>}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
