import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileInfoCard from '../../components/ProfileInfoCard';
import ProfileRelationCard from '../../components/ProfileRelationCard';
import userApi from '../../../../api/userApi';
import productApi from '../../../../api/productApi';
import ProfileContent from '../../components/ProfileContent';

function ProfilePage(props) {
   const name = useSelector((state) => state.users.name);
   const photoURL = useSelector((state) => state.users.photoURL);
   const userId = useSelector((state) => state.users.id);

   const [userProfile, setUserProfile] = useState({});
   const [userStats, setUserStats] = useState({});
   const [userProduct, setUserProduct] = useState([]);

   useEffect(() => {
      if (!userId) return;
      const getUserProfile = async () => {
         try {
            const response = await userApi.getUserProfile({
               firebaseId: userId,
            });
            setUserProfile(response);

            const userStats = await userApi.getUserStats({ userId: userId });
            setUserStats(userStats);
         } catch (error) {
            console.log(error);
         }
      };
      getUserProfile();
   }, [userId]);

   useEffect(() => {
      if (!userId) return;
      const getUserProduct = async () => {
         try {
            const response = await productApi.getMyProduct({
               firebaseId: userId,
            });
            setUserProduct(response);
            console.log(response);
         } catch (error) {
            console.log(error);
         }
      };
      getUserProduct();
   }, [userId]);

   return (
      <>
         <Row gutter={[15, 0]} wrap={false}>
            <Col span={17}>
               <ProfileInfoCard
                  photoURL={photoURL}
                  name={name}
                  userProfile={userProfile}
                  userId={userId}
               />
               <div style={{ marginTop: 15 }}>
                  <ProfileContent userProduct={userProduct} />
               </div>
            </Col>
            <Col span={7}>
               <ProfileRelationCard
                  userProfile={userProfile}
                  userStats={userStats}
               />
            </Col>
         </Row>
      </>
   );
}

export default ProfilePage;
