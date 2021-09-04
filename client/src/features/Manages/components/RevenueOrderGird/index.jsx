import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Space, Typography } from 'antd';
import { useHistory } from 'react-router';

RevenueOrderGrid.propTypes = {
   countMyOrder: PropTypes.array,
};

RevenueOrderGrid.defaultProps = {
   countMyOrder: [],
};

const { Text, Title, Paragraph } = Typography;

function RevenueOrderGrid(props) {
   const { countMyOrder } = props;

   const history = useHistory();

   const [pending, setPending] = useState(0);
   const [accept, setAccept] = useState(0);
   const [rented, setRented] = useState(0);
   const [back, setBack] = useState(0);
   const [failure, setFailure] = useState(0);

   useEffect(() => {
      countMyOrder?.map((order) => {
         if (order.orderStatusId === 1) return setPending(order._count._all);
         if (order.orderStatusId === 5) return setAccept(order._count._all);
         if (order.orderStatusId === 3) return setRented(order._count._all);
         if (order.orderStatusId === 6) return setBack(order._count._all);
         if (order.orderStatusId === 4) return setFailure(order._count._all);

         return countMyOrder;
      });
   }, [countMyOrder]);

   const gridStyle = {
      textAlign: 'center',
      height: '30%',
   };

   const titleStyle = {
      fontWeight: 'bold',
      fontSize: '16px',
   };

   return (
      <>
         <div>
            <Paragraph>
               <Title level={5} style={{ marginBottom: 2 }}>
                  Order
               </Title>
               <Text>Overview status of your order</Text>
            </Paragraph>
            <Card>
               <Card.Grid style={gridStyle}>
                  <Space direction='vertical' size={3}>
                     <Text style={titleStyle}>All</Text>
                     <Text>{pending + accept + rented + back + failure}</Text>
                  </Space>
               </Card.Grid>
               <Card.Grid
                  style={gridStyle}
                  onClick={() => history.push('/manages/shop/pending')}
               >
                  <Space direction='vertical' size={3}>
                     <Text style={titleStyle}>Pending</Text>
                     <Text>{pending}</Text>
                  </Space>
               </Card.Grid>
               <Card.Grid style={gridStyle}>
                  <Space direction='vertical' size={3}>
                     <Text style={titleStyle}>Accept</Text>
                     <Text>{accept}</Text>
                  </Space>
               </Card.Grid>
               <Card.Grid style={gridStyle}>
                  <Space direction='vertical' size={3}>
                     <Text style={titleStyle}>Rented</Text>
                     <Text>{rented}</Text>
                  </Space>
               </Card.Grid>
               <Card.Grid style={gridStyle}>
                  <Space direction='vertical' size={3}>
                     <Text style={titleStyle}>Back</Text>
                     <Text>{back}</Text>
                  </Space>
               </Card.Grid>
               <Card.Grid style={gridStyle}>
                  <Space direction='vertical' size={3}>
                     <Text style={titleStyle}>Failure</Text>
                     <Text>{failure}</Text>
                  </Space>
               </Card.Grid>
            </Card>
         </div>
      </>
   );
}

export default RevenueOrderGrid;
