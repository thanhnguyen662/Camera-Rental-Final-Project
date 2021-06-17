import { Breadcrumb } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

function BreadcrumbBar(props) {
   const breadcrumbs = useBreadcrumbs();
   return (
      <Breadcrumb style={{ margin: '16px 0' }}>
         {breadcrumbs.map(({ breadcrumb }) => (
            <Breadcrumb.Item key={breadcrumb}>
               <Link to='/'>{breadcrumb}</Link>
            </Breadcrumb.Item>
         ))}
      </Breadcrumb>
   );
}

export default BreadcrumbBar;
