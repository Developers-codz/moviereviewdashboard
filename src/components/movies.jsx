import { memo } from 'react';
import PropTypes from 'prop-types';
import useMovieStore from "../store/index";
import Loader from "./loader";
import Card from "./card";
import { Spin, Flex, Space, Typography } from "antd";

const { Text } = Typography;

// Extracted sub-components for better code organization
const LoadingMoreIndicator = memo(() => (
  <Space direction="vertical" align="center" style={{ width: '100%', padding: '2rem' }}>
    <Spin size="default" />
    <Text type="secondary">Loading more movies...</Text>
  </Space>
));
LoadingMoreIndicator.displayName = 'LoadingMoreIndicator';

const EndOfResults = memo(() => (
  <Flex justify="center" style={{ padding: '2rem' }}>
    <Text type="secondary">You've reached the end of the results!</Text>
  </Flex>
));
EndOfResults.displayName = 'EndOfResults';

const EmptyState = memo(({ searchQuery }) => (
  <Flex justify="center" style={{ padding: '2rem' }}>
    <Text type="secondary">
      {searchQuery
        ? "No movies found for your search."
        : "No movies available."}
    </Text>
  </Flex>
));
EmptyState.displayName = 'EmptyState';
EmptyState.propTypes = {
  searchQuery: PropTypes.string
};

const MoviesList = memo(({ movies }) => (
  <Flex wrap="wrap" gap="middle" justify="center">
    {movies.map((movie) => (
      <Card key={movie.imdbID} movie={movie} />
    ))}
  </Flex>
));
MoviesList.displayName = 'MoviesList';
MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

const Movies = ({ loadingMore, hasMore }) => {
  // Access only the states needed for rendering from the store
  const loading = useMovieStore((state) => state.loading);
  const movies = useMovieStore((state) => state.movies);
  const searchQuery = useMovieStore((state) => state.searchQuery);

  // Early return for loading state
  if (loading) {
    return (
      <div style={{ padding: '2rem' }}>
        <Loader />
      </div>
    );
  }

  // Early return for empty state
  if (!movies?.length) {
    return (
      <div style={{ padding: '2rem' }}>
        <EmptyState searchQuery={searchQuery} />
      </div>
    );
  }

  // Render movies with pagination indicators
  return (
    <div style={{ padding: '2rem' }}>
      <MoviesList movies={movies} />
      {loadingMore && <LoadingMoreIndicator />}
      {!hasMore && !loadingMore && <EndOfResults />}
    </div>
  );
};

Movies.displayName = 'Movies';

Movies.propTypes = {
  loadingMore: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired
};

export default memo(Movies);