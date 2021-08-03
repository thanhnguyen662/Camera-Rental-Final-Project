import React from 'react';
import PropTypes from 'prop-types';
import './ProductManageTable.scss';
import { Image, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import priceFormat from '../../../../utils/PriceFormat';

ProductManageTable.propTypes = {
   orders: PropTypes.array,
};

ProductManageTable.defaultProps = {
   orders: [],
};

function ProductManageTable(props) {
   const { orders } = props;

   const columns = [
      {
         title: 'Image',
         dataIndex: ['Product', 'productPhotoURL'],
         width: 100,
         render: (record) => (
            <Image src={record[0]} width={80} style={{ minHeight: 80 }} />
         ),
      },
      {
         title: 'Name',
         dataIndex: ['Product'],
         width: 180,
         render: (record) => (
            <Link to={`/product/${record.slug}`} className='cartName'>
               {record.name}
            </Link>
         ),
      },
      {
         title: 'Price/hours',
         dataIndex: ['Product', 'price'],
         width: 80,
         render: (record) => (
            <div className='cartPrice'>{priceFormat(record)}</div>
         ),
      },
      {
         title: 'During',
         dataIndex: ['during'],
         width: 80,
         render: (record) => <div className='cartPrice'>{record} hours</div>,
      },
      {
         title: 'Total Price',
         dataIndex: ['totalPricePerHour'],
         width: 80,
         render: (record) => (
            <div className='cartPrice'>{priceFormat(record)}</div>
         ),
      },
   ];

   return (
      <div>
         {orders.map((order) => (
            <div key={order.id} className='productManage'>
               <Table
                  title={() => (
                     <>
                        <div>
                           <Tag color='processing'>{order.status}</Tag>| Order
                           Id: {order.id}
                        </div>
                     </>
                  )}
                  footer={() => priceFormat(order.totalPrice)}
                  className='productManageTable'
                  ellipsis={true}
                  pagination={false}
                  rowKey={(record) => record.id}
                  dataSource={order.orderItems}
                  columns={columns}
               />
            </div>
         ))}
      </div>
   );
}

export default ProductManageTable;
