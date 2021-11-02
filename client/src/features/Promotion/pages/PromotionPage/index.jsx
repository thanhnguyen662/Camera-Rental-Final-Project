import React, { useEffect, useState } from 'react';
import postApi from '../../../../api/postApi';
// import PropTypes from 'prop-types';
import PromotionCard from '../../components/PromotionCard';

PromotionPage.propTypes = {};

function PromotionPage(props) {
   const [latestPost, setLatestPost] = useState([]);

   useEffect(() => {
      const getLatestPost = async () => {
         try {
            const response = await postApi.getLatestPost();
            setLatestPost(response);
         } catch (error) {
            console.log(error);
         }
      };
      getLatestPost();
   }, []);

   return (
      <>
         <PromotionCard latestPost={latestPost} />
      </>
   );
}

export default PromotionPage;
