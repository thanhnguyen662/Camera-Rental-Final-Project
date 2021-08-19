import { Layout } from 'antd';
import React from 'react';
import FooterBar from '../components/FooterBar';
import HeaderBar from '../components/HeaderBar';
import SiderBar from '../components/SiderBar';

function MainLayout({ children }) {
   return (
      <Layout style={{ minHeight: '100vh' }}>
         <SiderBar />
         <Layout className='site-layout'>
            <HeaderBar />
            {children}
            <FooterBar />
         </Layout>
      </Layout>
   );
}

export default MainLayout;
