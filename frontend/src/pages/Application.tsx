import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { restaurantService } from '../services/api';
import type { Restaurant } from '../types';
import '../styles/Application.css';

const Application: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const result = await restaurantService.search(searchQuery);
      setRestaurants(result.restaurants);
      if (result.restaurants.length === 0) {
        setError('No restaurants found');
      }
    } catch (err) {
      setError('Failed to search restaurants');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="app-header-section">
        <div className="app-header">
          <h1 className="app-title">Welcome to Restaurant Finder</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

        <div className="user-info-bar">
          <div className="user-avatar">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <p className="user-name">{user?.name}</p>
            <p className="user-email">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="app-content">
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search by restaurant name, cuisine, or borough..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="results-section">
          {searched && restaurants.length > 0 && (
            <>
              <h2 className="results-title">Found {restaurants.length} restaurant(s)</h2>
              <div className="restaurants-grid">
                {restaurants.map((restaurant) => (
                  <div key={restaurant._id || restaurant.restaurant_id} className="restaurant-card">
                    <div className="restaurant-header">
                      <h3 className="restaurant-name">{restaurant.name}</h3>
                      <span className="cuisine-badge">{restaurant.cuisine}</span>
                    </div>

                    <div className="restaurant-details">
                      <p>
                        <strong>Borough:</strong> {restaurant.borough}
                      </p>
                      <p>
                        <strong>Address:</strong> {restaurant.address.building} {restaurant.address.street},{' '}
                        {restaurant.address.zipcode}
                      </p>
                      <p>
                        <strong>Coordinates:</strong> {restaurant.address.coord[1]}, {restaurant.address.coord[0]}
                      </p>
                    </div>

                    {restaurant.grades && restaurant.grades.length > 0 && (
                      <div className="grades-section">
                        <strong>Latest Grade:</strong>
                        <div className="grade-badge">
                          {restaurant.grades[0].grade} - Score: {restaurant.grades[0].score}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {searched && restaurants.length === 0 && !loading && !error && (
            <div className="no-results">
              <p>No results found for "{searchQuery}"</p>
            </div>
          )}

          {!searched && (
            <div className="welcome-message">
              <p>Use the search bar above to find restaurants</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Application;
