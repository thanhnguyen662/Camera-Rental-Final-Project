import { CommentOutlined } from '@ant-design/icons';
import { Button, Col, Image, Row, Space, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import './ProfileInfoCard.scss';

const { Title, Text } = Typography;

function ProfileInfoCard(props) {
   const { photoURL, name, userProfile } = props;
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

   const tagColor = ['#f50', '#2db7f5', ' #87d068', ' #108ee9'];
   const tag = (t) => {
      const random = Math.floor(Math.random() * tagColor.length);
      return (
         <Tag color={tagColor[random]} key={t}>
            {t}
         </Tag>
      );
   };

   return (
      <>
         <div className='infoCard'>
            <div className='coverImage'>
               <Image src={source.header} preview={false} />
            </div>
            <div className='avatarImage'>
               <Image src={photoURL} />
            </div>
            <div className='userInfo'>
               <Row>
                  <Col flex='auto' offset={5}>
                     <Title level={2} className='name'>
                        {name}
                     </Title>
                     <Text className='description'>
                        {userProfile?.description}
                     </Text>
                     <Text className='address'>{userProfile?.address}</Text>
                     <div className='tag'>{split?.map((t) => tag(t))}</div>
                  </Col>
                  <Col flex='165px'>
                     <Button className='sendMessage' type='primary'>
                        <Space>
                           <CommentOutlined />
                           <div>Send Message</div>
                        </Space>
                     </Button>
                  </Col>
               </Row>
            </div>
         </div>
      </>
   );
}

export default ProfileInfoCard;
