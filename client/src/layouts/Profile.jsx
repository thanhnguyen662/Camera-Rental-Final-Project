import { Layout } from 'antd';
import React from 'react';

const { Content } = Layout;

function ProfileLayout({ children }) {
   return <Content style={{ margin: '0 200px' }}>{children}</Content>;
}

export default ProfileLayout;
