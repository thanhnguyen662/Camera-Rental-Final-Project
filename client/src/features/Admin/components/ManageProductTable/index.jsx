import {
   AppstoreOutlined,
   ArrowDownOutlined,
   ArrowLeftOutlined,
   ArrowRightOutlined,
   ArrowUpOutlined,
   CameraOutlined,
   CheckOutlined,
   ClockCircleOutlined,
   CloseOutlined,
   UserOutlined,
} from '@ant-design/icons';
import {
   Avatar,
   Button,
   Col,
   DatePicker,
   Image,
   Input,
   Row,
   Select,
   Space,
   Table,
   Tag,
   Typography,
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
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
   const {
      manageProduct,
      onSearch,
      onChangePage,
      page,
      isMore,
      searchFormData,
      onClickActionButton,
   } = props;
   const timeout = useRef(null);

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
               <Link to={`/product/${record.slug}`}>
                  <Space direction='vertical'>
                     <Text style={{ fontWeight: 'bold' }}>{record.brand}</Text>
                     <Text style={{ fontSize: 15 }}>{record.name}</Text>
                  </Space>
               </Link>
            );
         },
      },
      {
         title: 'Name',
         dataIndex: ['User'],
         width: '15%',
         render: (record) => {
            return (
               <Link to={`/profile/${record.firebaseId}`}>
                  <Space direction='vertical' style={{ alignItems: 'center' }}>
                     <Avatar src={record.photoURL} size={45} />
                     <Text>{record.username}</Text>
                  </Space>
               </Link>
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
         render: (record) => {
            return (
               <Space>
                  <Button
                     icon={<CheckOutlined />}
                     type='primary'
                     ghost
                     onClick={() => onClickActionButton('approve', record.id)}
                  />
                  <Button
                     icon={<CloseOutlined />}
                     type='primary'
                     danger
                     ghost
                     onClick={() => onClickActionButton('decline', record.id)}
                  />
               </Space>
            );
         },
      },
   ];

   const productTableSearchBar = () => {
      return (
         <Space size={8}>
            <div className='selectSearchType'>
               <Select
                  defaultValue={searchFormData.type}
                  showArrow={false}
                  onChange={(value) => onSearch('type', value)}
                  dropdownStyle={{ borderRadius: 7 }}
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
                  value={searchFormData.value}
                  onChange={(e) => handleOnSearchChange(e.target.value)}
                  suffix={<BsSearch />}
                  placeholder={`Search ${searchFormData.type} here`}
               />
            </div>
         </Space>
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
      const onDateChange = (dates, dateStrings) => {
         onSearch('rangeDate', [dates[0].toDate(), dates[1].toDate()]);
      };
      return (
         <RangePicker
            allowClear={false}
            className='productTableRangePicker'
            defaultValue={[
               searchFormData.rangeDate[0],
               searchFormData.rangeDate[1],
            ]}
            disabledDate={(current) => current > moment().endOf('days')}
            onChange={onDateChange}
         />
      );
   };

   const productTableStatus = () => {
      return (
         <div className='selectSearchType'>
            <Select
               defaultValue={searchFormData.status}
               showArrow={false}
               onChange={(value) => onSearch('status', value)}
               dropdownStyle={{ borderRadius: 7 }}
            >
               <Option key='all'>
                  <AppstoreOutlined />
                  &nbsp;All
               </Option>
               <Option key='pending'>
                  <ClockCircleOutlined />
                  &nbsp;Pending
               </Option>
               <Option key='declined'>
                  <CloseOutlined />
                  &nbsp;Declined
               </Option>
               <Option key='approved'>
                  <CheckOutlined />
                  &nbsp;Approved
               </Option>
            </Select>
         </div>
      );
   };

   const productCreatedDateSort = () => {
      return (
         <div className='selectSearchType'>
            <Select
               defaultValue={searchFormData.sortDate}
               showArrow={false}
               onChange={(value) => onSearch('sortDate', value)}
               dropdownStyle={{ borderRadius: 7 }}
            >
               <Option key='desc'>
                  <ArrowDownOutlined />
                  &nbsp;Date descending
               </Option>
               <Option key='asc'>
                  <ArrowUpOutlined />
                  &nbsp;Date ascending
               </Option>
            </Select>
         </div>
      );
   };

   const title = () => {
      return (
         <Row gutter={[10, 10]}>
            <Col>{productTableSearchBar()}</Col>
            <Col>{productTableRangePicker()}</Col>
            <Col>{productTableStatus()}</Col>
            <Col flex='auto'>{productCreatedDateSort()}</Col>
            <Col>{productTablePagination()}</Col>
         </Row>
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
