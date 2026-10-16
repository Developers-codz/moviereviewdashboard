import { create } from "zustand";
import getMovies, { searchMovies } from "../api";

const useMovieStore = create((set, get) => ({
  movies: [],
  loading: false,
  loadingMore: false,
  searchQuery: '',
  currentPage: 1,
  totalResults: 0,
  hasMore: true,
  reviews: [], // Store all reviews
  
  setMovies: (movies) => set({ movies }),
  setLoading: (loading) => set({ loading }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  fetchMovies: async (reset = true) => {
    const { currentPage, movies: existingMovies } = get();
    const pageToFetch = reset ? 1 : currentPage;
    
    set({ loading: reset, loadingMore: !reset });
    
    try {
      const response = await getMovies(pageToFetch);
      const newMovies = reset ? response.Search : [...existingMovies, ...response.Search];
      
      set({ 
        movies: newMovies, 
        loading: false, 
        loadingMore: false,
        currentPage: pageToFetch,
        totalResults: response.totalResults,
        hasMore: newMovies.length < response.totalResults
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
      set({ loading: false, loadingMore: false });
    }
  },
  
  loadMoreMovies: async () => {
    const { hasMore, loadingMore, searchQuery, currentPage } = get();
    
    if (!hasMore || loadingMore) return;
    
    const nextPage = currentPage + 1;
    set({ loadingMore: true, currentPage: nextPage });
    
    try {
      const response = searchQuery 
        ? await searchMovies(searchQuery, nextPage)
        : await getMovies(nextPage);
        
      const { movies: existingMovies } = get();
      const newMovies = [...existingMovies, ...response.Search];
      
      set({ 
        movies: newMovies,
        loadingMore: false,
        hasMore: newMovies.length < response.totalResults
      });
    } catch (error) {
      console.error("Error loading more movies:", error);
      set({ loadingMore: false });
    }
  },
  
  searchMovies: async (query) => {
    set({ loading: true, searchQuery: query, currentPage: 1 });
    
    try {
      const response = await searchMovies(query, 1);
      set({ 
        movies: response.Search, 
        loading: false,
        totalResults: response.totalResults,
        hasMore: response.Search.length < response.totalResults
      });
    } catch (error) {
      console.error("Error searching movies:", error);
      set({ loading: false });
    }
  },

  // Review management
  addReview: async (reviewData) => {
    const { reviews } = get();
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newReview = {
      id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...reviewData,
    };
    
    set({ 
      reviews: [...reviews, newReview] 
    });
    
    return newReview;
  },

  getReviewsByMovieId: (movieId) => {
    const { reviews } = get();
    return reviews.filter(review => review.movieId === movieId);
  },

  getAllReviews: () => {
    const { reviews } = get();
    return reviews;
  },
}));

export default useMovieStore;