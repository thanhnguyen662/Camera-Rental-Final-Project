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
   const [allProductPage, setAllProductPage] = useState(1);
   const [showButton, setShowButton] = useState(true);
   const [newUserProduct, setNewUserProduct] = useState([]);
   const [topUserProduct, setTopUserProduct] = useState([]);
   const [allUserProduct, setAllUserProduct] = useState([]);

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
            const newProduct = await productApi.otherProductInShop({
               userId: userId,
            });
            setNewUserProduct(newProduct);

            const topRenting = await productApi.topRentingInShop({
               userId: userId,
            });
            setTopUserProduct(topRenting);
         } catch (error) {
            console.log(error);
         }
      };
      getUserProduct();
   }, [userId]);

   useEffect(() => {
      if (!userId) return;
      const getAllProduct = async () => {
         try {
            const userProduct = await productApi.allProductInShop({
               userId: userId,
               page: allProductPage,
            });
            userProduct.length >= 5
               ? setShowButton(true)
               : setShowButton(false);
            setAllUserProduct((prev) => [...prev, ...userProduct]);
         } catch (error) {
            console.log(error);
         }
      };
      getAllProduct();
   }, [userId, allProductPage]);

   const handleShowMoreAllProduct = () => {
      setAllProductPage(allProductPage + 1);
   };

   return (
      <>
         <Row gutter={[15, 0]} wrap={false}>
            <Col span={18}>
               <ProfileInfoCard
                  photoURL={photoURL}
                  name={name}
                  userProfile={userProfile}
                  userId={userId}
               />
               <div style={{ marginTop: 15 }}>
                  <ProfileContent
                     newUserProduct={newUserProduct}
                     topUserProduct={topUserProduct}
                     allUserProduct={allUserProduct}
                     handleShowMoreAllProduct={handleShowMoreAllProduct}
                     showButton={showButton}
                  />
               </div>
            </Col>
            <Col span={6}>
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
