import { memo } from 'react';
import PropTypes from 'prop-types';
import { Layout, Input, Typography, Flex } from 'antd';
import styles from './navbar.module.css';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = ({ onSearch }) => {
  return (
    <Layout>
      <Header className={styles.header}>
        <Flex align="center" justify="space-between" className={styles.headerFlex}>
          <Title level={3} className={styles.title}>
            Movie Review Dashboard
          </Title>
          <Input.Search
            placeholder="Search movie name"
            onSearch={onSearch}
            className={styles.searchInput}
            allowClear
          />
        </Flex>
      </Header>
    </Layout>
  );
};

Navbar.displayName = 'Navbar';

Navbar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default memo(Navbar);
