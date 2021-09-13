import {
   IdcardOutlined,
   MessageOutlined,
   PhoneOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Row, Skeleton, Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import conversationApi from '../../../../api/conversationApi';
import './ProductDetailUser.scss';

ProductDetailUser.propTypes = {
   productDetail: PropTypes.object,
   myStats: PropTypes.object,
};

ProductDetailUser.defaultProps = {
   productDetail: {},
   myStats: {},
};

const { Text } = Typography;

function ProductDetailUser(props) {
   const { productDetail, myStats } = props;

   const userId = useSelector((state) => state.users.id);
   const [sendMessage, setSendMessage] = useState();

   const onClickSendMessage = async () => {
      try {
         const data = {
            senderId: userId,
            receiverId: productDetail.User.firebaseId,
         };
         const response = await conversationApi.createConversation(data);
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
         <Row span={24} className='user' align='middle'>
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
                  <Col span={6}>
                     <Avatar
                        className='userAvatar'
                        size={78}
                        src={productDetail.User.photoURL}
                     />
                  </Col>
                  <Col span={18} className='userInfo'>
                     <div>
                        <Text className='userName'>
                           {productDetail.User.username}
                        </Text>
                        <div style={{ display: 'block' }}>
                           <Space>
                              <PhoneOutlined className='phoneNumber' />
                              <Text className='phoneNumber'>
                                 {productDetail.User.phoneNumber}
                              </Text>
                           </Space>
                        </div>
                        <div>
                           <Space>
                              <IdcardOutlined className='phoneNumber' />
                              <Text className='phoneNumber'>
                                 {productDetail.User.description}
                              </Text>
                           </Space>
                        </div>
                     </div>
                  </Col>
                  <Col span={24}>
                     <div className='infoGird'>
                        <Row className='infoRow'>
                           <Col span={8}>
                              <Space direction='vertical' size={4}>
                                 <Text className='titleScore'>
                                    {myStats.user?._count.products}
                                 </Text>
                                 <Text className='titleRate'>Product</Text>
                              </Space>
                           </Col>
                           <Col span={8}>
                              <Space direction='vertical' size={4}>
                                 <Text className='titleScore'>
                                    {productDetail.User.rate || 0} / 5
                                 </Text>
                                 <Text className='titleRate'>Rate</Text>
                              </Space>
                           </Col>
                           <Col span={8}>
                              <Space direction='vertical' size={4}>
                                 <Text className='titleScore'>
                                    {myStats.user?._count.orders}
                                 </Text>
                                 <Text className='titleRate'>Orders</Text>
                              </Space>
                           </Col>
                        </Row>
                     </div>
                  </Col>
                  <Col span={24}>
                     <div className='buttonGroup'>
                        <Space size={15}>
                           <Button
                              icon={<MessageOutlined />}
                              onClick={onClickSendMessage}
                              {...disableMessageButton}
                           >
                              Message
                           </Button>
                           <Button type='primary'>
                              <Link
                                 to={`/profile/${productDetail.User?.firebaseId}`}
                              >
                                 Profile
                              </Link>
                           </Button>
                        </Space>
                     </div>
                  </Col>
               </>
            )}
         </Row>
      </>
   );
}

export default ProductDetailUser;
