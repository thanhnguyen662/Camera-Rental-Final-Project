import React from 'react';
import PropTypes from 'prop-types';
import { Table, Image } from 'antd';
ManageShopProductTable.propTypes = {
   myProduct: PropTypes.array,
};

ManageShopProductTable.defaultProps = {
   myProduct: [],
};

function ManageShopProductTable(props) {
   const { myProduct } = props;

   const columns = [
      {
         title: 'Image',
         dataIndex: ['productPhotoURL'],
         width: 80,
         render: (record) => (
            <Image src={record[0]} width={80} style={{ minHeight: 80 }} />
         ),
      },
      {
         title: 'Name',
         dataIndex: ['name'],
         key: 'name',
      },
      {
         title: 'Price',
         dataIndex: ['price'],
         key: 'price',
      },
      {
         title: 'Stock',
         dataIndex: ['stock'],
         key: 'stock',
      },
   ];

   return (
      <div>
         <Table
            dataSource={myProduct}
            columns={columns}
            ellipsis={true}
            pagination={false}
            rowKey={(record) => record.id}
         />
      </div>
   );
}

export default ManageShopProductTable;
