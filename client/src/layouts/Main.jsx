import { Layout } from 'antd';
import React from 'react';
import HeaderBar from '../components/HeaderBar';
import SiderBar from '../components/SiderBar';
import FooterBar from '../components/FooterBar';

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
