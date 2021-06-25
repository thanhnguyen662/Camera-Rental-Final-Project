import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Avatar, Row, Col } from 'antd';
import {
   EditOutlined,
   EllipsisOutlined,
   HeartOutlined,
} from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import productApi from '../../../../api/productApi';

const { Meta } = Card;

ProductCard.propTypes = {
   products: PropTypes.array,
};

ProductCard.defaultProps = {
   products: [],
};

function ProductCard(props) {
   const { products } = props;

   const callApiTest = async () => {
      try {
         const response = await productApi.getAllProducts();

         console.log('response test: ', response);
      } catch (error) {
         return console.log('Fail: ', error);
      }
   };

   return (
      <>
         <button onClick={callApiTest}>TEST</button>
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
                        style={{
                           color: 'black',
                        }}
                        avatar={
                           <Link to={`/profile/${product.authorId}`}>
                              <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                           </Link>
                        }
                        title={
                           <Text strong>
                              <Link to={`/product/${product.slug}`}>
                                 {product.name}
                              </Link>
                           </Text>
                        }
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
