import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Card as AntCard, Typography, Space, Image, Button } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import ReviewDialog from './ReviewDialog';
import useMovieStore from '../store';

const { Text } = Typography;

const Card = ({ movie }) => {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const addReview = useMovieStore((state) => state.addReview);

  const handleOpenReviewDialog = () => {
    setIsReviewDialogOpen(true);
  };

  const handleCloseReviewDialog = () => {
    setIsReviewDialogOpen(false);
  };

  const handleSubmitReview = async (reviewData) => {
    // Add review to store
    await addReview(reviewData);
  };

  return (
    <>
      <AntCard 
        title={movie.Title} 
        style={{ width: 250 }}
        actions={[
          <Button 
            key="review"
            type="primary" 
            icon={<StarOutlined />}
            onClick={handleOpenReviewDialog}
            block
          >
            Add Review
          </Button>
        ]}
      >
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Text>
            <Text strong>Year:</Text> {movie.Year}
          </Text>
          <Text>
            <Text strong>Type:</Text> {movie.Type}
          </Text>
          {movie.Poster !== 'N/A' && (
            <Image 
              src={movie.Poster} 
              alt={movie.Title} 
              preview={true}
              style={{ maxWidth: '200px' }} 
            />
          )}
        </Space>
      </AntCard>

      <ReviewDialog
        open={isReviewDialogOpen}
        onClose={handleCloseReviewDialog}
        movie={movie}
        onSubmit={handleSubmitReview}
      />
    </>
  );
};

Card.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    Poster: PropTypes.string,
    imdbID: PropTypes.string.isRequired
  }).isRequired
};

export default memo(Card);