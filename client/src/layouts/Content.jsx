import React from 'react';
import { Layout } from 'antd';
// import BreadcrumbBar from '../components/BreadcrumbBar';

const { Content } = Layout;

function ContentLayout({ children }) {
   return (
      <Content style={{ margin: '0 16px' }}>
         {/* <BreadcrumbBar /> */}
         <div
         // className='site-layout-background'
         // style={{ padding: 27, minHeight: 360 }}
         >
            {children}
         </div>
      </Content>
   );
}

export default ContentLayout;
