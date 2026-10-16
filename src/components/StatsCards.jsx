import { memo } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { 
  VideoCameraOutlined, 
  StarOutlined, 
  CommentOutlined,
  TrophyOutlined 
} from '@ant-design/icons';
import useMovieStore from '../store';

const StatsCards = () => {
  const movies = useMovieStore((state) => state.movies);
  const reviews = useMovieStore((state) => state.reviews || []);

  // Calculate stats
  const totalMovies = movies.length;
  const totalReviews = reviews.length;
  
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const mostReviewedMovie = reviews.length > 0
    ? reviews.reduce((acc, review) => {
        acc[review.movieId] = (acc[review.movieId] || 0) + 1;
        return acc;
      }, {})
    : {};

  const topMovieReviewCount = Math.max(...Object.values(mostReviewedMovie), 0);

  return (
    <div style={{ padding: '24px 24px 0 24px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Movies"
              value={totalMovies}
              prefix={<VideoCameraOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Reviews"
              value={totalReviews}
              prefix={<CommentOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Average Rating"
              value={averageRating}
              prefix={<StarOutlined />}
              suffix="/ 5"
              valueStyle={{ color: '#faad14' }}
              precision={1}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Most Reviewed"
              value={topMovieReviewCount}
              prefix={<TrophyOutlined />}
              suffix="reviews"
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

StatsCards.displayName = 'StatsCards';

export default memo(StatsCards);


