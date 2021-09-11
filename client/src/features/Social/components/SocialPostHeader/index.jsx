import { EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Col, Row, Space } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './SocialPostHeader.scss';

SocialPostHeader.propTypes = {
   postDetail: PropTypes.object,
};

SocialPostHeader.defaultProps = {
   postDetail: {},
};

function SocialPostHeader(props) {
   const { postDetail } = props;

   return (
      <>
         <div className='postUserInfo'>
            <Row span={24} justify='center' align='middle'>
               <Col flex='auto'>
                  <Space size={11}>
                     <Avatar size={40} src={postDetail.user?.photoURL} />
                     <div>
                        <div className='userName'>
                           <Link to={`/profile/${postDetail.user?.firebaseId}`}>
                              {postDetail.user?.username}
                           </Link>
                        </div>
                        <div className='timeAgo'>
                           {moment(postDetail.createdAt).fromNow()}
                        </div>
                     </div>
                  </Space>
               </Col>
               <Col span={2}>
                  <EllipsisOutlined className='ellipsisOutlinedIcon' />
               </Col>
            </Row>
            <div className='description'>{postDetail.caption}</div>
         </div>
      </>
   );
}

export default SocialPostHeader;
