import { Avatar, Col, Input, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './SocialInputComment.scss';

SocialInputComment.propTypes = {
   photoURL: PropTypes.string,
   userId: PropTypes.string,
   handleCommentInputEnter: PropTypes.func,
};

SocialInputComment.defaultProps = {
   photoURL: '',
   userId: '',
   handleCommentInputEnter: null,
};

function SocialInputComment(props) {
   const { photoURL, userId, postDetail, handleCommentInputEnter } = props;

   const [commentInput, setCommentInput] = useState('');
   const [commentInputPostId, setCommentInputPostId] = useState(0);

   const onPressInputEnter = () => {
      const formData = {
         content: commentInput,
         postId: commentInputPostId,
         userId: userId,
      };
      handleCommentInputEnter(formData);
   };

   return (
      <>
         <div className='socialCommentInput'>
            <Row gutter={[15, 0]}>
               <Col>
                  <Avatar src={photoURL} size={40} />
               </Col>
               <Col flex='auto'>
                  <Input
                     value={commentInput}
                     placeholder='Write your comment...'
                     onChange={(e) => setCommentInput(e.target.value)}
                     onClick={() => setCommentInputPostId(postDetail.id)}
                     onPressEnter={() => {
                        onPressInputEnter();
                        setCommentInput('');
                     }}
                  />
               </Col>
            </Row>
         </div>
      </>
   );
}

export default SocialInputComment;
