import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import ProfileInfoCard from '../../components/ProfileInfoCard';
import ProfileRelationCard from '../../components/ProfileRelationCard';

function ProfilePage(props) {
   const email = useSelector((state) => state.users.email);
   const name = useSelector((state) => state.users.name);
   const photoURL = useSelector((state) => state.users.photoURL);

   return (
      <>
         <div style={{ paddingTop: 24, minHeight: 360 }}>
            <Row gutter={[12, 0]}>
               <Col span={8}>
                  <ProfileInfoCard
                     email={email}
                     photoURL={photoURL}
                     name={name}
                  />
               </Col>
               <Col flex='auto'>
                  <ProfileRelationCard />
               </Col>
            </Row>
         </div>
      </>
   );
}

export default ProfilePage;
