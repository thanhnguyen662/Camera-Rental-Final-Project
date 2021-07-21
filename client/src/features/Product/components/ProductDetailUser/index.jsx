import { MessageOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Space, Divider, Skeleton } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import conversationApi from '../../../../api/conversationApi';

import './ProductDetailUser.scss';

ProductDetailUser.propTypes = {
   productDetail: PropTypes.object,
};

ProductDetailUser.defaultProps = {
   productDetail: {},
};

function ProductDetailUser(props) {
   const { productDetail } = props;
   const userId = useSelector((state) => state.users.id);
   const [sendMessage, setSendMessage] = useState();

   const onClickSendMessage = async () => {
      try {
         const data = {
            senderId: userId,
            receiverId: productDetail.User.firebaseId,
         };
         const response = await conversationApi.createConversation(data);
         console.log('conversation Test: ', response);
         setSendMessage(response);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         {sendMessage === undefined ? null : (
            <Redirect
               to={{
                  pathname: '/messageBeta',
                  state: {
                     conversationInfo: sendMessage,
                     conversationUserInfo: productDetail.User,
                  },
               }}
            />
         )}
         <Row span={24} className='user'>
            {!productDetail.User?.photoURL || !productDetail.User?.username ? (
               <>
                  <Skeleton.Input
                     active
                     className='avatarLoading'
                     size='small'
                  />
               </>
            ) : (
               <>
                  <Col span={2}>
                     <Avatar
                        className='userAvatar'
                        size={82}
                        src={productDetail.User.photoURL}
                     />
                  </Col>
                  <Col span={7} className='userInfo'>
                     <h4>{productDetail.User.username}</h4>
                     <div className='buttonGroup'>
                        <Space size={10}>
                           <Button
                              icon={<MessageOutlined />}
                              onClick={onClickSendMessage}
                           >
                              Message
                           </Button>
                           <Button>
                              <Link
                                 to={`/profile/${productDetail.User?.firebaseId}`}
                              >
                                 Profile
                              </Link>
                           </Button>
                        </Space>
                     </div>
                  </Col>
                  <Col span={1}>
                     <Divider type='vertical' className='dividerBar' />
                  </Col>
                  <Col span={13}>
                     <div className='infoGird'>
                        <Row className='infoRow'>
                           <Col span={8} className='infoCol'>
                              <h6 className='titleRate'>Product</h6>
                              <h6 className='titleScore'>24</h6>
                           </Col>
                           <Col span={8} className='infoCol'>
                              <h6 className='titleRate'>Rate</h6>
                              <h6 className='titleScore'>4.5</h6>
                           </Col>
                           <Col span={8} className='infoCol'>
                              <h6 className='titleRate'>Follows</h6>
                              <h6 className='titleScore'>194</h6>
                           </Col>
                        </Row>
                     </div>
                  </Col>
               </>
            )}
         </Row>
      </>
   );
}

export default ProductDetailUser;
