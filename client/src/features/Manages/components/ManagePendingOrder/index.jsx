import {
   CheckOutlined,
   CloseOutlined,
   InfoCircleOutlined,
} from '@ant-design/icons';
import {
   Avatar,
   Button,
   Col,
   DatePicker,
   Image,
   Row,
   Space,
   Table,
   Tag,
   Typography,
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import priceFormat from '../../../../utils/PriceFormat';

ManagePendingOrder.propTypes = {
   pendingOrder: PropTypes.array,
   handleOnClickAcceptOrder: PropTypes.func,
   handleOnClickDeclineOrder: PropTypes.func,
};

ManagePendingOrder.defaultProps = {
   pendingOrder: [],
   handleOnClickAcceptOrder: null,
   handleOnClickDeclineOrder: null,
};

const { Text } = Typography;
const { RangePicker } = DatePicker;

function ManagePendingOrder(props) {
   const { pendingOrder, handleOnClickAcceptOrder, handleOnClickDeclineOrder } =
      props;

   const onClickAcceptButton = (orderId) => {
      const formData = {
         orderId: orderId,
      };
      handleOnClickAcceptOrder(formData);
   };

   const onClickDeclineButton = (orderId) => {
      const formData = {
         orderId: orderId,
      };
      handleOnClickDeclineOrder(formData);
   };

   const titleOfTable = (order) => {
      return (
         <Row>
            <Col flex='auto'>
               <Space size={20}>
                  <Tag color='blue'>PENDING</Tag>
                  <Link to={`/profile/${order.User.firebaseId}`}>
                     <Space size={20}>
                        <Avatar src={order.User.photoURL} />
                        <Text strong>{order.User.username}</Text>
                     </Space>
                  </Link>
               </Space>
            </Col>
            <Col>
               <Space size={20}>
                  <Text>
                     {moment(order.createdAt).format('YYYY-MM-DD HH:mm')}
                  </Text>
                  <InfoCircleOutlined className='orderDetailButton' />
               </Space>
            </Col>
         </Row>
      );
   };

   const footerOfTable = (order) => {
      return (
         <Row>
            <Col flex='auto'>
               <Space>
                  <Button
                     type='primary'
                     className='footerButton'
                     icon={<CheckOutlined />}
                     onClick={() => onClickAcceptButton(order.id)}
                  >
                     Accept
                  </Button>
                  <Button
                     type='danger'
                     className='footerButton'
                     icon={<CloseOutlined />}
                     onClick={() => onClickDeclineButton(order.id)}
                  >
                     Decide
                  </Button>
               </Space>
            </Col>
            <Col>
               <Space>
                  <Text className='footerTitle'>Total Price: </Text>
                  <Text className='footerPrice'>
                     {priceFormat(order.totalPrice)}
                  </Text>
               </Space>
            </Col>
         </Row>
      );
   };

   const columns = [
      {
         title: 'Image',
         dataIndex: ['Product', 'productPhotoURL'],
         width: 80,
         render: (record) => (
            <Image
               src={record[0]}
               width={80}
               height={80}
               style={{ objectFit: 'cover', borderRadius: 10 }}
            />
         ),
      },
      {
         title: 'Name',
         dataIndex: ['Product', 'name'],
         render: (record) => <Text>{record}</Text>,
      },
      {
         title: 'Date',
         dataIndex: ['Product'],
         render: (record) => (
            <RangePicker
               disabled={true}
               className='orderDateTime'
               value={[moment(record.startDate), moment(record.endDate)]}
               format='YYYY/MM/DD HH:mm'
            />
         ),
      },
   ];

   return (
      <>
         {pendingOrder?.map((order) => (
            <div key={order.id}>
               <Table
                  className='managePendingOrderTable'
                  dataSource={order.orderItems}
                  rowKey={(record) => record.id}
                  pagination={false}
                  columns={columns}
                  title={() => titleOfTable(order)}
                  footer={() => footerOfTable(order)}
               />
            </div>
         ))}
      </>
   );
}

export default ManagePendingOrder;
