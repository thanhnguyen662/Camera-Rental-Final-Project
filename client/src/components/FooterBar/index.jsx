import { GithubOutlined } from '@ant-design/icons';
import { Layout, Row, Space } from 'antd';
import React from 'react';
const { Footer } = Layout;

function FooterBar(props) {
   return (
      <Footer>
         <Row justify='center'>
            <Space size='large'>
               <GithubOutlined
                  onClick={() => {
                     console.log('ok');
                  }}
               />
            </Space>
         </Row>
         <Row span={6} justify='center'>
            Camera Rental Project ©2021
         </Row>
      </Footer>
   );
}

export default FooterBar;
