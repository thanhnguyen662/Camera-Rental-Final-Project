// import PropTypes from 'prop-types';
import { Button, Space, Table } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

ProductCartTable.propTypes = {};

function ProductCartTable(props) {
   const { onClickRemoveItem } = props;
   const productInCart = useSelector((state) => state.cart);

   const columns = [
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'Start',
         dataIndex: 'startDate',
         key: 'startDate',
      },
      {
         title: 'End',
         dataIndex: 'endDate',
         key: 'endDate',
      },
      {
         title: 'Action',
         key: 'action',
         render: (text, record) => (
            <Space size='middle'>
               <Button onClick={() => onClickRemoveItem(record)}>Delete</Button>
            </Space>
         ),
      },
   ];

   return (
      <>
         <Table columns={columns} dataSource={productInCart} />
      </>
   );
}

export default ProductCartTable;
