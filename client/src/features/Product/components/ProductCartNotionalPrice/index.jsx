import { Col, Divider, Row, Typography, Empty, Button } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import priceFormat from '../../../../utils/PriceFormat';
import './ProductCartPrePrice.scss';

ProductCartNotionalPrice.propTypes = {
   selectRows: PropTypes.array,
   handleClickOrderButton: PropTypes.func,
};

ProductCartNotionalPrice.defaultProps = {
   selectRows: [],
   handleClickOrderButton: null,
};

const { Paragraph } = Typography;

function ProductCartNotionalPrice(props) {
   let data = [];

   const { selectRows, handleClickOrderButton } = props;

   const sumArray = () => {
      if (data.length === 0) return;
      const reducer = (accumulator, curr) => accumulator + curr;
      const totalPrice = data.reduce(reducer);

      return totalPrice;
   };

   const onClickOrderButton = () => {
      handleClickOrderButton();
   };

   return (
      <>
         <div className='cartProductNotionalPrice'>
            <div>
               <Row className='headerText'>
                  <Col span={12}>
                     <h4>Name</h4>
                  </Col>
                  <Col span={6} style={{ textAlign: 'center' }}>
                     <h4>Hours</h4>
                  </Col>
                  <Col span={6} style={{ textAlign: 'right' }}>
                     <h4>Total</h4>
                  </Col>
               </Row>
               <Divider />
               {selectRows?.length > 0 ? (
                  selectRows.map((row) => {
                     const startDate = moment(row.startDate);
                     const endDate = moment(row.endDate);
                     const duringHoursPerRow = endDate.diff(startDate, 'hours');
                     const pricePerRow =
                        parseInt(row.Product.price) *
                        parseInt(duringHoursPerRow);
                     const productName = row.Product.name;
                     data.push(parseInt(pricePerRow));

                     return (
                        <div
                           key={row ? row.id : 123}
                           className='productNotionalPrice'
                        >
                           <Row>
                              <Col span={12}>
                                 <Paragraph>{productName}</Paragraph>
                              </Col>
                              <Col span={6} style={{ textAlign: 'center' }}>
                                 <Paragraph level={5}>
                                    {duringHoursPerRow}
                                 </Paragraph>
                              </Col>
                              <Col span={6}>
                                 <Paragraph
                                    level={5}
                                    style={{ textAlign: 'right' }}
                                 >
                                    {priceFormat(pricePerRow)}
                                 </Paragraph>
                              </Col>
                           </Row>
                        </div>
                     );
                  })
               ) : (
                  <Empty
                     description='Please select product'
                     style={{ color: '#AEB8C2', fontWeight: 400 }}
                     imageStyle={{ height: 70 }}
                  />
               )}
               <Divider />
               <Row className='totalPrice'>
                  <Col flex='auto'>
                     <div className='totalPriceTitle'>Total Price</div>
                  </Col>
                  <Col>
                     <div className='totalPriceCal'>
                        {priceFormat(sumArray())}
                     </div>
                  </Col>
               </Row>
            </div>
         </div>
         {selectRows?.length > 0 && (
            <Button
               type='danger'
               className='orderButton'
               onClick={onClickOrderButton}
            >
               Order now
            </Button>
         )}
      </>
   );
}

export default ProductCartNotionalPrice;
