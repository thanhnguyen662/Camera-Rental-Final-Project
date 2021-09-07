import { Button, Col, Pagination, Row, Steps, Tabs } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import userApi from '../../../../api/userApi';
import OrderCommentModal from '../OrderCommentModal';
import OrderDetailComment from '../OrderDetailComment';
import OrderDetailCustomerInfo from '../OrderDetailCustomerInfo';
import './OrderDetailContent.scss';

OrderDetailContent.propTypes = {
   orderDetail: PropTypes.object,
   partnerId: PropTypes.string,
   handleSubmitComment: PropTypes.func,
};

OrderDetailContent.defaultProps = {
   orderDetail: {},
   partnerId: '',
   handleSubmitComment: null,
};

const { TabPane } = Tabs;
const { Step } = Steps;

function OrderDetailContent(props) {
   const { orderDetail, partnerId, handleSubmitComment, reloadComment } = props;

   const [stepData, setStepData] = useState([]);
   const [comments, setComments] = useState([]);
   const [commentsCount, setCommentsCount] = useState(0);
   const [selectTab, setSelectTab] = useState('1');
   const [page, setPage] = useState(1);
   const [isModalVisible, setIsModalVisible] = useState(false);

   useEffect(() => {
      const newArray = [
         {
            key: 'Created',
            description: 'Created At',
            value: moment(orderDetail.createdAt).format('YYYY-MM-DD HH:mm'),
         },
         {
            key: 'Accept',
            description: 'Accept At',
            value: moment(orderDetail.acceptAt).format('YYYY-MM-DD HH:mm'),
         },
         {
            key: 'Rented',
            description: 'Rented At',
            value: moment(orderDetail.paidAt).format('YYYY-MM-DD HH:mm'),
         },
         {
            key: 'Back',
            description: 'Back At',
            value: moment(orderDetail.backAt).format('YYYY-MM-DD HH:mm'),
         },
         {
            key: 'Failure',
            description: 'Failure At',
            value: moment(orderDetail.cancelAt).format('YYYY-MM-DD HH:mm'),
         },
      ];
      setStepData(newArray);
   }, [orderDetail]);

   useEffect(() => {
      const getComments = async () => {
         if (selectTab === '1' || !partnerId) return;
         try {
            const response = await userApi.getUserComments({
               page: page,
               userId: partnerId,
            });
            setComments(response.comments);
            setCommentsCount(response.count);
         } catch (error) {
            console.log(error);
         }
      };
      getComments();
   }, [page, selectTab, partnerId, reloadComment]);

   const onFormFinish = (data) => {
      handleSubmitComment(data);
      setIsModalVisible(false);
   };

   const handleModalVisible = () => {
      setIsModalVisible(false);
   };

   const commentDisabled = () => {
      if (
         orderDetail.orderStatus?.name === 'BACK' ||
         orderDetail.orderStatus?.name === 'FAILURE'
      )
         return false;
      return true;
   };

   return (
      <>
         <div className='orderDetailContent'>
            <Row>
               <Col span={18}>
                  <Tabs
                     defaultActiveKey='1'
                     size='small'
                     onTabClick={setSelectTab}
                  >
                     <TabPane tab='Customer' key='1'>
                        <OrderDetailCustomerInfo
                           customerInfo={orderDetail.User}
                        />
                     </TabPane>
                     <TabPane tab={`Comment of partner`} key='2'>
                        <div style={{ minHeight: '210px' }}>
                           {comments?.map((comment) => (
                              <OrderDetailComment
                                 comment={comment}
                                 key={comment.id}
                              />
                           ))}
                        </div>
                        <Row justify='center' align='middle'>
                           <Col flex='auto'>
                              <Button
                                 className='commentButton'
                                 onClick={() => setIsModalVisible(true)}
                                 disabled={commentDisabled()}
                              >
                                 Write comment
                              </Button>
                           </Col>
                           <Col>
                              <Pagination
                                 defaultCurrent={1}
                                 total={commentsCount}
                                 current={page}
                                 pageSize={4}
                                 onChange={(value) => setPage(value)}
                                 size='small'
                                 className='paginationComment'
                              />
                           </Col>
                        </Row>
                     </TabPane>
                  </Tabs>
               </Col>
               <Col span={6} push={1}>
                  <div className='stepsTitle'>Order Time Log: </div>
                  <Steps
                     progressDot
                     current={5}
                     direction='vertical'
                     className='orderContentSteps'
                  >
                     {stepData?.map((step) => {
                        if (step.value === 'Invalid date') return null;
                        return (
                           <Step
                              key={step.key}
                              title={step.description}
                              description={step.value}
                           />
                        );
                     })}
                  </Steps>
               </Col>
            </Row>
         </div>
         <div>
            <OrderCommentModal
               isModalVisible={isModalVisible}
               onFormFinish={onFormFinish}
               handleModalVisible={handleModalVisible}
            />
         </div>
      </>
   );
}

export default OrderDetailContent;
