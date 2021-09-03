import {
   CameraOutlined,
   EllipsisOutlined,
   FireOutlined,
   HeartFilled,
   HeartOutlined,
   MessageOutlined,
} from '@ant-design/icons';
import { Col, Empty, Image, Input, Row, Space, Table, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import moment from 'moment';
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
   const [selectPost, setSelectPost] = useState([]);
   const [commentInput, setCommentInput] = useState('');
   const [commentInputPostId, setCommentInputPostId] = useState(0);

   const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: false,
      centerPadding: '60px',
      adaptiveHeight: true,
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

   const handleOnClickCancelModal = () => {
      setIsModalProductVisible(false);
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

   const onPressCommentEnter = () => {
      const formData = {
         content: commentInput,
         postId: commentInputPostId,
         userId: userId,
      };

      handleOnComment(formData);
   };

   return (
      <>
         {posts?.map((post) => (
            <div className='socialPost' key={post.id}>
               <div className='post'>
                  <div className='postUserInfo'>
                     <Row justify='center' align='middle'>
                        <Col flex='auto'>
                           <Space size={12}>
                              <Avatar size={40} src={post.user.photoURL} />
                              <div>
                                 <div className='userName'>
                                    <Link
                                       to={`/profile/${post.user.firebaseId}`}
                                    >
                                       {post.user.username}
                                    </Link>
                                 </div>
                                 <div className='timeAgo'>
                                    {moment(post.createdAt).fromNow()}
                                 </div>
                              </div>
                           </Space>
                        </Col>
                        <Col>
                           <EllipsisOutlined className='ellipsisOutlinedIcon' />
                        </Col>
                     </Row>
                     <div className='description'>{post.caption}</div>
                  </div>
                  <div>
                     {post.images.length > 0 && (
                        <Slider {...settings} className='postSlide'>
                           {post.images.map((image) => (
                              <div key={image}>
                                 <Image
                                    src={image}
                                    alt='photos'
                                    preview={true}
                                 />
                              </div>
                           ))}
                        </Slider>
                     )}
                  </div>
                  <div className='socialButtonGroup'>
                     <Row gutter={[60, 0]} style={{ marginRight: 0 }}>
                        <Col flex='auto'>
                           <Space>
                              <div>
                                 <Space>
                                    {post.isLike ? (
                                       <HeartFilled
                                          className='iconFilled'
                                          onClick={() => onClickUnlike(post.id)}
                                       />
                                    ) : (
                                       <HeartOutlined
                                          className='icon'
                                          onClick={() => onClickLike(post.id)}
                                       />
                                    )}
                                    <Text className='text'>{post.like}</Text>
                                 </Space>
                              </div>
                              <div>
                                 <Space>
                                    <MessageOutlined className='icon' />
                                    <Text className='text'>
                                       {post._count.comments}
                                    </Text>
                                 </Space>
                              </div>
                              <div>
                                 <Space>
                                    <FireOutlined className='icon' />
                                    <Text className='text'>{post.add}</Text>
                                 </Space>
                              </div>
                           </Space>
                        </Col>
                        <Col>
                           <Space size={20}>
                              <CameraOutlined
                                 colSpan={24}
                                 className='icon'
                                 onClick={() => {
                                    setIsModalProductVisible(true);
                                    setSelectPost(post);
                                 }}
                              />
                           </Space>
                        </Col>
                     </Row>
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
            handleOnClickCancelModal={handleOnClickCancelModal}
            selectPost={selectPost.postProducts}
            userId={userId}
            handleOnClickAddToCart={handleOnClickAddToCart}
         />
      </>
   );
}

export default SocialPost;
