import { Breadcrumb } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { HiChevronRight } from 'react-icons/hi';
import './BreadcrumbBar.scss';

BreadcrumbBar.propTypes = {
   productName: PropTypes.object,
};

BreadcrumbBar.defaultProps = {
   productName: {},
};

function BreadcrumbBar(props) {
   const { productName } = props;

   const DynamicProductBreadcrumb = () => <span>{productName?.name}</span>;

   const routes = [
      { path: '/product/:userId', breadcrumb: DynamicProductBreadcrumb },
   ];

   const breadcrumbs = useBreadcrumbs(routes);

   return (
      <Breadcrumb
         separator={<HiChevronRight style={{ marginBottom: '-2px' }} />}
         className='breadcrumbBar'
      >
         {breadcrumbs.map(({ breadcrumb, match }) => (
            <Breadcrumb.Item key={breadcrumb}>
               <Link to={match.url}>{breadcrumb}</Link>
            </Breadcrumb.Item>
         ))}
      </Breadcrumb>
   );
}

export default BreadcrumbBar;
