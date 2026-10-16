import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Rate, Input, Space, Typography, message } from 'antd';

const { TextArea } = Input;
const { Text } = Typography;

const ReviewDialog = ({ open, onClose, movie, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (rating === 0) {
      message.warning('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      message.warning('Please add a comment');
      return;
    }

    setLoading(true);
    
    try {
      await onSubmit({
        movieId: movie.imdbID,
        movieTitle: movie.Title,
        rating,
        comment: comment.trim(),
        timestamp: new Date().toISOString()
      });

      message.success('Review posted successfully!');
      handleClose();
    } catch (error) {
      message.error('Failed to post review. Please try again.');
      console.error('Error posting review:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <Modal
      title={`Review: ${movie?.Title}`}
      open={open}
      onOk={handleSubmit}
      onCancel={handleClose}
      okText="Post Review"
      cancelText="Cancel"
      confirmLoading={loading}
      destroyOnClose
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Text strong>Rating</Text>
          <div style={{ marginTop: '8px' }}>
            <Rate 
              value={rating} 
              onChange={setRating}
              allowClear
            />
            {rating > 0 && (
              <Text type="secondary" style={{ marginLeft: '12px' }}>
                {rating} {rating === 1 ? 'star' : 'stars'}
              </Text>
            )}
          </div>
        </div>

        <div>
          <Text strong>Your Review</Text>
          <TextArea
            rows={4}
            placeholder="Share your thoughts about this movie..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={500}
            showCount
            style={{ marginTop: '8px' }}
          />
        </div>
      </Space>
    </Modal>
  );
};

ReviewDialog.displayName = 'ReviewDialog';

ReviewDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired
  }),
  onSubmit: PropTypes.func.isRequired
};

export default memo(ReviewDialog);

