import { Col, Row, Space } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SocialInputPost from '../../components/SocialInputPost';
import SocialPost from '../../components/SocialPost';
import SocialUserMenu from '../../components/SocialUserMenu';
import './SocialPage.scss';

function LadingPage(props) {
   const photoURL = useSelector((state) => state.users.photoURL);
   const userName = useSelector((state) => state.users.username);
   const name = useSelector((state) => state.users.name);
   // eslint-disable-next-line
   const [current, setCurrent] = useState('');

   const handleChangeMenuSelected = (value) => {
      setCurrent(value.key);
   };

   return (
      <>
         <div>
            <Row gutter={[50, 20]} span={24}>
               <Col span={5}>
                  <SocialUserMenu
                     photoURL={photoURL}
                     userName={userName}
                     name={name}
                     handleChangeMenuSelected={handleChangeMenuSelected}
                  />
               </Col>
               <Col span={12}>
                  <Space direction='vertical' size={20}>
                     <SocialInputPost userName={userName} photoURL={photoURL} />
                     <SocialPost />
                  </Space>
               </Col>
               <Col span={7}></Col>
            </Row>
         </div>
      </>
   );
}

export default LadingPage;
