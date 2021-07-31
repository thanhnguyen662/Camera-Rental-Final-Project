// import PropTypes from 'prop-types';
import { Button, Space, Table, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

ProductCartTable.propTypes = {};

function ProductCartTable(props) {
   const { onClickRemoveItem } = props;
   const productInCart = useSelector((state) => state.cart);
   const [shops, setShops] = useState([]);
   console.log('Product In Cart', productInCart);

   useEffect(() => {
      if (!productInCart) return;
      let data = [];
      productInCart.map((p) => {
         data.push(p.Product.User.username);

         return data;
      });

      setShops([...new Set(data)]);
   }, [productInCart]);

   const columns = [
      {
         title: 'Image',
         dataIndex: ['Product', 'productPhotoURL'],
         key: productInCart.Product?.id,
         width: 110,
         render: (record) => <Image src={record[0]} width={100} />,
      },
      {
         title: 'Name',
         dataIndex: ['Product', 'name'],
         key: productInCart.Product?.id,
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
         render: (record) => (
            <Space size='middle'>
               <Button onClick={() => onClickRemoveItem(record)}>Delete</Button>
            </Space>
         ),
      },
   ];

   const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
         console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
         );
      },
      getCheckboxProps: (record) => ({
         disabled: record.name === 'Disabled User',
         // Column configuration not to be checked
         name: record.name,
      }),
   };

   const tableGroupByShops = (shop) => {
      const dataFilter = [];
      // eslint-disable-next-line
      productInCart.map((product) => {
         if (product.Product.User.username === shop) {
            dataFilter.push(product);
         }
      });
      return dataFilter;
   };

   return (
      <>
         {shops.map((shop) => (
            <Table
               key={shop}
               rowKey={(record) => record.id}
               columns={columns}
               dataSource={tableGroupByShops(shop)}
               title={() => shop}
               rowSelection={{
                  type: 'checkbox',
                  ...rowSelection,
               }}
            />
         ))}
      </>
   );
}

export default ProductCartTable;
