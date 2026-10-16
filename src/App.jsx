import { useEffect, useCallback } from "react";
import "./App.css";
import { Navbar, Movies, StatsCards } from "./components";
import useMovieStore from "./store";
import { useInfiniteScroll } from "./hooks";

function App() {
  // Only extract states needed for App logic (infinite scroll and actions)
  const {
    loadingMore,
    hasMore,
    fetchMovies,
    searchMovies,
    loadMoreMovies,
  } = useMovieStore();

  // Handle search from navbar
  const handleSearch = (value) => {
    if (value.trim()) {
      searchMovies(value);
    } else {
      fetchMovies();
    }
  };

  // Memoized callback for infinite scroll
  const handleLoadMore = useCallback(() => {
    loadMoreMovies();
  }, [loadMoreMovies]);

  // Use infinite scroll hook
  useInfiniteScroll(handleLoadMore, hasMore, loadingMore);

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <StatsCards />
      <Movies 
        loadingMore={loadingMore} 
        hasMore={hasMore} 
      />
    </>
  );
}
export default App;
