// src/utils/storage.js
// Local storage utility functions

export const storageUtils = {
  // Save favorites to localStorage
  saveFavorites: (favorites) => {
    localStorage.setItem('job_favorites', JSON.stringify(favorites));
  },

  // Load favorites from localStorage
  loadFavorites: () => {
    const saved = localStorage.getItem('job_favorites');
    return saved ? JSON.parse(saved) : [];
  },

  // Add favorite
  addFavorite: (jobId) => {
    const favorites = storageUtils.loadFavorites();
    if (!favorites.includes(jobId)) {
      favorites.push(jobId);
      storageUtils.saveFavorites(favorites);
    }
    return favorites;
  },

  // Remove favorite
  removeFavorite: (jobId) => {
    const favorites = storageUtils.loadFavorites();
    const filtered = favorites.filter((id) => id !== jobId);
    storageUtils.saveFavorites(filtered);
    return filtered;
  },

  // Check if job is favorite
  isFavorite: (jobId) => {
    const favorites = storageUtils.loadFavorites();
    return favorites.includes(jobId);
  },

  // Clear all favorites
  clearFavorites: () => {
    localStorage.removeItem('job_favorites');
  },
};
