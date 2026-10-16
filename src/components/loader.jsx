import { memo } from 'react';
import { Spin, Flex } from 'antd';

const Loader = () => {
    return (
        <Flex justify="center" style={{ padding: '2rem' }}>
            <Spin size="large" />
        </Flex>
    );
};

Loader.displayName = 'Loader';

export default memo(Loader);