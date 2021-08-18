import { CommentOutlined, InfoCircleOutlined } from '@ant-design/icons';
import {
   Col,
   DatePicker,
   Divider,
   Image,
   Row,
   Table,
   Tag,
   Typography,
   Space,
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import priceFormat from '../../../../utils/PriceFormat';
import ProductManageModalComment from '../ProductManageModalComment';
import ProductManageModalOrder from '../ProductManageModalOrder';
import './ProductManageTable.scss';

ProductManageTable.propTypes = {
   orders: PropTypes.array,
   handleClickDeleteOrderButton: PropTypes.func,
   handleClickCommentButton: PropTypes.func,
   userPhotoURL: PropTypes.string,
   handlePageChange: PropTypes.func,
};

ProductManageTable.defaultProps = {
   orders: [],
   handleClickDeleteOrderButton: null,
   handleClickCommentButton: null,
   userPhotoURL: '',
   handlePageChange: null,
};

const { RangePicker } = DatePicker;
const { Text } = Typography;

function ProductManageTable(props) {
   const {
      orders,
      handleClickDeleteOrderButton,
      current,
      handleClickCommentButton,
      userPhotoURL,
      handlePageChange,
   } = props;

   const [isModalVisible, setIsModalVisible] = useState(false);
   const [orderDetail, setOrderDetail] = useState();
   const [commentModal, setCommentModal] = useState(false);
   const [orderItemDetail, setOrderItemDetail] = useState({});

   let columns = [
      {
         title: 'Image',
         dataIndex: ['Product', 'productPhotoURL'],
         width: 80,
         render: (record) => (
            <Image src={record[0]} width={80} style={{ minHeight: 80 }} />
         ),
      },
      {
         title: 'Name',
         dataIndex: ['Product'],
         width: 100,
         render: (record) => (
            <Link to={`/product/${record.slug}`} className='productManageName'>
               {record.name}
            </Link>
         ),
      },
      {
         title: 'Start - End',
         width: 200,
         render: (record) => {
            const startDate = moment(record.startDate);
            const endDate = moment(record.endDate);
            return (
               <RangePicker
                  disabled
                  className='productManageDate'
                  disable
                  defaultValue={[startDate, endDate]}
                  format='YYYY/MM/DD HH:mm'
               />
            );
         },
      },
   ];

   current === 6 &&
      columns.push({
         title: 'Comment',
         width: 60,
         render: (record) => (
            <CommentOutlined
               className='commentButton'
               key={record.id}
               onClick={() => {
                  setCommentModal(true);
                  setOrderItemDetail(record);
               }}
            />
         ),
      });

   const tileOfTable = (order) => {
      const statusTagColor = () => {
         switch (order.orderStatus?.name) {
            case 'PENDING':
               return {
                  color: 'processing',
               };
            case 'RENTED':
               return {
                  color: 'success',
               };
            case 'FAILURE':
               return {
                  color: 'error',
               };
            case 'ACCEPT': {
               return {
                  color: 'blue',
               };
            }
            case 'BACK': {
               return {
                  color: 'warning',
               };
            }
            default:
               break;
         }
      };
      return (
         <div>
            <Row>
               <Col flex='auto'>
                  <Tag {...statusTagColor()}>{order.orderStatus?.name}</Tag>
                  <Divider type='vertical' />
                  &nbsp;
                  <Link
                     to={`/profile/${order.orderItems[0]?.Product.User.firebaseId}`}
                     className='productManageName'
                  >
                     <b>{order.orderItems[0].Product.User.username}</b>
                  </Link>
               </Col>
               <Col>
                  <Space>
                     <Text>
                        {moment(order.createdAt).format('YYYY-MM-DD HH:mm')}
                     </Text>
                     <InfoCircleOutlined
                        className='orderDetailButton'
                        onClick={() => {
                           setOrderDetail(order);
                           setIsModalVisible(true);
                        }}
                     />
                  </Space>
               </Col>
            </Row>
         </div>
      );
   };

   const footerOfTable = (totalPrice) => {
      return (
         <Row>
            <Col flex='auto' className='footerTitle'>
               Total Price:
            </Col>
            <Col className='footerOfTable'>{priceFormat(totalPrice)}</Col>
         </Row>
      );
   };

   const handleOnClickCancelOrderModal = () => {
      setIsModalVisible(false);
   };

   const handleOnClickCancelCommentModal = () => {
      setCommentModal(false);
   };

   return (
      <div>
         {orders.length > 0 ? (
            <InfiniteScroll
               dataLength={orders.length}
               next={() => handlePageChange()}
               hasMore={true}
            >
               <div style={{ minHeight: '550px' }}>
                  {orders.map((order) => (
                     <div key={order.id} className='productManage'>
                        <Table
                           ellipsis={true}
                           tableLayout='fixed'
                           title={() => tileOfTable(order)}
                           footer={() => footerOfTable(order.totalPrice)}
                           className='productManageTable'
                           pagination={false}
                           rowKey={(record) => record.id}
                           dataSource={order.orderItems}
                           columns={columns}
                        />
                     </div>
                  ))}
               </div>
            </InfiniteScroll>
         ) : (
            <div style={{ minHeight: '550px' }}>
               <Table hasData={false} className='productManageTableEmpty' />
            </div>
         )}
         <ProductManageModalOrder
            orderDetail={orderDetail}
            isModalVisible={isModalVisible}
            handleOnClickCancelOrderModal={handleOnClickCancelOrderModal}
            handleClickDeleteOrderButton={handleClickDeleteOrderButton}
         />
         <ProductManageModalComment
            commentModal={commentModal}
            handleOnClickCancelCommentModal={handleOnClickCancelCommentModal}
            handleClickCommentButton={handleClickCommentButton}
            userPhotoURL={userPhotoURL}
            orderItemDetail={orderItemDetail}
         />
      </div>
   );
}

export default ProductManageTable;
