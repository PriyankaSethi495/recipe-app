import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import '../styles/RecipeCard.css';

const RecipeCard = ({ meal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.find((item) => item.idMeal === meal.idMeal);

  const handleClick = () => {
    navigate(`/recipe/${meal.idMeal}`);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(meal));
    } else {
      dispatch(addFavorite(meal));
    }
  };

  const instructions = meal.strInstructions 
    ? meal.strInstructions.substring(0, 100)
    : 'No instructions available. Click for details.';

  return (
    <div className="recipe-card" onClick={handleClick}>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h2>{meal.strMeal}</h2>
      <p>{instructions}...</p>
      <button className="favorite-btn" onClick={toggleFavorite}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );
};

export default RecipeCard;
