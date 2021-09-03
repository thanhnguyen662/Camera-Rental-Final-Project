import { Col, Row, Space, Statistic, Table, Tooltip, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './OrderCreateChart.scss';

OrderCreateChart.propTypes = {
   createByDate: PropTypes.array,
   today: PropTypes.string,
};

OrderCreateChart.defaultProps = {
   createByDate: [],
   today: '',
};

const { Text, Title, Paragraph } = Typography;

function OrderCreateChart(props) {
   const { createByDate, today } = props;

   const [ordersToday, setOrdersToday] = useState({});

   useEffect(() => {
      const find = createByDate.find((r) => r.createdAt === today);
      if (!find)
         return setOrdersToday({
            orders: 0,
         });
      setOrdersToday({
         orders: find.orders,
      });
   }, [createByDate, today]);

   const columns = [
      {
         title: 'Create at',
         render: (record) => record.createdAt,
      },
      {
         title: 'Orders',
         render: (record) => record.orders,
      },
   ];

   return (
      <>
         <Row gutter={[20, 10]}>
            <Col span={16}>
               <div>
                  <Paragraph>
                     <Space>
                        <Title level={5} style={{ marginBottom: 2 }}>
                           Order bar chart
                        </Title>
                        <Tooltip placement='top' title='Include all order'>
                           <QuestionCircleOutlined
                              style={{ cursor: 'pointer' }}
                           />
                        </Tooltip>
                     </Space>
                     <div>
                        <Text>Overview all order on per day</Text>
                     </div>
                  </Paragraph>
               </div>
               <div>
                  <Bar
                     height={185}
                     data={{
                        labels: createByDate.map(({ createdAt }) => createdAt),
                        datasets: [
                           {
                              data: createByDate.map(({ orders }) => orders),
                              label: 'Order',
                              tension: 0.1,
                              borderColor: '#FF6384',
                              borderWidth: 2,
                              backgroundColor: '#FFB1C1',
                              borderRadius: 8,
                           },
                        ],
                     }}
                  />
               </div>
            </Col>
            <Col flex='auto'>
               <div className='orderCardInDay'>
                  <Statistic
                     title={`Today "${today || 0}"`}
                     value={`${ordersToday.orders || 0} orders`}
                  />
               </div>
               <div>
                  <Table
                     className='ordersTableByDate'
                     rowKey={(record) => record.createdAt}
                     dataSource={createByDate}
                     columns={columns}
                     pagination={{
                        pageSize: 4,
                        size: 'small',
                        position: ['bottomRight'],
                     }}
                     footer={() => {
                        let totalOrders = 0;
                        createByDate?.forEach(({ orders }) => {
                           totalOrders += orders;
                        });

                        return (
                           <Row>
                              <Col span={12} style={{ textAlign: 'center' }}>
                                 <b>Total Orders:</b>
                              </Col>
                              <Col
                                 span={12}
                                 style={{
                                    textAlign: 'center',
                                    paddingLeft: 40,
                                 }}
                              >
                                 {totalOrders}
                              </Col>
                           </Row>
                        );
                     }}
                  />
               </div>
            </Col>
         </Row>
      </>
   );
}

export default OrderCreateChart;
