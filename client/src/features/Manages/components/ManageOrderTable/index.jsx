import { InfoCircleOutlined } from '@ant-design/icons';
import {
   Col,
   DatePicker,
   Image,
   Row,
   Space,
   Table,
   Tag,
   Typography,
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router';
import priceFormat from '../../../../utils/PriceFormat';
import './ManageOrderTable.scss';

ManageOrderTable.propTypes = {
   dataSource: PropTypes.array,
   tag: PropTypes.string,
   tagColor: PropTypes.string,
   buttonGroup: PropTypes.func,
   handlePageChange: PropTypes.func,
   userTitleTable: PropTypes.func,
};

ManageOrderTable.defaultProps = {
   dataSource: [],
   buttonGroup: null,
   tag: '',
   tagColor: '',
   handlePageChange: null,
   userTitleTable: null,
};

const { Text } = Typography;
const { RangePicker } = DatePicker;

function ManageOrderTable(props) {
   const {
      dataSource,
      buttonGroup,
      userTitleTable,
      tag,
      tagColor,
      handlePageChange,
   } = props;
   const history = useHistory();

   const titleOfTable = (order) => {
      return (
         <Row>
            <Col flex='auto'>
               <Space size={20}>
                  <Tag color={tagColor}>{tag}</Tag>
                  {userTitleTable(order)}
               </Space>
            </Col>
            <Col>
               <Space size={20}>
                  <Text>
                     {moment(order.createdAt).format('YYYY-MM-DD HH:mm')}
                  </Text>
                  <InfoCircleOutlined
                     className='orderDetailButton'
                     onClick={() => history.push(`/manages/order/${order.id}`)}
                  />
               </Space>
            </Col>
         </Row>
      );
   };

   const footerOfTable = (order) => {
      return (
         <Row>
            <Col flex='auto'>{buttonGroup(order)}</Col>
            <Col>
               <Space>
                  <Text className='footerTitle'>Total Price: </Text>
                  <Text className='footerPrice'>
                     {priceFormat(order.totalPrice)}
                  </Text>
               </Space>
            </Col>
         </Row>
      );
   };

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
   ];

   return (
      <>
         {dataSource.length ? (
            <InfiniteScroll
               dataLength={dataSource.length}
               next={() => handlePageChange()}
               hasMore={true}
            >
               {dataSource?.map((order) => (
                  <div key={order.id}>
                     <Table
                        className='managePendingOrderTable'
                        dataSource={order.orderItems}
                        rowKey={(record) => record.id}
                        pagination={false}
                        columns={columns}
                        title={() => titleOfTable(order)}
                        footer={() => footerOfTable(order)}
                     />
                  </div>
               ))}
            </InfiniteScroll>
         ) : (
            <Table hasData={false} className='managePendingOrderTable' />
         )}
      </>
   );
}

export default ManageOrderTable;
