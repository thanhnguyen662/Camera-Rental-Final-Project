import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Divider, Image, Row, Table, Tag } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import priceFormat from '../../../../utils/PriceFormat';
import './ProductManageTable.scss';

ProductManageTable.propTypes = {
   orders: PropTypes.array,
   handleClickDeleteOrderButton: PropTypes.func,
};

ProductManageTable.defaultProps = {
   orders: [],
   handleClickDeleteOrderButton: null,
};

const { RangePicker } = DatePicker;

function ProductManageTable(props) {
   const { orders, current, handleClickDeleteOrderButton } = props;

   const columns = [
      {
         title: 'Image',
         dataIndex: ['Product', 'productPhotoURL'],
         width: 80,
         render: (record) => (
            <Image src={record[0]} width={80} style={{ minHeight: 80 }} />
         ),
      },
      {
         title: 'Name',
         dataIndex: ['Product'],
         width: 100,
         render: (record) => (
            <Link to={`/product/${record.slug}`} className='productManageName'>
               {record.name}
            </Link>
         ),
      },
      {
         title: 'Start - End',
         width: 200,
         render: (record) => {
            const startDate = moment(record.startDate);
            const endDate = moment(record.endDate);
            return (
               <RangePicker
                  disabled
                  className='productManageDate'
                  disable
                  defaultValue={[startDate, endDate]}
                  format='YYYY/MM/DD HH:mm'
               />
            );
         },
      },
      {
         title: 'Price',
         dataIndex: ['totalPricePerHour'],
         width: 100,
         render: (record) => <div>{priceFormat(record)}</div>,
      },
   ];

   const tileOfTable = (order) => {
      const statusTagColor = () => {
         switch (order.orderStatus?.name) {
            case 'PENDING':
               return {
                  color: 'processing',
               };
            case 'SUCCESS':
               return {
                  color: 'success',
               };
            case 'FAILED':
               return {
                  color: 'error',
               };
            case 'DELIVERY': {
               return {
                  color: 'warning',
               };
            }
            default:
               break;
         }
      };
      return (
         <div>
            <Row>
               <Col flex='auto'>
                  <Tag {...statusTagColor()}>{order.orderStatus?.name}</Tag>
                  <Divider type='vertical' />
                  &nbsp;
                  <Link
                     to={`/profile/${order.orderItems[0]?.Product.User.firebaseId}`}
                     style={{ color: 'black' }}
                  >
                     <b>{order.orderItems[0].Product.User.username}</b>
                  </Link>
               </Col>
               {current === 1 && (
                  <Col>
                     <Button
                        className='messageButton'
                        icon={<DeleteOutlined />}
                        onClick={() => handleClickDeleteOrderButton(order.id)}
                     />
                  </Col>
               )}
            </Row>
         </div>
      );
   };

   const footerOfTable = (totalPrice) => {
      return (
         <Row>
            <Col flex='auto' className='footerTitle'>
               Total Price:
            </Col>
            <Col span={4} className='footerOfTable'>
               {priceFormat(totalPrice)}
            </Col>
         </Row>
      );
   };

   return (
      <div>
         {orders.length > 0 ? (
            orders.map((order) => (
               <div key={order.id} className='productManage'>
                  <Table
                     ellipsis={true}
                     tableLayout='fixed'
                     title={() => tileOfTable(order)}
                     footer={() => footerOfTable(order.totalPrice)}
                     className='productManageTable'
                     pagination={false}
                     rowKey={(record) => record.id}
                     dataSource={order.orderItems}
                     columns={columns}
                  />
               </div>
            ))
         ) : (
            <Table hasData={true} />
         )}
      </div>
   );
}

export default ProductManageTable;
