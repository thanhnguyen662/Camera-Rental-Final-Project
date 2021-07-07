// import PropTypes from 'prop-types';
import { Space, Table, Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProductFromCart } from '../../productSlice';

ProductCartTable.propTypes = {};

function ProductCartTable(props) {
   const productInCart = useSelector((state) => state.cart);
   const dispatch = useDispatch();

   const onClickRemoveItem = (product) => {
      const action = removeProductFromCart(product);
      dispatch(action);
   };

   const columns = [
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'Description',
         dataIndex: 'description',
         key: 'description',
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
