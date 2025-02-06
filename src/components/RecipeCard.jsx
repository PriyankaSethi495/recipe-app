import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RecipeCard.css';

const RecipeCard = ({ meal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${meal.idMeal}`);
  };

  return (
    <div className="recipe-card" onClick={handleClick}>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h2>{meal.strMeal}</h2>
      <p>{meal.strInstructions.substring(0, 100)}...</p>
    </div>
  );
};

export default RecipeCard;
