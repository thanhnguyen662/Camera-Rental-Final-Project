import { MessageOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Skeleton, Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import conversationApi from '../../../../api/conversationApi';
import './ProductDetailUser.scss';

ProductDetailUser.propTypes = {
   productDetail: PropTypes.object,
   myProduct: PropTypes.number,
   myStats: PropTypes.object,
};

ProductDetailUser.defaultProps = {
   productDetail: {},
   myProduct: 0,
   myStats: {},
};

const { Text } = Typography;

function ProductDetailUser(props) {
   const { productDetail, myProduct, myStats } = props;

   const userId = useSelector((state) => state.users.id);

   const [sendMessage, setSendMessage] = useState();

   const onClickSendMessage = async () => {
      try {
         const data = {
            senderId: userId,
            receiverId: productDetail.User.firebaseId,
         };
         const response = await conversationApi.createConversation(data);
         console.log('conversation: ', response);
         setSendMessage(response);
      } catch (error) {
         console.log(error);
      }
   };

   const disableMessageButton = userId === productDetail.User?.firebaseId && {
      disabled: true,
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
         <Row span={24} className='user' justify='space-around' align='middle'>
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
                              {...disableMessageButton}
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
                  <Col span={13}>
                     <div className='infoGird'>
                        <Row className='infoRow'>
                           <Col span={8}>
                              <Space direction='vertical '>
                                 <Text className='titleRate'>Product</Text>
                                 <Text className='titleScore'>
                                    {myProduct || 0}
                                 </Text>
                              </Space>
                           </Col>
                           <Col span={8}>
                              <Space direction='vertical '>
                                 <Text className='titleRate'>Rate</Text>
                                 <Text className='titleScore'>
                                    {productDetail.User.rate || 0}
                                 </Text>
                              </Space>
                           </Col>
                           <Col span={8}>
                              <Space direction='vertical '>
                                 <Text className='titleRate'>Orders</Text>
                                 <Text className='titleScore'>
                                    {myStats.totalOrder || 0}
                                 </Text>
                              </Space>
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
