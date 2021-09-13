import {
   Comment,
   List,
   Tooltip,
   Rate,
   Row,
   Col,
   Pagination,
   Empty,
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import productApi from '../../../../api/productApi';
import './ProductDetailComment.scss';

ProductDetailComment.propTypes = {
   productDetail: PropTypes.object,
};

ProductDetailComment.defaultProps = {
   productDetail: {},
};

function ProductDetailComment(props) {
   const { productDetail } = props;
   const [comments, setComments] = useState([]);
   const [page, setPage] = useState(1);

   useEffect(() => {
      if (!productDetail.id) return;
      try {
         const getCommentsInProduct = async () => {
            const response = await productApi.getProductComment({
               productId: productDetail.id,
               page: page,
            });
            setComments(response);
         };
         getCommentsInProduct();
      } catch (error) {
         console.log(error);
      }
   }, [productDetail, page]);

   const listHeader = () => {
      return (
         <>
            <Row align='middle'>
               <Col flex='auto'>
                  <div>{comments.count} replies</div>
               </Col>
               <Col>
                  <Pagination
                     defaultCurrent={1}
                     total={comments.count}
                     current={page}
                     pageSize={4}
                     onChange={(value) => setPage(value)}
                     size='small'
                  />
               </Col>
            </Row>
         </>
      );
   };

   return (
      <>
         <div className='productDetailComment'>
            <List
               header={listHeader()}
               itemLayout='horizontal'
               dataSource={comments.comments}
               locale={{
                  emptyText: (
                     <Empty description='No Comment' className='emptyComment' />
                  ),
               }}
               renderItem={(item) => (
                  <li>
                     <Comment
                        actions={[
                           <Rate
                              value={item.rate}
                              allowHalf={true}
                              allowClear={false}
                           />,
                           <div>&nbsp;&nbsp;{item.rate}</div>,
                        ]}
                        author={item.user.username}
                        avatar={item.user.photoURL}
                        content={item.content}
                        datetime={
                           <Tooltip
                              title={moment(item.createdAt).format(
                                 'YYYY-MM-DD HH:mm:ss'
                              )}
                           >
                              <span>{moment(item.createdAt).fromNow()}</span>
                           </Tooltip>
                        }
                     />
                  </li>
               )}
            />
         </div>
      </>
   );
}

export default ProductDetailComment;
