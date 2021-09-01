import { ShoppingCartOutlined } from '@ant-design/icons';
import {
   Button,
   Image,
   Modal,
   Space,
   Table,
   Typography,
   DatePicker,
   Divider,
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import priceFormat from '../../../../utils/PriceFormat';
import './SocialPostProduct.scss';

const { Text } = Typography;

SocialPostProduct.propTypes = {
   isModalProductVisible: PropTypes.bool,
   handleOnClickCancelModal: PropTypes.func,
   selectPost: PropTypes.array,
   userId: PropTypes.string,
   handleOnClickAddToCart: PropTypes.func,
};

SocialPostProduct.defaultProps = {
   isModalProductVisible: false,
   handleOnClickCancelModal: null,
   selectPost: [],
   userId: '',
   handleOnClickAddToCart: null,
};

const { RangePicker } = DatePicker;

function SocialPostProduct(props) {
   const {
      isModalProductVisible,
      handleOnClickCancelModal,
      selectPost,
      userId,
      handleOnClickAddToCart,
   } = props;

   const [date, setDate] = useState([
      moment().add(2, 'hour').format('YYYY-MM-DD HH:mm'),
      moment().add({ days: 1, hour: 2 }).format('YYYY-MM-DD HH:mm'),
   ]);

   const columns = [
      {
         dataIndex: ['product', 'productPhotoURL'],
         width: 80,
         render: (record) => (
            <Image src={record[0]} className='modalTableImage' />
         ),
      },
      {
         dataIndex: ['product'],
         render: (record) => (
            <>
               <div className='postProductNameTable'>
                  <Space direction='vertical' size={0}>
                     <Text className='productBrand'>{record.brand}</Text>
                     <Link to={`/product/${record.slug}`}>
                        <Text className='productName'>{record.name}</Text>
                     </Link>
                  </Space>
               </div>
            </>
         ),
      },
      {
         dataIndex: ['product', 'price'],
         render: (record) => (
            <>
               <div style={{ textAlign: 'right' }}>
                  <Text className='productPrice'>{priceFormat(record)}</Text>
                  <Text className='productPerHour'>/hour</Text>
               </div>
            </>
         ),
      },
      {
         dataIndex: ['product'],
         render: (record) => (
            <Button
               icon={<ShoppingCartOutlined />}
               className='modalPostProductButton'
               onClick={() =>
                  handleOnClickAddToCart({
                     firebaseId: userId,
                     productId: record.id,
                     startDate: moment(date[0]).toISOString(),
                     endDate: moment(date[1]).toISOString(),
                  })
               }
            />
         ),
      },
   ];

   const disabledDate = (current) => {
      return (
         current < moment().startOf('day') && current < moment().endOf('day')
      );
   };

   const onDateTimeChange = (dates, dateStrings) => {
      if (!dates || !dateStrings) return;
      setDate([
         dates[0].format('YYYY-MM-DD HH:mm'),
         dates[1].format('YYYY-MM-DD HH:mm'),
      ]);
   };

   return (
      <>
         <Modal
            visible={isModalProductVisible}
            onCancel={handleOnClickCancelModal}
            footer={false}
            title={<Text className='modalTitle'>Taken By ✨</Text>}
            className='modalPostProduct'
            width={560}
         >
            <div className='datePickerContainer'>
               <Space>
                  <div>
                     <Text className='title'>Date Time</Text>
                     <Text className='description'>
                        Choose the time to rent the camera
                     </Text>
                  </div>
                  <RangePicker
                     className='datePicker'
                     disabledDate={disabledDate}
                     allowClear={false}
                     ranges={{
                        'Rent Tomorrow': [
                           moment().add(1, 'days'),
                           moment().add(2, 'days'),
                        ],
                        '30 days': [
                           moment().add(1, 'days'),
                           moment().add(31, 'days'),
                        ],
                     }}
                     showTime
                     format='YYYY/MM/DD HH:mm'
                     onChange={onDateTimeChange}
                     defaultValue={[
                        moment().add(2, 'hour'),
                        moment().add({ days: 1, hour: 2 }),
                     ]}
                  />
               </Space>
            </div>
            <Divider className='divider' />
            <Table
               dataSource={selectPost}
               rowKey={(record) => record.id}
               columns={columns}
               pagination={{
                  pageSize: 4,
                  size: 'small',
                  position: ['bottomRight'],
               }}
               className='modalPostProductTable'
               tableLayout='auto'
            />
         </Modal>
      </>
   );
}

export default SocialPostProduct;
