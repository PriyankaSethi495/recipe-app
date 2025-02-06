import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RecipeCard.css';

const RecipeCard = ({ meal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${meal.idMeal}`);
  };

  const instructions = meal.strInstructions 
    ? meal.strInstructions.substring(0, 100) 
    : 'No instructions available. Click for details.';

  return (
    <div className="recipe-card" onClick={handleClick}>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h2>{meal.strMeal}</h2>
      <p>{instructions}...</p>
    </div>
  );
};

export default RecipeCard;
