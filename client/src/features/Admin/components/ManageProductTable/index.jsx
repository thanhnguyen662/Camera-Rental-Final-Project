import {
   CheckOutlined,
   CloseOutlined,
   EllipsisOutlined,
} from '@ant-design/icons';
import {
   Avatar,
   Button,
   Dropdown,
   Image,
   Input,
   Menu,
   Space,
   Table,
   Tag,
   Typography,
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import './ManageProductTable.scss';

ManageProductTable.propTypes = {
   manageProduct: PropTypes.array,
};

ManageProductTable.defaultProps = {
   manageProduct: [],
};

const { Text } = Typography;

function ManageProductTable(props) {
   const { manageProduct } = props;
   const [search, setSearch] = useState('');
   const timeout = useRef(null);

   const menu = () => (
      <Menu style={{ width: 120, borderRadius: 8 }}>
         <Menu.Item key='1' icon={<CheckOutlined />}>
            Approve
         </Menu.Item>
         <Menu.Item key='2' icon={<CloseOutlined />}>
            Decline
         </Menu.Item>
      </Menu>
   );

   const handleOnSearchChange = (value) => {
      setSearch(value);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
         return handleSearch(value);
      }, 400);
   };

   const handleSearch = (value) => {
      console.log(value);
   };

   const columns = [
      {
         title: 'Image',
         width: '15%',
         render: (record) => {
            return (
               <Image
                  src={record.productPhotoURL[0]}
                  className='manageProductImage'
               />
            );
         },
      },
      {
         title: 'Product',
         width: '25%',
         render: (record) => {
            return (
               <Space direction='vertical'>
                  <Text style={{ fontWeight: 'bold' }}>{record.brand}</Text>
                  <Text style={{ fontSize: 15 }}>{record.name}</Text>
               </Space>
            );
         },
      },
      {
         title: 'Name',
         dataIndex: ['User'],
         width: '15%',
         render: (record) => {
            return (
               <Space direction='vertical' style={{ alignItems: 'center' }}>
                  <Avatar src={record.photoURL} size={45} />
                  <Text>{record.username}</Text>
               </Space>
            );
         },
      },
      {
         title: 'Status',
         width: '15%',
         render: (record) => {
            const productStatus = () => {
               if (record.publicStatus === null) {
                  return {
                     color: '#108ee9',
                     status: 'Pending',
                  };
               }
               if (record.publicStatus === true) {
                  return {
                     color: '#87d068',
                     status: 'Approved',
                  };
               }
               return {
                  color: '#f50',
                  status: 'Declined',
               };
            };
            return (
               <Tag color={productStatus().color} style={{ borderRadius: 6 }}>
                  <div style={{ padding: '2px 1px', fontSize: 13.5 }}>
                     {productStatus().status}
                  </div>
               </Tag>
            );
         },
      },
      {
         title: 'Create',
         width: '15%',
         render: (record) => {
            return <Text>{moment(record.createdAt).format('YYYY-MM-DD')}</Text>;
         },
      },
      {
         title: 'Action',
         key: 'operation',
         fixed: 'right',
         width: '15%',
         render: () => {
            return (
               <Dropdown overlay={menu} placement='bottomRight'>
                  <Button icon={<EllipsisOutlined />} type='text' />
               </Dropdown>
            );
         },
      },
   ];

   const title = () => {
      return (
         <div className='input'>
            <Input
               value={search}
               onChange={(e) => handleOnSearchChange(e.target.value)}
               suffix={<BsSearch />}
               placeholder='Search here'
            />
         </div>
      );
   };

   return (
      <>
         <div className='manageProduct'>
            <Table
               title={title}
               className='manageProductTable'
               rowKey={(record) => record.id}
               dataSource={manageProduct}
               columns={columns}
            />
         </div>
      </>
   );
}

export default ManageProductTable;
