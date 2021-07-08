import {
   EllipsisOutlined,
   HeartOutlined,
   PlusOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const { Meta } = Card;

ProductCard.propTypes = {
   products: PropTypes.array,
   onClickToAddProduct: PropTypes.func,
};

ProductCard.defaultProps = {
   products: [],
   onClickToAddProduct: null,
};

function ProductCard(props) {
   const { products, onClickToAddProduct } = props;

   return (
      <>
         <Row gutter={[25, 25]} justify='center'>
            {products.map((product) => (
               <Col flex='none' key={product.id}>
                  <Card
                     key={product.id}
                     size='small'
                     hoverable
                     style={{ width: 287 }}
                     cover={
                        <img
                           alt='example'
                           src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                        />
                     }
                     actions={[
                        <HeartOutlined key='heart' />,
                        <PlusOutlined
                           key='plus'
                           onClick={() => onClickToAddProduct(product)}
                        />,
                        <EllipsisOutlined key='ellipsis' />,
                     ]}
                  >
                     <Meta
                        key={product.id}
                        style={{
                           color: 'black',
                        }}
                        avatar={
                           <Link to={`/profile/${product.firebaseId}`}>
                              {!product.User?.photoURL ? (
                                 <Avatar></Avatar>
                              ) : (
                                 <Avatar src={product.User?.photoURL} />
                              )}
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
