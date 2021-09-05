import { Col, Pagination, Row, Steps, Tabs } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import userApi from '../../../../api/userApi';
import OrderDetailComment from '../OrderDetailComment';
import OrderDetailCustomerInfo from '../OrderDetailCustomerInfo';
import './OrderDetailContent.scss';

OrderDetailContent.propTypes = {
   orderDetail: PropTypes.object,
   partnerId: PropTypes.string,
};

OrderDetailContent.defaultProps = {
   orderDetail: {},
   partnerId: '',
};

const { TabPane } = Tabs;
const { Step } = Steps;

function OrderDetailContent(props) {
   const { orderDetail, partnerId } = props;

   const [stepData, setStepData] = useState([]);
   const [comments, setComments] = useState([]);
   const [commentsCount, setCommentsCount] = useState(0);
   const [selectTab, setSelectTab] = useState('1');
   const [page, setPage] = useState(1);

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
            console.log('comment', response);

            setComments(response.comments);
            setCommentsCount(response.count);
         } catch (error) {
            console.log(error);
         }
      };
      getComments();
   }, [page, selectTab, partnerId]);

   return (
      <>
         <div className='orderDetailContent'>
            <Row style={{ minHeight: 285 }} justify='start' align='middle'>
               <Col span={19}>
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
                        <div style={{ minHeight: 206 }}>
                           {comments?.map((comment) => (
                              <OrderDetailComment
                                 comment={comment}
                                 key={comment.id}
                              />
                           ))}
                        </div>
                        <Pagination
                           defaultCurrent={1}
                           total={commentsCount}
                           pageSize={4}
                           onChange={(value) => setPage(value)}
                           size='small'
                           style={{ textAlign: 'end', marginRight: 10 }}
                        />
                     </TabPane>
                  </Tabs>
               </Col>
               <Col span={5}>
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
      </>
   );
}

export default OrderDetailContent;
