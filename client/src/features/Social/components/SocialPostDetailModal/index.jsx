import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image, Modal, Row } from 'antd';
import Slider from 'react-slick';
import './SocialPostDetailModal.scss';

SocialPostDetailModal.propTypes = {
   isModalPostDetailVisible: PropTypes.bool,
   handleCancelPostDetailModal: PropTypes.func,
   postDetailInfo: PropTypes.object,
   postDetailComment: PropTypes.array,
};

SocialPostDetailModal.defaultProps = {
   isModalPostDetailVisible: false,
   handleCancelPostDetailModal: null,
   postDetailInfo: {},
   postDetailComment: [],
};

function SocialPostDetailModal(props) {
   const {
      isModalPostDetailVisible,
      handleCancelPostDetailModal,
      postDetailInfo,
      postDetailComment,
   } = props;

   const settings = {
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      arrows: false,
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
               width={900}
            >
               <Row className='postDetailRow'>
                  <Col span={12}>
                     <Slider {...settings}>
                        {postDetailInfo.images?.map((image) => (
                           <div key={image} className='postDetailImage'>
                              <Image src={image} alt='photos' preview={false} />
                           </div>
                        ))}
                     </Slider>
                  </Col>
                  <Col span={12}>
                     <div className='postDetailComment'>Hello</div>
                  </Col>
               </Row>
            </Modal>
         </div>
      </>
   );
}

export default SocialPostDetailModal;
