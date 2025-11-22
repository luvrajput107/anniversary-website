import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

axios.defaults.withCredentials = true;

export const logEvent = async (eventType, eventData = {}) => {
  try {
    await axios.post(`${API_URL}/api/events`, { eventType, eventData });
  } catch (error) {
    console.error('Error logging event:', error);
    // Fail silently
  }
};

export const submitSongRating = async (songId, rating) => {
  try {
    await axios.post(`${API_URL}/api/song-rating`, { songId, rating });
  } catch (error) {
    console.error('Error submitting rating:', error);
  }
};

export const trackVisit = async () => {
  try {
    await axios.post(`${API_URL}/api/visit`);
  } catch (error) {
    console.error('Error tracking visit:', error);
  }
};

export const verifySecretCode = async (code) => {
  try {
    const response = await axios.post(`${API_URL}/api/secret/verify`, { code });
    return response.data;
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Verification failed' 
    };
  }
};

