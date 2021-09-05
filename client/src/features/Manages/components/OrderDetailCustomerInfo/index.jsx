import React from 'react';
import PropTypes from 'prop-types';
import './OrderDetailCustomerInfo.scss';
import { Avatar, Descriptions, Rate, Space, Typography } from 'antd';

OrderDetailCustomerInfo.propTypes = {
   customerInfo: PropTypes.object,
};

OrderDetailCustomerInfo.defaultProps = {
   customerInfo: {},
};

const { Text } = Typography;

function OrderDetailCustomerInfo(props) {
   const { customerInfo } = props;
   return (
      <>
         <div className='orderDetailCustomerInfo'>
            <Space size={35} align='start'>
               <Avatar
                  shape='square'
                  style={{ marginTop: 6 }}
                  size={70}
                  src={customerInfo.photoURL}
               />
               <Descriptions size='small' column={2}>
                  <Descriptions.Item>
                     <Space direction='vertical' size={0}>
                        <Text className='headerTitle'>Username</Text>
                        <Text className='headerInformation'>
                           {customerInfo.username}
                        </Text>
                     </Space>
                  </Descriptions.Item>
                  <Descriptions.Item>
                     <Space direction='vertical' size={0}>
                        <Text className='headerTitle'>Phone Number</Text>
                        <Text className='headerInformation'>
                           {customerInfo.phoneNumber}
                        </Text>
                     </Space>
                  </Descriptions.Item>
                  <Descriptions.Item>
                     <Space direction='vertical' size={0}>
                        <Text className='headerTitle'>Address</Text>
                        <Text className='headerInformation'>
                           {customerInfo.address}
                        </Text>
                     </Space>
                  </Descriptions.Item>
                  <Descriptions.Item>
                     <Space direction='vertical' size={0}>
                        <Text className='headerTitle'>Rate</Text>
                        <div>
                           <Rate
                              value={customerInfo.rate}
                              allowClear={false}
                              allowHalf={true}
                           />
                           <Text style={{ marginLeft: 10 }}>
                              {customerInfo.rate}
                           </Text>
                        </div>
                     </Space>
                  </Descriptions.Item>
                  <Descriptions.Item>
                     <Space direction='vertical' size={0}>
                        <Text className='headerTitle'>Success Order Rate</Text>
                        <Text className='headerInformation'>
                           {customerInfo.userStats &&
                              customerInfo.userStats[0].success}
                           %
                        </Text>
                     </Space>
                  </Descriptions.Item>
                  <Descriptions.Item>
                     <Space direction='vertical' size={0}>
                        <Text className='headerTitle'>Pickup Order Rate</Text>
                        <Text className='headerInformation'>
                           {customerInfo.userStats &&
                              customerInfo.userStats[0].come}
                           %
                        </Text>
                     </Space>
                  </Descriptions.Item>
                  <Descriptions.Item>
                     <Space direction='vertical' size={0}>
                        <Text className='headerTitle'>Total Order</Text>
                        <Text className='headerInformation'>
                           {customerInfo.userStats &&
                              customerInfo._count.orders}
                        </Text>
                     </Space>
                  </Descriptions.Item>
               </Descriptions>
            </Space>
         </div>
      </>
   );
}

export default OrderDetailCustomerInfo;
