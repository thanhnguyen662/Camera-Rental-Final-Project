import './Lading.scss';
import { Col, Layout, Row, Avatar, List, Button, Input, Image } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import {
   HomeOutlined,
   UsergroupAddOutlined,
   CameraOutlined,
   LinkOutlined,
} from '@ant-design/icons';

const { Content } = Layout;

function LadingPage(props) {
   const photoURL = useSelector((state) => state.users.photoURL);
   const userName = useSelector((state) => state.users.name);
   const userEmail = useSelector((state) => state.users.email);

   const data = [
      {
         title: <b style={{ fontSize: '15px', color: '#474747' }}>Home</b>,
         icon: (
            <HomeOutlined
               style={{
                  fontSize: '20px',
                  marginLeft: '5px',
                  color: '#929292',
               }}
            />
         ),
      },
      {
         title: <b style={{ fontSize: '15px', color: '#474747' }}>People</b>,
         icon: (
            <UsergroupAddOutlined
               style={{
                  fontSize: '20px',
                  marginLeft: '5px',
                  color: '#929292',
               }}
            />
         ),
      },
      {
         title: <b style={{ fontSize: '15px', color: '#474747' }}>Photos</b>,
         icon: (
            <CameraOutlined
               style={{
                  fontSize: '20px',
                  marginLeft: '5px',
                  color: '#929292',
               }}
            />
         ),
      },
   ];

   return (
      <>
         <Content style={{ margin: '15px 92px' }}>
            <Row>
               <Col span={5}>
                  <div className='content'>
                     <Row span={24}>
                        <Col span={6}>
                           <Avatar size={45} src={photoURL} />
                        </Col>
                        <Col span={18}>
                           <b>{userName}</b>
                           <p>{userEmail}</p>
                        </Col>
                     </Row>
                  </div>

                  <Row>
                     <div className='list'>
                        <List
                           dataSource={data}
                           renderItem={(item) => (
                              <>
                                 <List.Item>
                                    {item.icon} {item.title}
                                 </List.Item>
                              </>
                           )}
                        />
                     </div>
                  </Row>
               </Col>

               <Col span={14}>
                  <Row span={24}>
                     <div className='postStatus'>
                        <Row span={24}>
                           <Col flex='50px'>
                              <Avatar size={45} src={photoURL} />
                           </Col>
                           <Col span={18}>
                              <Input
                                 className='input'
                                 placeholder={`What's news, ${userName}?`}
                              />
                           </Col>
                           <Col span={4}>
                              <Button
                                 type='primary'
                                 shape='round'
                                 icon={<LinkOutlined />}
                                 size='large'
                              >
                                 Post it
                              </Button>
                           </Col>
                        </Row>
                     </div>
                  </Row>
                  <Row span={24}>
                     <div className='post'>
                        <Row span={24}>
                           <Col flex='50px'>
                              <Avatar size={45} src={photoURL} />
                           </Col>
                           <Col span={18}>
                              <b>{userName}</b>
                              <p>10 minutes ago</p>
                           </Col>
                        </Row>
                        <Row span={24}>
                           <Image
                              className='postImage'
                              width={200}
                              src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                           />
                        </Row>
                     </div>
                  </Row>
               </Col>
               <Col span={5} style={{ background: 'green' }}>
                  col-8
               </Col>
            </Row>
         </Content>
      </>
   );
}

export default LadingPage;
