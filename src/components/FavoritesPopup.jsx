import React from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';
import '../styles/FavoritesPopup.css';

const FavoritesPopup = ({ onClose }) => {
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <div className="favorites-popup-overlay" onClick={onClose}>
      <div className="favorites-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Your Favorites</h2>
        <div className="favorites-popup-content">
          {favorites.length === 0 ? (
            <p>No favorite recipes yet.</p>
          ) : (
            <div className="favorites-list">
              {favorites.map((meal) => (
                <RecipeCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPopup;
