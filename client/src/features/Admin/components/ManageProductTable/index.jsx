import {
   CameraOutlined,
   CheckOutlined,
   CloseOutlined,
   EllipsisOutlined,
   UserOutlined,
   ArrowRightOutlined,
   ArrowLeftOutlined,
} from '@ant-design/icons';
import {
   Avatar,
   Button,
   Col,
   Dropdown,
   Image,
   Input,
   Menu,
   Row,
   Select,
   Space,
   Table,
   Tag,
   Typography,
   DatePicker,
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import './ManageProductTable.scss';

ManageProductTable.propTypes = {
   manageProduct: PropTypes.array,
};

ManageProductTable.defaultProps = {
   manageProduct: [],
};

const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

function ManageProductTable(props) {
   const { manageProduct, onSearch, onChangePage, page, isMore } = props;
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
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
         return onSearch('keyword', value);
      }, 400);
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
                  <div style={{ padding: '2.5px 1.5px', fontSize: 14 }}>
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
         <Row>
            <Col>
               <Space size={8}>
                  <div className='selectSearchType'>
                     <Select
                        defaultValue='product'
                        showArrow={false}
                        onChange={(value) => onSearch('type', value)}
                     >
                        <Option key='product'>
                           <CameraOutlined />
                        </Option>
                        <Option key='user'>
                           <UserOutlined />
                        </Option>
                     </Select>
                  </div>
                  <div className='input'>
                     <Input
                        onChange={(e) => handleOnSearchChange(e.target.value)}
                        suffix={<BsSearch />}
                        placeholder='Search here'
                     />
                  </div>
               </Space>
            </Col>
            <Col flex='auto'>{productTableRangePicker()}</Col>
            <Col>{productTablePagination()}</Col>
         </Row>
      );
   };

   const productTablePagination = () => {
      return (
         <div className='productTablePagination'>
            <Space>
               <Button
                  disabled={page <= 1 ? true : false}
                  icon={<ArrowLeftOutlined />}
                  onClick={() => onChangePage('decrease')}
               />
               <Button
                  disabled={!isMore}
                  icon={<ArrowRightOutlined />}
                  onClick={() => onChangePage('increase')}
               />
            </Space>
         </div>
      );
   };

   const productTableRangePicker = () => {
      return (
         <RangePicker
            style={{ borderRadius: '7px', width: 230 }}
            defaultValue={[moment().subtract(30, 'days'), moment()]}
            disabledDate={(current) => current > moment().endOf('days')}
         />
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
               pagination={false}
            />
         </div>
         <div className='manageProductPagination'>
            {productTablePagination()}
         </div>
      </>
   );
}

export default ManageProductTable;
