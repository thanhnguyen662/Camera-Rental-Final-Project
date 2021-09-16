import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileInfoCard from '../../components/ProfileInfoCard';
import ProfileRelationCard from '../../components/ProfileRelationCard';
import userApi from '../../../../api/userApi';

function ProfilePage(props) {
   const name = useSelector((state) => state.users.name);
   const photoURL = useSelector((state) => state.users.photoURL);
   const uid = useSelector((state) => state.users.id);

   const [userProfile, setUserProfile] = useState();

   useEffect(() => {
      if (!uid) return;
      const getUserProfile = async () => {
         const response = await userApi.getUserProfile({ firebaseId: uid });
         setUserProfile(response);
      };
      getUserProfile();
   }, [uid]);

   return (
      <>
         <Row gutter={[20, 0]}>
            <Col span={17}>
               <ProfileInfoCard
                  photoURL={photoURL}
                  name={name}
                  userProfile={userProfile}
               />
            </Col>
            <Col span={7}>
               <ProfileRelationCard userProfile={userProfile} />
            </Col>
         </Row>
      </>
   );
}

export default ProfilePage;
