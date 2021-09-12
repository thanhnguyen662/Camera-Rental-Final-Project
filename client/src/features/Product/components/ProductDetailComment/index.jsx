import { Comment, List, Tooltip, Rate } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import './ProductDetailComment.scss';

ProductDetailComment.propTypes = {
   productDetail: PropTypes.object,
};

ProductDetailComment.defaultProps = {
   productDetail: {},
};

function ProductDetailComment(props) {
   const { productDetail } = props;

   return (
      <>
         <div className='productDetailComment'>
            <List
               header={`${productDetail?.productComments?.length} replies`}
               itemLayout='horizontal'
               dataSource={productDetail?.productComments}
               renderItem={(item) => (
                  <li>
                     <Comment
                        actions={[
                           <Rate
                              value={item.rate}
                              allowHalf={true}
                              allowClear={false}
                           />,
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
