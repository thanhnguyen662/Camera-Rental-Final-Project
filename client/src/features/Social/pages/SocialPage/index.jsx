import { Col, Row, Space } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SocialInputPost from '../../components/SocialInputPost';
import SocialNewProduct from '../../components/SocialNewProduct';
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
            <Row gutter={[25, 0]} span={24}>
               <Col span={6}>
                  <SocialUserMenu
                     photoURL={photoURL}
                     userName={userName}
                     name={name}
                     handleChangeMenuSelected={handleChangeMenuSelected}
                  />
               </Col>
               <Col span={11}>
                  <Space direction='vertical' size={25}>
                     <SocialInputPost
                        userName={userName}
                        photoURL={photoURL}
                        name={name}
                     />
                     <SocialPost photoURL={photoURL} />
                  </Space>
               </Col>
               <Col span={7}>
                  <SocialNewProduct />
               </Col>
            </Row>
         </div>
      </>
   );
}

export default LadingPage;
