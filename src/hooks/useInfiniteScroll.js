import { useEffect } from "react";

/**
 * Custom hook for implementing infinite scroll functionality
 * @param {Function} callback - Function to call when user scrolls near bottom
 * @param {boolean} hasMore - Whether there are more items to load
 * @param {boolean} loading - Whether data is currently loading
 */
const useInfiniteScroll = (callback, hasMore, loading) => {
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Trigger callback when user is within 5px of bottom
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, hasMore, loading]);
};

export default useInfiniteScroll;

