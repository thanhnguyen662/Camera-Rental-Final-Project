import {
   Button,
   Col,
   Divider,
   Image,
   Modal,
   Row,
   Comment,
   Avatar,
   Tooltip,
} from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import SocialInputComment from '../SocialInputComment';
import SocialPostButtonGroup from '../SocialPostButtonGroup';
import SocialPostHeader from '../SocialPostHeader';
import postApi from '../../../../api/postApi';
import moment from 'moment';
import './SocialPostDetailModal.scss';

SocialPostDetailModal.propTypes = {
   isModalPostDetailVisible: PropTypes.bool,
   handleCancelPostDetailModal: PropTypes.func,
   postDetail: PropTypes.object,
   handleClickCameraIcon: PropTypes.func,
   onClickLike: PropTypes.func,
   onClickUnlike: PropTypes.func,
   photoURL: PropTypes.string,
};

SocialPostDetailModal.defaultProps = {
   isModalPostDetailVisible: false,
   handleCancelPostDetailModal: null,
   postDetail: {},
   handleClickCameraIcon: null,
   onClickLike: null,
   onClickUnlike: null,
   photoURL: '',
};

function SocialPostDetailModal(props) {
   const [page, setPage] = useState(1);
   const [comments, setComments] = useState([]);
   const [show, setShow] = useState(false);

   const {
      isModalPostDetailVisible,
      handleCancelPostDetailModal,
      postDetail,
      handleClickCameraIcon,
      onClickUnlike,
      onClickLike,
      photoURL,
   } = props;

   const settings = {
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      arrows: true,
      centerMode: true,
      centerPadding: '-1px',
      className: 'postDetailImage',
   };

   useEffect(() => {
      try {
         if (!postDetail) return;
         const getPostComment = async () => {
            const response = await postApi.getPostComment({
               postId: postDetail.id,
               page: page,
            });
            setComments((prev) => [...prev, ...response]);
            response.length >= 5 ? setShow(true) : setShow(false);
         };
         getPostComment();
      } catch (error) {
         console.error(error);
      }
   }, [postDetail, page]);

   return (
      <>
         <div>
            <Modal
               visible={isModalPostDetailVisible}
               onCancel={handleCancelPostDetailModal}
               title={false}
               footer={false}
               centered={true}
               className='modalPostDetail'
               width={800}
            >
               <Row className='postDetailRow' wrap={false}>
                  <Col span={14}>
                     <Slider {...settings}>
                        {postDetail.images?.map((image) => (
                           <div key={image}>
                              <Image src={image} alt='photos' preview={false} />
                           </div>
                        ))}
                     </Slider>
                  </Col>
                  <Col span={10} className='postDetailCommentCol'>
                     <div className='postDetailComment'>
                        <div className='postComment'>
                           <SocialPostHeader postDetail={postDetail} />
                           <Divider style={{ margin: '10px 0' }} />
                           <div>
                              {comments?.map((comment) => (
                                 <Comment
                                    key={comment.id}
                                    author={comment.user.username}
                                    avatar={
                                       <Avatar
                                          src={comment.user.photoURL}
                                          alt={comment.user.username}
                                       />
                                    }
                                    content={<div>{comment.content}</div>}
                                    datetime={
                                       <Tooltip
                                          title={moment(
                                             comment.createdAt
                                          ).format('YYYY-MM-DD HH:mm:ss')}
                                       >
                                          <div style={{ fontSize: 11 }}>
                                             {moment(
                                                comment.createdAt
                                             ).fromNow()}
                                          </div>
                                       </Tooltip>
                                    }
                                 />
                              ))}
                           </div>
                           {show && (
                              <div className='buttonViewMoreComment'>
                                 <Button
                                    shape='circle'
                                    onClick={() => setPage(page + 1)}
                                    icon={<PlusOutlined />}
                                 />
                              </div>
                           )}
                        </div>
                        <Divider style={{ margin: '0 0 24px 0' }} />
                        <div className='postButtonGroup'>
                           <SocialPostButtonGroup
                              postDetail={postDetail}
                              handleClickCameraIcon={handleClickCameraIcon}
                              onClickUnlike={onClickUnlike}
                              onClickLike={onClickLike}
                           />
                        </div>
                        <div className='postInputComment'>
                           <SocialInputComment photoURL={photoURL} />
                        </div>
                     </div>
                  </Col>
               </Row>
            </Modal>
         </div>
      </>
   );
}

export default SocialPostDetailModal;
