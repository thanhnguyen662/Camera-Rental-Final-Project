import {
   ArrowDownOutlined,
   ArrowUpOutlined,
   QuestionCircleOutlined,
} from '@ant-design/icons';
import {
   Card,
   Col,
   DatePicker,
   Divider,
   Row,
   Table,
   Tooltip,
   Typography,
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import priceFormat from '../../../../utils/PriceFormat';
import './ManageShopOverview.scss';

ManageShopOverview.propTypes = {
   allMyProductInOrder: PropTypes.array,
};

ManageShopOverview.defaultProps = {
   allMyProductInOrder: [],
};

const { Grid } = Card;
const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;

function ManageShopOverview(props) {
   const { allMyProductInOrder, setCurrent } = props;

   const [datePickerRange, setDatePickerRange] = useState(['', '']);
   const [pending, setPending] = useState(0);
   const [accept, setAccept] = useState(0);
   const [success, setSuccess] = useState(0);
   const [failure, setFailure] = useState(0);
   const [lineChart, setLineChart] = useState([]);
   const [dateNow, setDateNow] = useState('');
   const [orders, setOrders] = useState([]);

   useEffect(() => {
      setDateNow(moment().format('YYYY-MM-DD'));
   }, []);

   const sumArray = (array) => {
      if (array.length === 0) return;
      const reducer = (accumulator, curr) => accumulator + curr;
      return array.reduce(reducer);
   };

   useEffect(() => {
      if (allMyProductInOrder.length === 0) return;
      let dateByOrder = [];
      // eslint-disable-next-line
      allMyProductInOrder.map((o) => {
         if (
            datePickerRange[0] !== '' &&
            new Date(o.paidAt) >= new Date(datePickerRange[0]) &&
            new Date(o.paidAt) <= new Date(datePickerRange[1])
         ) {
            dateByOrder.push(o);
         }
         if (datePickerRange[0] === '') {
            dateByOrder.push(o);
         }
      });

      return setOrders(dateByOrder);
   }, [datePickerRange, allMyProductInOrder]);

   useEffect(() => {
      if (allMyProductInOrder.length === 0) return;
      let uniqueDate = [];
      let totalMoneyInDay = [];
      let orderInDay = 0;

      setAccept(0);
      setPending(0);
      setSuccess(0);
      setFailure(0);

      // eslint-disable-next-line
      allMyProductInOrder.map((o) => {
         switch (o.orderStatus.name) {
            case 'PENDING':
               setPending((prev) => prev + 1);
               break;
            case 'ACCEPT':
               setAccept((prev) => prev + 1);
               break;
            case 'SUCCESS':
               setSuccess((prev) => prev + 1);
               break;
            case 'FAILURE':
               setFailure((prev) => prev + 1);
               break;

            default:
               break;
         }
      });

      orders.map((o) => {
         return uniqueDate.push(moment(o.paidAt).format('YYYY-MM-DD'));
      });
      uniqueDate = [...new Set(uniqueDate)];
      uniqueDate.sort((a, b) => {
         return new Date(a) - new Date(b);
      });
      setLineChart([]);
      // eslint-disable-next-line
      uniqueDate.map((date) => {
         // eslint-disable-next-line
         orders.map((o) => {
            if (
               moment(o.paidAt).format('YYYY-MM-DD') === date &&
               o.orderStatus.name === 'SUCCESS'
            ) {
               orderInDay = orderInDay + 1;
               return totalMoneyInDay.push(o.totalPrice);
            }
         });
         const newData = {
            paidAt: date,
            moneyInDay: sumArray(totalMoneyInDay),
            orderInDay: orderInDay,
         };
         // eslint-disable-next-line
         if (newData.moneyInDay === undefined) return;
         setLineChart((prev) => [...prev, newData]);
         totalMoneyInDay = [];
         orderInDay = 0;
      });
   }, [orders, allMyProductInOrder]);

   const columns = [
      {
         title: 'Date',
         dataIndex: ['paidAt'],
      },
      {
         title: 'Revenue',
         dataIndex: ['moneyInDay'],
         render: (record) => <div>{priceFormat(record)}</div>,
      },
   ];
   const columnsOrder = [
      {
         title: 'Date',
         dataIndex: ['paidAt'],
      },
      {
         title: 'Order',
         dataIndex: ['orderInDay'],
         render: (record) => <div>{record}</div>,
      },
   ];

   const calculateIncreasePercent = (today, yesterday) => {
      const result = ((today - yesterday) / yesterday) * 100;

      return result > 0 ? (
         <Text className='cardRevenuePercent'>
            <ArrowUpOutlined /> increase {Math.round(result)}%
         </Text>
      ) : (
         <Text style={{ color: 'red' }}>
            <ArrowDownOutlined /> decrease {Math.round(result) || 0}%
         </Text>
      );
   };

   function disabledDate(current) {
      return current && current > moment().add(1, 'days');
   }

   return (
      <>
         <div className='overviewTableGird'>
            <Title level={5} style={{ marginBottom: 2 }}>
               Order
            </Title>
            <Paragraph>Overview status of your order</Paragraph>
            <Card>
               <Grid className='tableGrid' onClick={() => setCurrent('ALL')}>
                  <div className='tableGridLabel'>All Order</div>
                  <div>{allMyProductInOrder.length}</div>
               </Grid>
               <Grid
                  className='tableGrid'
                  onClick={() => setCurrent('PENDING')}
               >
                  <div className='tableGridLabel'>Pending Order</div>
                  <div>{pending}</div>
               </Grid>
               <Grid className='tableGrid' onClick={() => setCurrent('ACCEPT')}>
                  <div className='tableGridLabel'>Accept Order</div>
                  <div>{accept}</div>
               </Grid>
               <Grid
                  className='tableGrid'
                  onClick={() => setCurrent('SUCCESS')}
               >
                  <div className='tableGridLabel'>Success Order</div>
                  <div>{success}</div>
               </Grid>
               <Grid
                  className='tableGrid'
                  onClick={() => setCurrent('FAILURE')}
               >
                  <div className='tableGridLabel'>Failure Order</div>
                  <div>{failure}</div>
               </Grid>
            </Card>
         </div>
         <Divider />
         <div className='searchByDateTime'>
            <Row>
               <Col span={16}>
                  <Title level={5} style={{ marginBottom: 2 }}>
                     Select the Date
                  </Title>
                  <Paragraph>View orders statistic by Date</Paragraph>
               </Col>
               <Col span={8}>
                  <RangePicker
                     className='datePickerSearch'
                     disabledDate={disabledDate}
                     allowClear={true}
                     format='YYYY/MM/DD'
                     defaultValue={[datePickerRange[0], datePickerRange[1]]}
                     onChange={(dates, dateStrings) => {
                        setDatePickerRange(dateStrings);
                     }}
                  />
               </Col>
            </Row>
         </div>
         <Divider />
         <Row>
            <Col span={16}>
               <div className='revenueChartOverview'>
                  <Title level={5} style={{ marginBottom: 2 }}>
                     Revenue line chart{' '}
                     {
                        <Tooltip
                           placement='top'
                           title='Only include success order'
                        >
                           <QuestionCircleOutlined
                              style={{ cursor: 'pointer' }}
                           />
                        </Tooltip>
                     }
                  </Title>
                  <Paragraph>Overview Revenue on per day</Paragraph>
                  {
                     <Line
                        data={{
                           labels: lineChart.map(({ paidAt }) => paidAt),
                           datasets: [
                              {
                                 data: lineChart.map(
                                    ({ moneyInDay }) => moneyInDay
                                 ),
                                 label: 'Revenue',
                                 borderColor: '#36A2EC',
                                 backgroundColor: '#9AD0F5',
                                 tension: 0.1,
                              },
                           ],
                        }}
                     />
                  }
               </div>
            </Col>
            <Col span={8} className='cardRevenueCol'>
               <div className='cardRevenue'>
                  <Paragraph>
                     <div className='cardRevenueDescription'>
                        Revenue at today "{dateNow}"
                     </div>
                     <div>
                        {lineChart.find((date) => date.paidAt === dateNow) ? (
                           // eslint-disable-next-line
                           lineChart.map((item) => {
                              if (item.paidAt === dateNow) {
                                 const indexOfToday = lineChart.indexOf(item);
                                 const revenueOfBeforeDay =
                                    lineChart[indexOfToday - 1]?.moneyInDay;
                                 const revenueOfToday = item.moneyInDay;

                                 return (
                                    <div key={item.paidAt}>
                                       <Paragraph>
                                          <Title level={2}>
                                             {priceFormat(revenueOfToday)}
                                          </Title>{' '}
                                          {calculateIncreasePercent(
                                             revenueOfToday,
                                             revenueOfBeforeDay
                                          )}
                                       </Paragraph>
                                    </div>
                                 );
                              }
                           })
                        ) : (
                           <Paragraph>
                              <Title level={2}>{priceFormat(0)}</Title>{' '}
                              {calculateIncreasePercent(
                                 0,
                                 lineChart[lineChart.length - 1]?.moneyInDay ||
                                    0
                              )}
                           </Paragraph>
                        )}
                     </div>
                  </Paragraph>
               </div>
               <Table
                  className='cardRevenueTable'
                  dataSource={lineChart}
                  columns={columns}
                  ellipsis={true}
                  pagination={false}
                  size='middle'
                  scroll={{ x: 0, y: 145 }}
                  rowKey={(record) => record.paidAt}
                  footer={(record) => {
                     let totalRevenue = 0;
                     record?.forEach(({ moneyInDay }) => {
                        totalRevenue += moneyInDay;
                     });

                     return (
                        <Row>
                           <Col flex='150px' style={{ fontStyle: 'italic' }}>
                              <b>Total Revenue:</b>
                           </Col>
                           <Col>
                              <div className='totalFooterRow'>
                                 {priceFormat(totalRevenue)}
                              </div>
                           </Col>
                        </Row>
                     );
                  }}
               />
            </Col>
         </Row>

         <Divider />

         <Row>
            <Col span={16}>
               <Title level={5} style={{ marginBottom: 2 }}>
                  Order bar chart{' '}
                  {
                     <Tooltip
                        placement='top'
                        title='Only include success order'
                     >
                        <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
                     </Tooltip>
                  }
               </Title>
               <Paragraph>Overview Order on per day</Paragraph>
               {
                  <div className='barChartOverview'>
                     <Bar
                        data={{
                           labels: lineChart.map(({ paidAt }) => paidAt),
                           datasets: [
                              {
                                 data: lineChart.map(
                                    ({ orderInDay }) => orderInDay
                                 ),
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
               }
            </Col>
            <Col span={8} className='cardOrderCol'>
               <div className='cardOrder'>
                  <Paragraph>
                     <div className='cardOrderDescription'>
                        Order in today "{dateNow}"
                     </div>
                     <div>
                        {lineChart.find((date) => date.paidAt === dateNow) ? (
                           // eslint-disable-next-line
                           lineChart.map((item) => {
                              if (item.paidAt === dateNow) {
                                 return (
                                    <Title level={2} key={item.paidAt}>
                                       {item.orderInDay}
                                    </Title>
                                 );
                              }
                           })
                        ) : (
                           <Title level={2}>0</Title>
                        )}
                     </div>
                  </Paragraph>
               </div>
               <Table
                  fixed
                  className='cardOrderTable'
                  dataSource={lineChart}
                  columns={columnsOrder}
                  ellipsis={true}
                  pagination={false}
                  size='middle'
                  scroll={{ y: 152 }}
                  rowKey={(record) => record.paidAt}
                  footer={(record) => {
                     let totalOrder = 0;
                     record?.forEach(({ orderInDay }) => {
                        totalOrder += orderInDay;
                     });

                     return (
                        <Row>
                           <Col flex='150px' style={{ fontStyle: 'italic' }}>
                              <b>Total Order:</b>
                           </Col>
                           <Col>
                              <div className='totalFooterRow'>{totalOrder}</div>
                           </Col>
                        </Row>
                     );
                  }}
               />
            </Col>
         </Row>
      </>
   );
}

export default ManageShopOverview;
