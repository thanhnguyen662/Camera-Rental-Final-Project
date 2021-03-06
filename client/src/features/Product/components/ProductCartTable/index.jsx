import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Image, Table, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './ProductCartTable.scss';
import { Link } from 'react-router-dom';
import priceFormat from '../../../../utils/PriceFormat';

ProductCartTable.propTypes = {
   onClick: PropTypes.func,
   productInCart: PropTypes.array,
   handleDatePickerChange: PropTypes.func,
};

ProductCartTable.defaultProps = {
   onClick: null,
   productInCart: [],
   handleDatePickerChange: null,
};

const { RangePicker } = DatePicker;

function ProductCartTable(props) {
   const {
      onClickRemoveItem,
      productInCart,
      handleDatePickerChange,
      handleChangeRowSelection,
   } = props;

   const [shops, setShops] = useState([]);
   const [select, setSelect] = useState([]);

   useEffect(() => {
      if (!productInCart) return;
      let data = [];
      productInCart.map((p) => {
         data.push(p.Product.User.username);

         return data;
      });

      setShops([...new Set(data)]);
   }, [productInCart]);

   function disabledDate(current) {
      return (
         current < moment().startOf('day') && current < moment().endOf('day')
      );
   }

   const columns = [
      {
         title: 'Image',
         dataIndex: ['Product', 'productPhotoURL'],
         key: productInCart.Product?.id,
         width: 100,
         render: (record) => (
            <Image
               src={record[0]}
               width={80}
               style={{ minHeight: 80, objectFit: 'cover' }}
            />
         ),
      },
      {
         title: 'Name',
         dataIndex: ['Product'],
         key: productInCart.Product?.id,
         width: 180,
         render: (record) => (
            <Link to={`/product/${record.slug}`} className='cartName'>
               {record.name}
            </Link>
         ),
      },
      {
         title: 'Price',
         dataIndex: ['Product', 'price'],
         key: productInCart.Product?.price,
         width: 80,
         render: (record) => (
            <div className='cartPrice'>{priceFormat(record)}</div>
         ),
      },
      {
         title: 'Time',
         width: 330,
         render: (record) => {
            const startDate = moment(record.startDate);
            const endDate = moment(record.endDate);
            const isDisable = select?.find((s) => s.id === record.id) && {
               disabled: true,
            };

            return (
               <RangePicker
                  disabledDate={disabledDate}
                  allowClear={false}
                  className='cartDate'
                  showTime
                  defaultValue={[startDate, endDate]}
                  format='YYYY/MM/DD HH:mm'
                  onChange={(dates, dateStrings) => {
                     if (!dates || !dateStrings) return;
                     handleDatePickerChange(record, dateStrings);
                  }}
                  {...isDisable}
               />
            );
         },
      },
      {
         title: 'Action',
         key: 'action',
         render: (record) => {
            const isDisable = select?.find((s) => s.id === record.id) && {
               disabled: true,
            };
            return (
               <Button
                  className='cartDeleteButton'
                  onClick={() => onClickRemoveItem(record)}
                  icon={<DeleteOutlined />}
                  {...isDisable}
               />
            );
         },
      },
   ];

   const rowSelection = {
      onSelect: (selected) => {
         if (!select.some((s) => s.id === selected.id)) {
            return setSelect([...select, selected]);
         }
         setSelect(select.filter((i) => i.id !== selected.id));
      },
   };

   useEffect(() => {
      handleChangeRowSelection(select);
      // eslint-disable-next-line
   }, [select]);

   const shopTitle = (record) => {
      return (
         <Link
            to={`/profile/${record[0]?.Product.User.firebaseId}`}
            className='shopName'
         >
            <UserOutlined /> &nbsp;{record[0]?.Product.User.username}
         </Link>
      );
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
         {shops.length > 0 ? (
            shops.map((shop) => (
               <div key={shop} className='cart'>
                  <Table
                     ellipsis={true}
                     className='cartTable'
                     dataSource={tableGroupByShops(shop)}
                     rowKey={(record) => record.id}
                     columns={columns}
                     title={(record) => shopTitle(record)}
                     pagination={false}
                     rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                     }}
                  />
               </div>
            ))
         ) : (
            <div className='cart'>
               <Table className='cartTable' hasData={false} />
            </div>
         )}
      </>
   );
}

export default ProductCartTable;
