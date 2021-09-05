import {
   CheckOutlined,
   ClockCircleOutlined,
   CloseOutlined,
   FieldTimeOutlined,
   HomeOutlined,
   RedoOutlined,
   RollbackOutlined,
   UserOutlined,
} from '@ant-design/icons';
import { Descriptions, PageHeader, Space, Tag, Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';
import './OrderDetailHeader.scss';

OrderDetailHeader.propTypes = {
   orderDetail: PropTypes.object,
};

OrderDetailHeader.defaultProps = {
   orderDetail: {},
};

const { Text } = Typography;

function OrderDetailHeader(props) {
   const { orderDetail } = props;
   const history = useHistory();

   const tagColor = () => {
      let colorStyle = {};
      if (orderDetail.orderStatus?.name === 'PENDING') {
         colorStyle = {
            color: '#096DDF',
            icon: <RedoOutlined />,
         };
      }
      if (orderDetail.orderStatus?.name === 'ACCEPT') {
         colorStyle = {
            color: '#3E9E55',
            icon: <CheckOutlined />,
         };
      }
      if (orderDetail.orderStatus?.name === 'RENTED') {
         colorStyle = {
            color: '#f50',
            icon: <ClockCircleOutlined />,
         };
      }
      if (orderDetail.orderStatus?.name === 'FAILURE') {
         colorStyle = {
            color: '#FF4D4F',
            icon: <CloseOutlined />,
         };
      }
      if (orderDetail.orderStatus?.name === 'BACK') {
         colorStyle = {
            color: '#531DBE',
            icon: <RollbackOutlined />,
         };
      }
      return colorStyle;
   };

   const extraContent = (
      <Tag {...tagColor()} className='headerStatus'>
         {orderDetail.orderStatus?.name}
      </Tag>
   );

   const renderContent = (column = 4) => (
      <Descriptions size='small' column={column} className='headerDescription'>
         <Descriptions.Item>
            <Space align='start'>
               <UserOutlined className='headerIcon' />
               <div>
                  <Text className='headerTitle'>Shop Name</Text>
                  <div>
                     <Text className='headerInformation'>
                        {orderDetail.orderItems &&
                           orderDetail.orderItems[0].Product.User.username}
                     </Text>
                  </div>
               </div>
            </Space>
         </Descriptions.Item>
         <Descriptions.Item>
            <Space align='start'>
               <HomeOutlined className='headerIcon' />
               <div>
                  <Text className='headerTitle'>Order Address</Text>
                  <div>
                     <Text className='headerInformation'>
                        {orderDetail.address}
                     </Text>
                  </div>
               </div>
            </Space>
         </Descriptions.Item>
         <Descriptions.Item>
            <Space align='start'>
               <ClockCircleOutlined className='headerIcon' />
               <div>
                  <Text className='headerTitle'>Creation Time</Text>
                  <div>
                     <Text className='headerInformation'>
                        {moment(orderDetail.createdAt).format(
                           'DD MMM YYYY, HH:mm'
                        )}
                     </Text>
                  </div>
               </div>
            </Space>
         </Descriptions.Item>
         <Descriptions.Item>
            <Space align='start'>
               <FieldTimeOutlined className='headerIcon' />
               <div>
                  <Text className='headerTitle'>Latest Updated</Text>
                  <div>
                     <Text className='headerInformation'>
                        {moment(orderDetail.updatedAt).format(
                           'DD MMM YYYY, HH:mm'
                        )}
                     </Text>
                  </div>
               </div>
            </Space>
         </Descriptions.Item>
      </Descriptions>
   );

   return (
      <>
         <PageHeader
            className='orderDetailPageHeader'
            onBack={() => history.goBack()}
            title='Order'
            subTitle={`#${orderDetail.id}`}
            extra={extraContent}
         >
            <div className='content'>
               <div className='main'>{renderContent()}</div>
            </div>
         </PageHeader>
      </>
   );
}

export default OrderDetailHeader;
