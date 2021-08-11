import {
   DeleteOutlined,
   InfoCircleOutlined,
   CommentOutlined,
} from '@ant-design/icons';
import {
   Button,
   Col,
   DatePicker,
   Divider,
   Image,
   Modal,
   Row,
   Table,
   Tag,
   Typography,
   Form,
   Input,
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import priceFormat from '../../../../utils/PriceFormat';
import './ProductManageTable.scss';

ProductManageTable.propTypes = {
   orders: PropTypes.array,
   handleClickDeleteOrderButton: PropTypes.func,
   handleClickCommentButton: PropTypes.func,
};

ProductManageTable.defaultProps = {
   orders: [],
   handleClickDeleteOrderButton: null,
   handleClickCommentButton: null,
};

const { RangePicker } = DatePicker;
const { Paragraph, Text } = Typography;

function ProductManageTable(props) {
   const {
      orders,
      handleClickDeleteOrderButton,
      current,
      handleClickCommentButton,
   } = props;

   const [form] = Form.useForm();

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

   current === 3 &&
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
            case 'SUCCESS':
               return {
                  color: 'success',
               };
            case 'FAILURE':
               return {
                  color: 'error',
               };
            case 'ACCEPT': {
               return {
                  color: 'success',
               };
            }
            case 'DELIVERY': {
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
                  <InfoCircleOutlined
                     className='orderDetailButton'
                     onClick={() => {
                        setOrderDetail(order);
                        setIsModalVisible(true);
                     }}
                  />
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

   const disableButton = () => {
      if (orderDetail?.orderStatus.name === 'PENDING') return;
      return {
         disabled: true,
      };
   };

   return (
      <div>
         {orders.length > 0 ? (
            orders.map((order) => (
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
            ))
         ) : (
            <Table hasData={true} className='productManageTableEmpty' />
         )}
         <Modal
            title={`ID: ${orderDetail?.id}`}
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            className='productOrderDetailModal'
            footer={[
               <Button
                  key='delete'
                  icon={<DeleteOutlined />}
                  onClick={() => {
                     handleClickDeleteOrderButton(orderDetail?.id);
                     setIsModalVisible(false);
                  }}
                  type='danger'
                  {...disableButton()}
               >
                  Delete Order
               </Button>,
               <Button
                  key='back'
                  onClick={() => setIsModalVisible(false)}
                  type='primary'
               >
                  OK
               </Button>,
            ]}
         >
            <Paragraph>
               <Row>
                  <Col flex='auto' className='orderDetailUsername'>
                     <Text>{orderDetail?.User.username}</Text>
                  </Col>
                  <Col className='orderDetailCreateAt'>
                     <Text>
                        {moment(orderDetail?.createdAt).format(
                           'YYYY-MM-DD HH:mm:ss'
                        )}{' '}
                        ({moment(orderDetail?.createdAt).fromNow()})
                     </Text>
                  </Col>
               </Row>
               <Text>{orderDetail?.User.address}</Text>
               <br />
               <Text>{orderDetail?.User.phoneNumber}</Text>
               <br />
            </Paragraph>
            <div className='productManageOrderDetailTable'>
               <Row className='headerText'>
                  <Col span={10}>
                     <h4>Name</h4>
                  </Col>
                  <Col span={4} style={{ textAlign: 'center' }}>
                     <h4>Hours</h4>
                  </Col>
                  <Col span={4} style={{ textAlign: 'center' }}>
                     <h4>Price</h4>
                  </Col>
                  <Col span={6} style={{ textAlign: 'right' }}>
                     <h4>Total</h4>
                  </Col>
               </Row>
               <Divider />
               {orderDetail?.orderItems.map((item) => (
                  <Row key={item.id}>
                     <Col span={10}>
                        <Paragraph>{item.Product.name}</Paragraph>
                     </Col>
                     <Col span={4} style={{ textAlign: 'center' }}>
                        <Paragraph level={5}>{item.during}</Paragraph>
                     </Col>
                     <Col span={4} style={{ textAlign: 'center' }}>
                        <Paragraph level={5}>
                           {priceFormat(item.price)}
                        </Paragraph>
                     </Col>
                     <Col span={6}>
                        <Paragraph level={5} style={{ textAlign: 'right' }}>
                           {priceFormat(item.totalPricePerHour)}
                        </Paragraph>
                     </Col>
                  </Row>
               ))}

               <Divider />
               <Row className='totalPrice'>
                  <Col flex='auto'>
                     <div className='totalPriceTitle'>Total Price</div>
                  </Col>
                  <Col>
                     <div className='totalPriceCal'>
                        {priceFormat(orderDetail?.totalPrice)}
                     </div>
                  </Col>
               </Row>
            </div>
         </Modal>
         <Modal
            visible={commentModal}
            title='Comment in Product'
            onCancel={() => setCommentModal(false)}
            footer={false}
            className='productOrderDetailModal'
         >
            <Form
               form={form}
               onFinish={(values) => {
                  handleClickCommentButton(values, orderItemDetail);
               }}
            >
               <Form.Item name='comment' rules={[{ required: true }]}>
                  <Input.TextArea placeholder='comment here...' />
               </Form.Item>

               <Form.Item
                  wrapperCol={{ offset: 20, span: 3 }}
                  style={{ marginBottom: '0px' }}
               >
                  <Button type='primary' htmlType='submit'>
                     Submit
                  </Button>
               </Form.Item>
            </Form>
         </Modal>
      </div>
   );
}

export default ProductManageTable;
