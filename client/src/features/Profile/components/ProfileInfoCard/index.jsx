import {
   IdcardOutlined,
   HomeOutlined,
   ClusterOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Typography, Row, Col, Divider, Tag, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';

const { Title, Text } = Typography;

function ProfileInfoCard(props) {
   const { email, photoURL, name, userProfile } = props;
   const [split, setSplit] = useState();
   useEffect(() => {
      if (userProfile?.hasTag) {
         const splitStr = userProfile?.hasTag.split(/[\s,]+/);
         setSplit(splitStr);
      } else {
         console.log('WAIT HASTAG');
      }
   }, [userProfile?.hasTag]);

   console.log('splitStr: ', split);

   return (
      <>
         <Card>
            <Row justify='center'>
               <Col>
                  <Avatar
                     size={80}
                     src={photoURL}
                     style={{ marginBottom: '10px' }}
                  />
               </Col>
            </Row>
            <Row justify='center'>
               <Col>
                  <Title level={4} style={{ margin: '3px 0px 1px' }}>
                     {name}
                  </Title>
               </Col>
            </Row>
            <Row justify='center'>
               <Col>
                  <Text italic='true'>{email}</Text>
               </Col>
            </Row>

            {!userProfile ? (
               <Spin />
            ) : (
               <>
                  <Row style={{ marginTop: '20px' }}>
                     <Col flex='28px' offset={2}>
                        <IdcardOutlined />
                     </Col>
                     <Col flex='auto'>
                        <Text>{userProfile?.firebaseId}</Text>
                     </Col>
                  </Row>
                  <Row>
                     <Col flex='28px' offset={2}>
                        <ClusterOutlined />
                     </Col>
                     <Col flex='auto'>
                        <Text>Lorem ipsum dolor sit amet, consectetuer</Text>
                     </Col>
                  </Row>
                  <Row>
                     <Col flex='28px' offset={2}>
                        <HomeOutlined />
                     </Col>
                     <Col flex='auto'>
                        <Text>{userProfile?.address}</Text>
                     </Col>
                  </Row>
               </>
            )}

            <Divider orientation='left'>#hastag</Divider>
            {!split ? (
               <></>
            ) : (
               split.map((hastag) => (
                  <Tag key={split.indexOf(hastag)}>{hastag}</Tag>
               ))
            )}
            <Divider orientation='left'>favourite gear</Divider>
            <Row gutter={[24, 24]}>
               <Col span={12}>TEST</Col>
               <Col span={12}>TEST</Col>

               <Col span={12}>TEST</Col>
               <Col span={12}>TEST</Col>
            </Row>
         </Card>
      </>
   );
}

export default ProfileInfoCard;
