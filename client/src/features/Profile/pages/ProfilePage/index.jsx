import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Route, useParams, useRouteMatch } from 'react-router';
import productApi from '../../../../api/productApi';
import userApi from '../../../../api/userApi';
import ProfileContent from '../../components/ProfileContent';
import ProfileInfoCard from '../../components/ProfileInfoCard';
import ProfileRelationCard from '../../components/ProfileRelationCard';
import ProfileSearchBar from '../../components/ProfileSearchBar';

function ProfilePage(props) {
   const { userId } = useParams();

   const match = useRouteMatch();

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
      const getAllProduct = async () => {
         try {
            const userProduct = await productApi.allProductInShop({
               userId: userId,
               page: allProductPage,
            });
            userProduct.length >= 10
               ? setShowButton(true)
               : setShowButton(false);
            setAllUserProduct((prev) => [...prev, ...userProduct]);
         } catch (error) {
            console.log(error);
         }
      };
      getAllProduct();
   }, [userId, allProductPage]);

   useEffect(() => {
      setAllProductPage(1);
      setAllUserProduct([]);
   }, [userId]);

   const handleShowMoreAllProduct = () => {
      setAllProductPage(allProductPage + 1);
   };

   return (
      <>
         <Row gutter={[15, 0]} wrap={false}>
            <Col span={18}>
               <ProfileInfoCard userProfile={userProfile} userId={userId} />
               <ProfileSearchBar />
               <div style={{ marginTop: 15 }}>
                  <Route
                     path={`${match.url}/new`}
                     render={() => <h1>new</h1>}
                  />
                  <Route
                     exact
                     path={`${match.url}`}
                     render={() => (
                        <ProfileContent
                           newUserProduct={newUserProduct}
                           topUserProduct={topUserProduct}
                           allUserProduct={allUserProduct}
                           handleShowMoreAllProduct={handleShowMoreAllProduct}
                           showButton={showButton}
                        />
                     )}
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
