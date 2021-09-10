import { Col, Image, Modal, Row, Space } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import SocialPostButtonGroup from '../SocialPostButtonGroup';
import SocialPostHeader from '../SocialPostHeader';
import './SocialPostDetailModal.scss';

SocialPostDetailModal.propTypes = {
   isModalPostDetailVisible: PropTypes.bool,
   handleCancelPostDetailModal: PropTypes.func,
   postDetail: PropTypes.object,
   postDetailComment: PropTypes.array,
};

SocialPostDetailModal.defaultProps = {
   isModalPostDetailVisible: false,
   handleCancelPostDetailModal: null,
   postDetail: {},
   postDetailComment: [],
};

function SocialPostDetailModal(props) {
   const {
      isModalPostDetailVisible,
      handleCancelPostDetailModal,
      postDetail,
      postDetailComment,
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
                        <div>
                           <SocialPostHeader postDetail={postDetail} />
                        </div>
                        <div>
                           <SocialPostButtonGroup />
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
