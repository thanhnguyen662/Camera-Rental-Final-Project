import React from 'react';
// import PropTypes from 'prop-types';
import './SocialPost.scss';
import Avatar from 'antd/lib/avatar/avatar';
import { Col, Row, Space, Image } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

SocialPost.propTypes = {};

function SocialPost(props) {
   const images = {
      image1:
         'https://scontent.fdad4-1.fna.fbcdn.net/v/t1.6435-9/117307481_2112709495540126_5030044787972036923_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=Dl8JtjOdbg4AX_sKJiy&_nc_ht=scontent.fdad4-1.fna&oh=a9fe48c95f75730dbeca54670fc76183&oe=614E977E',
   };

   return (
      <div className='socialPost'>
         <div className='post'>
            <div className='postUserInfo'>
               <Row justify='center' align='middle'>
                  <Col flex='auto'>
                     <Space size={12}>
                        <Avatar size={40} />
                        <div>
                           <div className='userName'>thanhnguyen662</div>
                           <div className='timeAgo'>12 minutes ago</div>
                        </div>
                     </Space>
                  </Col>
                  <Col>
                     <EllipsisOutlined className='ellipsisOutlinedIcon' />
                  </Col>
               </Row>
            </div>
            <div className='postImage'>
               <Image src={images.image1} />
            </div>
         </div>
      </div>
   );
}

export default SocialPost;
