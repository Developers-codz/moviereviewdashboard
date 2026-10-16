import axios from 'axios';

const apiKey = import.meta.env.VITE_OMDB_API_KEY;

async function getMovies(page = 1) {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=movie&page=${page}&apikey=${apiKey}`);
    
    return {
      Search: response.data.Search || [],
      totalResults: response.data.totalResults || 0,
      currentPage: page
    };
  } catch (error) {
    return { Search: [], totalResults: 0, currentPage: page };
  }
}

// Search movies by query with pagination
async function searchMovies(query, page = 1) {
  try {
    if (!query.trim()) {
      return getMovies(page); // Return default movies if no query
    }
    
    const response = await axios.get(`http://www.omdbapi.com/?s=${query}&page=${page}&apikey=${apiKey}`);
    return {
      Search: response.data.Search || [],
      totalResults: response.data.totalResults || 0,
      currentPage: page
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    return { Search: [], totalResults: 0, currentPage: page };
  }
}

export { searchMovies };
export default getMovies;



