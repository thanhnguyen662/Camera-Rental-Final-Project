import React from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Row, Col } from 'antd';
import {
   EditOutlined,
   EllipsisOutlined,
   HeartOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

ProductCard.propTypes = {
   products: PropTypes.array,
};

ProductCard.defaultProps = {
   products: [],
};

function ProductCard(props) {
   const { products } = props;
   return (
      <>
         <Row gutter={[25, 25]} justify='center'>
            {products.map((product) => (
               <Col flex='none' key={product.id}>
                  <Card
                     size='small'
                     hoverable
                     style={{ width: 300 }}
                     cover={
                        <img
                           alt='example'
                           src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                        />
                     }
                     actions={[
                        <HeartOutlined key='heart' />,
                        <EditOutlined key='edit' />,
                        <EllipsisOutlined key='ellipsis' />,
                     ]}
                  >
                     <Meta
                        avatar={
                           <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                        }
                        title={product.name}
                        description={product.description}
                     />
                  </Card>
               </Col>
            ))}
         </Row>
      </>
   );
}

export default ProductCard;
