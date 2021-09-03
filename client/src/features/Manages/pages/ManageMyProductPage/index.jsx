import { Button, Table, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import productApi from '../../../../api/productApi';
import priceFormat from '../../../../utils/PriceFormat';
import './ManageMyProduct.scss';

function ManageMyProductPage(props) {
   const history = useHistory();
   const userId = useSelector((state) => state.users.id);
   const [myProduct, setMyProduct] = useState([]);

   useEffect(() => {
      if (!userId) return;
      const getMyProduct = async () => {
         const response = await productApi.getMyProduct({
            firebaseId: userId,
         });
         setMyProduct(response);
      };
      getMyProduct();
   }, [userId]);

   const columns = [
      {
         title: 'Image',
         dataIndex: ['productPhotoURL'],
         width: 80,
         render: (record) => (
            <Image
               src={record[0]}
               width={80}
               style={{ minHeight: 80, borderRadius: 10, objectFit: 'cover' }}
            />
         ),
      },
      {
         title: 'Name',
         dataIndex: ['name'],
         key: 'name',
      },
      {
         title: 'Brand',
         dataIndex: ['brand'],
         key: 'brand',
      },
      {
         title: 'Price',
         dataIndex: ['price'],
         key: 'price',
         render: (record) => <div>{priceFormat(record)}</div>,
      },
      {
         title: 'Stock',
         dataIndex: ['stock'],
         key: 'stock',
      },
      {
         title: 'Action',
         dataIndex: ['slug'],
         render: (record) => (
            <Button onClick={() => history.push(`/product/edit/${record}`)}>
               Edit
            </Button>
         ),
      },
   ];

   return (
      <>
         <div>
            <Table
               className='myProductTable'
               dataSource={myProduct}
               columns={columns}
               ellipsis={true}
               pagination={false}
               rowKey={(record) => record.id}
            />
         </div>
      </>
   );
}

export default ManageMyProductPage;
