import React from 'react';
// import PropTypes from 'prop-types';
import './ProductDetailComment.scss';
import { Comment, List } from 'antd';
import moment from 'moment';

ProductDetailComment.propTypes = {};

function ProductDetailComment(props) {
   const { productDetail } = props;
   return (
      <>
         <div className='productDetailComment'>
            <List
               className='comment-list'
               header={`${productDetail?.productComments?.length} replies`}
               itemLayout='horizontal'
               dataSource={productDetail?.productComments}
               renderItem={(item) => (
                  <li>
                     <Comment
                        author={item.user.username}
                        avatar={item.user.photoURL}
                        content={item.content}
                        datetime={moment(item.createdAt).fromNow()}
                     />
                  </li>
               )}
            />
         </div>
      </>
   );
}

export default ProductDetailComment;
