import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Divider, Row, Col, Table, Space } from 'antd';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import './ManageShopOverview.scss';
import priceFormat from '../../../../utils/PriceFormat';

ManageShopOverview.propTypes = {
   allMyProductInOrder: PropTypes.array,
};

ManageShopOverview.defaultProps = {
   allMyProductInOrder: [],
};

const { Grid } = Card;
const { Title, Paragraph } = Typography;

function ManageShopOverview(props) {
   const { allMyProductInOrder, setCurrent } = props;

   const [pending, setPending] = useState(0);
   const [accept, setAccept] = useState(0);
   const [delivery, setDelivery] = useState(0);
   const [success, setSuccess] = useState(0);
   const [failure, setFailure] = useState(0);
   const [lineChart, setLineChart] = useState([]);
   const [dateNow, setDateNow] = useState('');

   useEffect(() => {
      setDateNow(new Date().toISOString().slice(0, 10));
   }, []);

   const sumArray = (array) => {
      if (array.length === 0) return;
      const reducer = (accumulator, curr) => accumulator + curr;
      return array.reduce(reducer);
   };

   useEffect(() => {
      if (allMyProductInOrder.length === 0) return;
      let uniqueDate = [];
      let totalMoneyInDay = [];

      setAccept(0);
      setPending(0);
      setDelivery(0);
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
            case 'DELIVERY':
               setDelivery((prev) => prev + 1);
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

      allMyProductInOrder.map((o) => {
         return uniqueDate.push(moment(o.updatedAt).format('YYYY-MM-DD'));
      });
      uniqueDate = [...new Set(uniqueDate)];
      uniqueDate.sort((a, b) => {
         return new Date(a) - new Date(b);
      });
      console.log('uniqueDate', uniqueDate);
      // eslint-disable-next-line
      setLineChart([]);
      uniqueDate.map((date) => {
         // eslint-disable-next-line
         allMyProductInOrder.map((o) => {
            if (
               moment(o.updatedAt).format('YYYY-MM-DD') === date &&
               o.orderStatus.name !== 'PENDING' &&
               o.orderStatus.name !== 'FAILURE'
            ) {
               return totalMoneyInDay.push(o.totalPrice);
            }
         });
         const newData = {
            updatedAt: date,
            moneyInDay: sumArray(totalMoneyInDay),
         };

         if (newData.moneyInDay === undefined) return;
         setLineChart((prev) => [...prev, newData]);
         totalMoneyInDay = [];
      });
   }, [allMyProductInOrder]);

   console.log(allMyProductInOrder);
   console.log('lineChart', lineChart);

   const columns = [
      {
         title: 'Date',
         dataIndex: ['updatedAt'],
      },
      {
         title: 'Revenue',
         dataIndex: ['moneyInDay'],
         render: (record) => <div>{priceFormat(record)}</div>,
      },
   ];

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
                  onClick={() => setCurrent('DELIVERY')}
               >
                  <div className='tableGridLabel'>Delivery Order</div>
                  <div>{delivery}</div>
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
         <Row>
            <Col span={16}>
               <div className='revenueChartOverview'>
                  <Title level={5} style={{ marginBottom: 2 }}>
                     Revenue chart
                  </Title>
                  <Paragraph>Overview Revenue on per day</Paragraph>
                  {allMyProductInOrder.length !== 0 && (
                     <Line
                        data={{
                           labels: lineChart.map(({ updatedAt }) => updatedAt),
                           datasets: [
                              {
                                 data: lineChart.map(
                                    ({ moneyInDay }) => moneyInDay
                                 ),
                                 label: 'Revenue',
                                 borderColor: '#3333ff',
                                 backgroundColor: '#CAA6DB',
                                 tension: 0.1,
                              },
                           ],
                        }}
                        options={{
                           title: {
                              display: true,
                              text: 'World population per region (in millions)',
                           },
                           legend: {
                              display: true,
                              position: 'bottom',
                           },
                        }}
                     />
                  )}
               </div>
            </Col>
            <Col span={8} className='cardRevenueCol'>
               <div className='cardRevenue'>
                  <Paragraph>
                     <div className='cardRevenueDescription'>
                        Revenue at today "{dateNow}"
                     </div>
                     <div>
                        {lineChart.map((item) => {
                           if (item.updatedAt === dateNow) {
                              return (
                                 <Title level={2}>
                                    {priceFormat(item.moneyInDay)}
                                 </Title>
                              );
                           }
                        })}
                     </div>
                  </Paragraph>
               </div>
               <Table
                  fixed
                  className='cardRevenueTable'
                  dataSource={lineChart}
                  columns={columns}
                  ellipsis={true}
                  pagination={false}
                  footer={false}
                  size='middle'
                  scroll={{ y: 190 }}
               />
            </Col>
         </Row>
         <Divider />
      </>
   );
}

export default ManageShopOverview;
