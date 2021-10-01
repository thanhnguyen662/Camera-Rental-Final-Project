import { CommentOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Image, Row, Space, Tag, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import conversationBeta1Api from '../../../../api/conversationBeta1Api';
import './ProfileInfoCard.scss';

const { Title, Text } = Typography;

ProfileInfoCard.propTypes = {
   userId: PropTypes.string,
   userProfile: PropTypes.object,
};

ProfileInfoCard.defaultProps = {
   userId: '',
   userProfile: {},
};

function ProfileInfoCard(props) {
   const loginUserId = useSelector((state) => state.users.id);

   const { userProfile } = props;
   const history = useHistory();
   const [split, setSplit] = useState();

   useEffect(() => {
      if (!userProfile?.hasTag) return;
      const splitStr = userProfile?.hasTag.split(/[\s,]+/);
      setSplit(splitStr);
   }, [userProfile?.hasTag]);

   const source = {
      header:
         'https://images.hdqwalls.com/download/simple-blue-gradients-abstract-8k-nh-1366x768.jpg',
   };

   const tag = (t) => {
      const tagColor = ['#f50', '#2db7f5', ' #87d068', ' #108ee9'];
      const random = Math.floor(Math.random() * tagColor.length);
      return (
         <Tag color={tagColor[random]} key={t}>
            {t}
         </Tag>
      );
   };

   const onClickSendMessage = async () => {
      try {
         const response = await conversationBeta1Api.createConversation({
            userId1: loginUserId,
            userId2: userProfile.firebaseId,
         });
         history.push(`/messageBeta1/${response.id}`);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <div className='infoCard'>
            <div className='coverImage'>
               <Image src={source.header} preview={false} />
            </div>
            <div className='avatarImage'>
               <Image src={userProfile?.photoURL} />
            </div>
            <div className='userInfo'>
               <Row>
                  <Col flex='auto' offset={5}>
                     <Title level={2} className='name'>
                        {userProfile?.username}
                     </Title>
                     <Text className='description'>
                        {userProfile?.description}
                     </Text>
                     <Text className='address'>{userProfile?.address}</Text>
                     <div className='tag'>{split?.map((t) => tag(t))}</div>
                  </Col>
                  <Col flex='165px' align='middle'>
                     {loginUserId === userProfile?.firebaseId ? (
                        <Link to='/profile/edit'>
                           <Button className='sendMessage'>
                              <Space>
                                 <UserOutlined />
                                 <div>Edit Profile</div>
                              </Space>
                           </Button>
                        </Link>
                     ) : (
                        <Button
                           className='sendMessage'
                           type='primary'
                           onClick={onClickSendMessage}
                        >
                           <Space>
                              <CommentOutlined />
                              <div>Send Message</div>
                           </Space>
                        </Button>
                     )}
                  </Col>
               </Row>
            </div>
         </div>
      </>
   );
}

export default ProfileInfoCard;
