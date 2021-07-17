import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

function ContentLayout({ children }) {
   return (
      <Content style={{ marginTop: '18px' }}>
         <div>{children}</div>
      </Content>
   );
}

export default ContentLayout;
