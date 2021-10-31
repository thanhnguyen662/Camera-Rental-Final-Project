import { Col, Row, Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import {
   BsBookmarkCheck,
   BsCameraVideo,
   BsChatSquare,
   BsHeart,
   BsHeartFill,
} from 'react-icons/bs';
import './SocialPostButtonGroup.scss';

SocialPostButtonGroup.propTypes = {
   postDetail: PropTypes.object,
   handleClickCameraIcon: PropTypes.func,
   onClickLike: PropTypes.func,
   onClickUnlike: PropTypes.func,
};

SocialPostButtonGroup.defaultProps = {
   postDetail: {},
   handleClickCameraIcon: null,
   onClickLike: null,
   onClickUnlike: null,
};

const { Text } = Typography;

function SocialPostButtonGroup(props) {
   const { postDetail, handleClickCameraIcon, onClickLike, onClickUnlike } =
      props;

   return (
      <>
         <div className='socialButtonGroup'>
            <Row style={{ marginRight: 0 }} align='middle'>
               <Col span={22}>
                  <Space size={20}>
                     <div>
                        <Space>
                           {postDetail.isLike ? (
                              <BsHeartFill
                                 className='iconFilled'
                                 onClick={() => onClickUnlike(postDetail.id)}
                              />
                           ) : (
                              <BsHeart
                                 className='icon'
                                 onClick={() => onClickLike(postDetail.id)}
                              />
                           )}
                           <Text className='text'>{postDetail.like}</Text>
                        </Space>
                     </div>
                     <div>
                        <Space>
                           <BsChatSquare className='icon' />
                           <Text className='text'>
                              {postDetail._count?.comments}
                           </Text>
                        </Space>
                     </div>
                     <div>
                        <Space>
                           <BsBookmarkCheck className='icon' />
                           <Text className='text'>{postDetail.add}</Text>
                        </Space>
                     </div>
                  </Space>
               </Col>
               <Col span={2}>
                  <BsCameraVideo
                     colSpan={24}
                     className='icon'
                     onClick={() => {
                        handleClickCameraIcon(postDetail);
                     }}
                  />
               </Col>
            </Row>
         </div>
      </>
   );
}

export default SocialPostButtonGroup;
