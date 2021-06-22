import { PageHeader, Button, Descriptions } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import './ProductDetail.scss';

ProductDetail.propTypes = {
   productDetail: PropTypes.object,
};

ProductDetail.defaultProps = {
   productDetail: {},
};

function ProductDetail(props) {
   const { productDetail } = props;
   return (
      <>
         <div className='site-page-header-ghost-wrapper'>
            <PageHeader
               ghost={false}
               title={
                  <>
                     <BreadcrumbBar />
                     {productDetail.name}
                  </>
               }
               extra={[
                  <Button key='3'>Operation</Button>,
                  <Button key='2'>Operation</Button>,
                  <Button key='1' type='primary'>
                     Primary
                  </Button>,
               ]}
            >
               <Descriptions size='small' column={3}>
                  <Descriptions.Item label='Created'>Lili Qu</Descriptions.Item>
                  <Descriptions.Item label='Association'>
                     421421
                  </Descriptions.Item>
                  <Descriptions.Item label='Creation Time'>
                     2017-01-10
                  </Descriptions.Item>
                  <Descriptions.Item label='Effective Time'>
                     2017-10-10
                  </Descriptions.Item>
                  <Descriptions.Item label='Remarks'>
                     Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
                  </Descriptions.Item>
               </Descriptions>
            </PageHeader>
         </div>
      </>
   );
}

export default ProductDetail;
