import {
   IdcardOutlined,
   HomeOutlined,
   ClusterOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Typography, Row, Col, Divider, Tag } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

function ProfileInfoCard(props) {
   const { email, photoURL, name } = props;

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
            <Row style={{ marginTop: '20px' }}>
               <Col flex='28px' offset={2}>
                  <IdcardOutlined />
               </Col>
               <Col flex='auto'>
                  <Text>But I must explain to</Text>
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
                  <Text>Far far away</Text>
               </Col>
            </Row>
            <Divider orientation='left'>#hastag</Divider>
            <Tag>🧧 But I must explain to</Tag>
            <Tag>🎎 Far far</Tag>
            <Tag>🎞 dolor sit amet</Tag>
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
