import { DatePicker, Image, Table, Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import priceFormat from '../../../../utils/PriceFormat';
import './OrderDetailItemsTable.scss';

OrderDetailItemsTable.propTypes = {
   dataSource: PropTypes.object,
};

OrderDetailItemsTable.defaultProps = {
   dataSource: {},
};

const { Text } = Typography;
const { RangePicker } = DatePicker;

function OrderDetailItemsTable(props) {
   const { dataSource } = props;

   const columns = [
      {
         title: 'Image',
         dataIndex: ['Product', 'productPhotoURL'],
         width: 80,
         render: (record) => (
            <Image
               src={record[0]}
               width={80}
               height={80}
               style={{ objectFit: 'cover', borderRadius: 10 }}
            />
         ),
      },
      {
         title: 'Name',
         dataIndex: ['Product', 'name'],
         render: (record) => <Text>{record}</Text>,
      },
      {
         title: 'Date',
         render: (record) => (
            <RangePicker
               disabled={true}
               className='orderDateTime'
               value={[moment(record.startDate), moment(record.endDate)]}
               format='YYYY/MM/DD HH:mm'
            />
         ),
      },
      {
         title: 'Price/hour',
         dataIndex: ['Product', 'price'],
         render: (record) => <Text>{priceFormat(record)}</Text>,
      },
      {
         title: 'Total',
         render: (record) => {
            const startDate = moment(record.startDate);
            const endDate = moment(record.endDate);
            const duringHoursPerRow = endDate.diff(startDate, 'hours');
            return (
               <Text>
                  {priceFormat(record.Product.price * duringHoursPerRow)}
               </Text>
            );
         },
      },
   ];

   const footer = () => {
      return (
         <div style={{ textAlign: 'end' }}>
            <Text className='footerTitle'>Total Price: </Text>
            <Text className='footerPrice'>
               {priceFormat(dataSource.totalPrice)}
            </Text>
         </div>
      );
   };

   return (
      <>
         <Table
            className='orderItemsDetailTable'
            dataSource={dataSource.orderItems}
            pagination={false}
            rowKey={(record) => record.id}
            columns={columns}
            footer={() => footer()}
         />
      </>
   );
}

export default OrderDetailItemsTable;
