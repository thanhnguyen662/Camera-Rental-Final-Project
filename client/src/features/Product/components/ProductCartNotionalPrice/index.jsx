import { Col, Divider, Row, Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import './ProductCartPrePrice.scss';

ProductCartNotionalPrice.propTypes = {
   selectRows: PropTypes.array,
};

ProductCartNotionalPrice.defaultProps = {
   selectRows: [],
};

const { Paragraph } = Typography;

function ProductCartNotionalPrice(props) {
   let data = [];

   const { selectRows } = props;

   const sumArray = () => {
      if (data.length === 0) return;
      const reducer = (accumulator, curr) => accumulator + curr;
      return data.reduce(reducer);
   };

   return (
      <div className='cartProductNotionalPrice'>
         <div>
            <Row className='headerText'>
               <Col span={12}>
                  <h4>Name</h4>
               </Col>
               <Col span={6} style={{ textAlign: 'right' }}>
                  <h4>During (hours)</h4>
               </Col>
               <Col span={6} style={{ textAlign: 'right' }}>
                  <h4>Total</h4>
               </Col>
            </Row>
            <Divider />
            {selectRows?.map((row) => {
               const startDate = moment(row.startDate);
               const endDate = moment(row.endDate);
               const duringHoursPerRow = endDate.diff(startDate, 'hours');
               const pricePerRow =
                  parseInt(row.Product.price) * parseInt(duringHoursPerRow);
               const productName = row.Product.name;
               data.push(parseInt(pricePerRow));

               return (
                  <div key={row ? row.id : 123}>
                     <Row>
                        <Col span={12}>
                           <Paragraph>{productName}</Paragraph>
                        </Col>
                        <Col span={6} style={{ textAlign: 'center' }}>
                           <Paragraph level={5}>{duringHoursPerRow}</Paragraph>
                        </Col>
                        <Col span={6}>
                           <Paragraph level={5} style={{ textAlign: 'right' }}>
                              {pricePerRow}
                           </Paragraph>
                        </Col>
                     </Row>
                  </div>
               );
            })}
            <Divider />
            <Row>
               <Col flex='auto'>Total Price</Col>
               <Col>{sumArray()}</Col>
            </Row>
         </div>
      </div>
   );
}

export default ProductCartNotionalPrice;
