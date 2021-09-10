import {
   Col,
   Divider,
   Empty,
   Image,
   Input,
   Row,
   Table,
   Typography,
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import cartApi from '../../../../api/cartApi';
import postApi from '../../../../api/postApi';
import openNotificationWithIcon from '../../../../components/Notification';
import { addProductToCart } from '../../../Product/productSlice';
import SocialPostButtonGroup from '../SocialPostButtonGroup';
import SocialPostDetailModal from '../SocialPostDetailModal';
import SocialPostHeader from '../SocialPostHeader';
import SocialPostProduct from '../SocialPostProduct';
import './SocialPost.scss';

SocialPost.propTypes = {
   photoURL: PropTypes.string,
   posts: PropTypes.array,
   userId: PropTypes.string,
   handleClickLike: PropTypes.func,
   handleClickUnlike: PropTypes.func,
   updateWhenClickAddToCart: PropTypes.func,
   handleOnComment: PropTypes.func,
};

SocialPost.defaultProps = {
   photoURL: '',
   posts: [],
   userId: '',
   handleClickLike: null,
   handleClickUnlike: null,
   updateWhenClickAddToCart: null,
   handleOnComment: null,
};

const { Text } = Typography;

function SocialPost(props) {
   const {
      photoURL,
      posts,
      userId,
      handleClickUnlike,
      handleClickLike,
      updateWhenClickAddToCart,
      handleOnComment,
   } = props;

   const dispatch = useDispatch();

   const [isModalProductVisible, setIsModalProductVisible] = useState(false);
   const [isModalPostDetailVisible, setIsModalPostDetailVisible] =
      useState(false);
   const [selectPost, setSelectPost] = useState([]);
   const [selectPostDetail, setSelectPostDetail] = useState({});
   const [commentInput, setCommentInput] = useState('');
   const [commentInputPostId, setCommentInputPostId] = useState(0);

   const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: false,
      adaptiveHeight: true,
      centerMode: true,
      centerPadding: '-1px',
   };

   const handleCancelProductDetailModal = () => {
      setIsModalProductVisible(false);
   };

   const handleCancelPostDetailModal = () => {
      setIsModalPostDetailVisible(false);
   };

   const handleClickCameraIcon = (post) => {
      setIsModalProductVisible(true);
      setSelectPost(post);
   };

   const onClickViewDetail = (post) => {
      setSelectPostDetail(post);
      setIsModalPostDetailVisible(true);
   };

   const onClickUnlike = (postId) => {
      const formData = {
         postId: postId,
         userId: userId,
      };
      handleClickUnlike(formData);
   };

   const onClickLike = (postId) => {
      const formData = {
         postId: postId,
         userId: userId,
      };
      handleClickLike(formData);
   };

   const onPressCommentEnter = () => {
      const formData = {
         content: commentInput,
         postId: commentInputPostId,
         userId: userId,
      };
      handleOnComment(formData);
   };

   const handleOnClickAddToCart = async (formData) => {
      try {
         const response = await cartApi.addMoreProductToCart(formData);

         if (response.message === 'Product already in cart')
            return openNotificationWithIcon('error', response.message);

         const updateAddCount = await postApi.updateAddCountInPost({
            postId: selectPost.id,
         });
         updateWhenClickAddToCart(updateAddCount);

         const action = addProductToCart(response);
         dispatch(action);
         openNotificationWithIcon(
            'success',
            'Add product to cart successfully'
         );
      } catch (error) {
         console.log(error);
      }
   };

   const columns = [
      {
         title: 'Name',
         key: 'name',
         render: (record) => {
            return (
               <>
                  <Link to={`/profile/${record.user.firebaseId}`}>
                     <Text className='commentTableUsername'>
                        {record.user.username}
                     </Text>
                  </Link>
                  &nbsp;
                  <Text className='commentTableContent'>{record.content}</Text>
               </>
            );
         },
      },
   ];

   return (
      <>
         {posts?.map((post) => (
            <div className='socialPost' key={post.id}>
               <div className='post'>
                  <div className='postHeader'>
                     <SocialPostHeader postDetail={post} />
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div>
                     {post.images.length > 0 && (
                        <Slider {...settings} className='postSlide'>
                           {post.images.map((image) => (
                              <div
                                 key={image}
                                 onClick={() => onClickViewDetail(post)}
                              >
                                 <Image
                                    src={image}
                                    alt='photos'
                                    preview={false}
                                 />
                              </div>
                           ))}
                        </Slider>
                     )}
                  </div>
                  <div className='postButton'>
                     <SocialPostButtonGroup
                        postDetail={post}
                        handleClickCameraIcon={handleClickCameraIcon}
                        onClickUnlike={onClickUnlike}
                        onClickLike={onClickLike}
                     />
                  </div>
                  <div className='socialComment'>
                     <Text className='viewAll'>View all comment</Text>
                     <Table
                        rowKey={(record) => record.id}
                        dataSource={post.comments}
                        columns={columns}
                        pagination={false}
                        className='socialCommentTable'
                        locale={{
                           emptyText: (
                              <Empty
                                 image={Empty.PRESENTED_IMAGE_SIMPLE}
                                 description='No Comment'
                                 className='emptyComment'
                              />
                           ),
                        }}
                     />
                  </div>
                  <div className='socialCommentInput'>
                     <Row gutter={[15, 0]}>
                        <Col>
                           <Avatar src={photoURL} size={40} />
                        </Col>
                        <Col flex='auto'>
                           <Input
                              value={commentInput}
                              placeholder='Write your comment...'
                              onChange={(e) => setCommentInput(e.target.value)}
                              onClick={() => setCommentInputPostId(post.id)}
                              onPressEnter={() => {
                                 onPressCommentEnter();
                                 setCommentInput('');
                              }}
                           />
                        </Col>
                     </Row>
                  </div>
               </div>
            </div>
         ))}
         <SocialPostProduct
            isModalProductVisible={isModalProductVisible}
            handleCancelProductDetailModal={handleCancelProductDetailModal}
            selectPost={selectPost.postProducts}
            userId={userId}
            handleOnClickAddToCart={handleOnClickAddToCart}
         />
         {isModalPostDetailVisible && (
            <SocialPostDetailModal
               isModalPostDetailVisible={isModalPostDetailVisible}
               handleCancelPostDetailModal={handleCancelPostDetailModal}
               postDetail={selectPostDetail}
            />
         )}
      </>
   );
}

export default SocialPost;
