import React, { useEffect, useState } from 'react';
import postApi from '../../../../api/postApi';
import PropTypes from 'prop-types';
import SocialPostDetailModal from '../../components/SocialPostDetailModal';

SocialPostDetailPage.propTypes = {
   postId: PropTypes.number,
   isModalPostDetailVisible: PropTypes.bool,
   handleCancelPostDetailModal: PropTypes.func,
};

SocialPostDetailPage.defaultProps = {
   postId: 0,
   isModalPostDetailVisible: false,
   handleCancelPostDetailModal: null,
};

function SocialPostDetailPage(props) {
   const { isModalPostDetailVisible, postId, handleCancelPostDetailModal } =
      props;

   const [page, setPage] = useState(1);
   const [postDetailInfo, setPostDetailInfo] = useState({});
   const [postDetailComment, setPostDetailComment] = useState([]);

   useEffect(() => {
      if (!postId) return;
      try {
         const getPostDetail = async () => {
            const response = await postApi.getPostDetail({ postId });
            setPostDetailInfo(response);
         };
         getPostDetail();
      } catch (error) {
         console.log(error);
      }
   }, [postId]);

   useEffect(() => {
      if (!postId) return;
      try {
         const getComment = async () => {
            const response = await postApi.getPostComment({
               postId: postId,
               page: page,
            });
            setPostDetailComment(response);
         };
         getComment();
      } catch (error) {
         console.log(error);
      }
   }, [postId, page]);

   const handleOnClickSeeMore = () => {
      setPage(page + 1);
   };

   return (
      <>
         <SocialPostDetailModal
            postDetailInfo={postDetailInfo}
            postDetailComment={postDetailComment}
            isModalPostDetailVisible={isModalPostDetailVisible}
            handleCancelPostDetailModal={handleCancelPostDetailModal}
         />
      </>
   );
}

export default SocialPostDetailPage;
