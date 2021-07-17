import { Layout } from 'antd';
import React from 'react';
import FooterBar from '../components/FooterBar';
import HeaderBar from '../components/HeaderBar';
import SiderBar from '../components/SiderBar';

function MainLayout({ children }) {
   return (
      <Layout>
         <SiderBar />
         <Layout>
            <HeaderBar />
            {children}
            <FooterBar />
         </Layout>
      </Layout>
   );
}

export default MainLayout;
