import { Col, Row, Space, Statistic, Table, Tooltip, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import priceFormat from '../../../../utils/PriceFormat';
import {
   ArrowDownOutlined,
   ArrowUpOutlined,
   QuestionCircleOutlined,
} from '@ant-design/icons';
import './RevenueChart.scss';

RevenueChart.propTypes = {
   revenueByDate: PropTypes.array,
   today: PropTypes.string,
};

RevenueChart.defaultProps = {
   revenueByDate: [],
   today: '',
};

const { Text, Title, Paragraph } = Typography;

function RevenueChart(props) {
   const { revenueByDate, today } = props;

   const [revenueToday, setRevenueToday] = useState({});

   useEffect(() => {
      const find = revenueByDate.find((r) => r.paidAt === today);
      if (!find)
         return setRevenueToday({
            totalPrice: 0,
            orders: 0,
         });
      setRevenueToday({
         totalPrice: find.totalPrice,
         orders: find.orders,
      });
   }, [revenueByDate, today]);

   const columns = [
      {
         title: 'Paid at',
         render: (record) => record.paidAt,
      },
      {
         title: 'Orders',
         render: (record) => record.orders,
      },
      {
         title: 'Total',
         render: (record) => priceFormat(record.totalPrice),
      },
   ];

   const calculateIncreasePercent = () => {
      const today = revenueToday?.totalPrice;
      const yesterday = revenueByDate[revenueByDate.length - 2]?.totalPrice;
      const result = ((today - yesterday) / yesterday) * 100;
      return result && result > 0 ? (
         <Statistic
            value={result}
            precision={2}
            valueStyle={{
               color: '#3EB388',
               fontWeight: 500,
               fontSize: 17,
               marginTop: 4,
            }}
            prefix={<ArrowUpOutlined />}
            suffix='%'
         />
      ) : (
         <Statistic
            value={result}
            precision={2}
            valueStyle={{
               color: '#cf1322',
               fontWeight: 500,
               fontSize: 17,
               marginTop: 4,
            }}
            prefix={<ArrowDownOutlined />}
            suffix='%'
         />
      );
   };

   return (
      <>
         <Row gutter={[10, 10]}>
            <Col flex='663px'>
               <div>
                  <Paragraph>
                     <Space>
                        <Title level={5} style={{ marginBottom: 2 }}>
                           Revenue line chart
                        </Title>
                        <Tooltip
                           placement='top'
                           title='Only include rented success order'
                        >
                           <QuestionCircleOutlined
                              style={{ cursor: 'pointer' }}
                           />
                        </Tooltip>
                     </Space>
                     <div>
                        <Text>Overview Revenue on per day</Text>
                     </div>
                  </Paragraph>
               </div>
               <div>
                  <Line
                     height={190}
                     data={{
                        labels: revenueByDate?.map(({ paidAt }) => paidAt),
                        datasets: [
                           {
                              data: revenueByDate?.map(
                                 ({ totalPrice }) => totalPrice
                              ),
                              label: 'Revenue',
                              borderColor: '#36A2EC',
                              backgroundColor: '#9AD0F5',
                              tension: 0.1,
                           },
                        ],
                     }}
                  />
               </div>
            </Col>
            <Col flex='auto'>
               <div className='revenueCardInDay'>
                  <Statistic
                     title={`Revenue in Today "${today || 0}"`}
                     value={`
                     ${priceFormat(revenueToday.totalPrice)} | 
                     ${revenueToday.orders || 0} orders
                     `}
                     valueStyle={{ fontWeight: 700 }}
                  />
                  {calculateIncreasePercent()}
               </div>
               <div>
                  <Table
                     className='revenueTableByDate'
                     rowKey={(record) => record.paidAt}
                     dataSource={revenueByDate}
                     columns={columns}
                     pagination={{
                        pageSize: 4,
                        size: 'small',
                        position: ['bottomRight'],
                     }}
                     footer={() => {
                        let totalRevenue = 0;
                        let totalOrders = 0;
                        revenueByDate?.forEach(({ totalPrice, orders }) => {
                           totalRevenue += totalPrice;
                           totalOrders += orders;
                        });

                        return (
                           <>
                              <Space size={25}>
                                 <b>Total Revenue:</b>
                                 <div>{totalOrders}</div>
                                 <div className='totalFooterRow'>
                                    {priceFormat(totalRevenue)}
                                 </div>
                              </Space>
                           </>
                        );
                     }}
                  />
               </div>
            </Col>
         </Row>
      </>
   );
}

export default RevenueChart;
