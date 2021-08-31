import {
   EllipsisOutlined,
   FireOutlined,
   HeartOutlined,
   MessageOutlined,
   HeartFilled,
} from '@ant-design/icons';
import { Col, Empty, Image, Input, Row, Space, Table, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import moment from 'moment';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './SocialPost.scss';

SocialPost.propTypes = {
   photoURL: PropTypes.string,
   posts: PropTypes.array,
   userId: PropTypes.string,
   handleClickLike: PropTypes.func,
   handleClickUnlike: PropTypes.func,
};

SocialPost.defaultProps = {
   photoURL: '',
   posts: [],
   userId: '',
   handleClickLike: null,
   handleClickUnlike: null,
};

const { Text } = Typography;

function SocialPost(props) {
   const { photoURL, posts, userId, handleClickUnlike, handleClickLike } =
      props;

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
                  <Text className='commentTableUsername'>
                     {record.userName}
                  </Text>
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
                                    {post.user.username}
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
                     <Space size={20}>
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
                  </div>
                  <div className='socialComment'>
                     <Text className='viewAll'>View all comment</Text>
                     <Table
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
                           <Input placeholder='Write your comment...' />
                        </Col>
                     </Row>
                  </div>
               </div>
            </div>
         ))}
      </>
   );
}

export default SocialPost;
