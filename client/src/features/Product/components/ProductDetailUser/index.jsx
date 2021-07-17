import { MessageOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Space, Divider, Skeleton } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import conversationApi from '../../../../api/conversationApi';
import './ProductDetailUser.scss';

ProductDetailUser.propTypes = {
   userDetail: PropTypes.object,
   productDetail: PropTypes.object,
};

ProductDetailUser.defaultProps = {
   userDetail: {},
   productDetail: {},
};

function ProductDetailUser(props) {
   const { userDetail, productDetail } = props;
   const userId = useSelector((state) => state.users.id);

   const onClickSendMessage = async () => {
      try {
         if (!userId || !productDetail?.firebaseId)
            return console.log('WAIT FOR REDUX');
         const formValues = {
            senderId: userId,
            receiverId: productDetail?.firebaseId,
         };
         const response = await conversationApi.createConversation(formValues);
         console.log('Conversation created: ', response);

         localStorage.setItem('selectedConversation', JSON.stringify(response));
         window.location = '/message';
      } catch (error) {
         return console.log('Error: ', error);
      }
   };

   return (
      <>
         <Row span={24} className='user'>
            {!userDetail.photoURL || !userDetail.displayName ? (
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
                        src={userDetail?.photoURL}
                     />
                  </Col>
                  <Col span={7} className='userInfo'>
                     <h4>{userDetail.displayName}</h4>
                     <h5>{userDetail.email}</h5>
                     <div className='buttonGroup'>
                        <Space size={10}>
                           <Button
                              icon={<MessageOutlined />}
                              onClick={onClickSendMessage}
                           >
                              Message
                           </Button>
                           <Button>
                              <Link to={`/profile/${userDetail.uid}`}>
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
