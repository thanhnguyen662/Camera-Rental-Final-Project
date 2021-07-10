import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileInfoCard from '../../components/ProfileInfoCard';
import ProfileRelationCard from '../../components/ProfileRelationCard';
import userApi from '../../../../api/userApi';

function ProfilePage(props) {
   const email = useSelector((state) => state.users.email);
   const name = useSelector((state) => state.users.name);
   const photoURL = useSelector((state) => state.users.photoURL);
   const uid = useSelector((state) => state.users.id);
   const [userProfile, setUserProfile] = useState();

   useEffect(() => {
      const getUserProfile = async () => {
         if (!uid) return console.log('WAIT');
         const response = await userApi.getUserProfile({ firebaseId: uid });
         setUserProfile(response);
      };
      getUserProfile();
   }, [uid]);

   return (
      <>
         <div style={{ minHeight: 360 }}>
            <Row gutter={[25, 0]}>
               <Col span={8}>
                  <ProfileInfoCard
                     email={email}
                     photoURL={photoURL}
                     name={name}
                     userProfile={userProfile}
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
