import { Col, Layout, Row } from 'antd';
import React from 'react';
import ProfileInfoCard from '../ProfileInfoCard';
import ProfileRelationCard from '../ProfileRelationCard';
import { useSelector } from 'react-redux';

const { Content } = Layout;

function ProfileForm(props) {
   const email = useSelector((state) => state.users.email);
   const photoURL = useSelector((state) => state.users.photoURL);
   return (
      <>
         <Content style={{ margin: '0 16px' }}>
            <div style={{ paddingTop: 24, minHeight: 360 }}>
               <Row gutter={[12, 0]}>
                  <Col span={8}>
                     <ProfileInfoCard email={email} photoURL={photoURL} />
                  </Col>
                  <Col flex='auto'>
                     <ProfileRelationCard />
                  </Col>
               </Row>
            </div>
         </Content>
      </>
   );
}

export default ProfileForm;
