import { Col, Comment, Rate, Row, Tooltip } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import userApi from '../../../../api/userApi';
import './OrderDetailComment.scss';

OrderDetailComment.propTypes = {
   comment: PropTypes.object,
};

OrderDetailComment.defaultProps = {
   comment: {},
};

function OrderDetailComment(props) {
   const { comment } = props;
   const [authorDetail, setAuthorDetail] = useState({});
   useEffect(() => {
      const getInfo = async () => {
         const response = await userApi.getUserProfile({
            firebaseId: comment.authorId,
         });
         setAuthorDetail(response);
      };
      getInfo();
   }, [comment.authorId]);

   return (
      <>
         <div>
            <Row>
               <Col flex='auto'>
                  <Comment
                     className='orderDetailComment'
                     author={authorDetail.username}
                     avatar={
                        <img
                           src={authorDetail.photoURL}
                           alt={authorDetail.username}
                           style={{ width: 35, height: 35, objectFit: 'cover' }}
                        />
                     }
                     content={<p>{comment.content}</p>}
                     datetime={
                        <Tooltip
                           title={moment(comment.createdAt).format(
                              'YYYY-MM-DD HH:mm:ss'
                           )}
                        >
                           <span>{moment(comment.createdAt).fromNow()}</span>
                        </Tooltip>
                     }
                  />
               </Col>
               <Col>
                  <Rate
                     value={comment.rate}
                     allowHalf={true}
                     allowClear={true}
                  />
               </Col>
            </Row>
         </div>
      </>
   );
}

export default OrderDetailComment;
