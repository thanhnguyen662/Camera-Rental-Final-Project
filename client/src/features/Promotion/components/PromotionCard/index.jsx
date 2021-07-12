import React from 'react';
// import PropTypes from 'prop-types';
import './PromotionCard.scss';
import {
   RiCamera2Line,
   RiMapPin5Line,
   RiNotification2Line,
   RiRepeat2Fill,
} from 'react-icons/ri';
import { Button, Col, Row } from 'antd';

PromotionCard.propTypes = {};

function PromotionCard(props) {
   return (
      <>
         <h1 style={{ marginTop: '70px' }}>Active Promotions</h1>
         <div className='promotion'>
            <Row gutter={[30, 30]}>
               <Col span={6}>
                  <div className='promotionCard'>
                     <Row span={24}>
                        <img
                           src='https://www.jga-group.com/wp-content/uploads/2020/08/william-bayreuther-hfk6xOjQlFk-unsplash-1-scaled-e1597143706355.jpg'
                           alt='photos'
                        />
                     </Row>
                     <Row justify='center' className='promotionTextBottom'>
                        <RiNotification2Line className='icon' />
                        <h1>
                           Lorem nostrud quis excepteur aute officia ullamco.
                        </h1>
                        <Button className='buttonCard'>Shop Now</Button>
                     </Row>
                  </div>
               </Col>
               <Col span={6}>
                  <div className='promotionCard1'>
                     <Row
                        justify='center'
                        className='promotionTextTop'
                        span={24}
                     >
                        <RiMapPin5Line className='icon' />
                        <h1>
                           Esse do adipisicing elit ad nulla nisi voluptate ad
                           nulla.
                        </h1>
                        <Button className='buttonCard'>Shop Now</Button>
                     </Row>
                     <Row span={24}>
                        <img
                           src='https://images.unsplash.com/photo-1556642389-0cd5fd882f5a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBob3RvZ3JhcGhlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
                           alt='photos'
                        />
                     </Row>
                  </div>
               </Col>
               <Col span={6}>
                  <div className='promotionCard2'>
                     <Row span={24}>
                        <img
                           src='https://images.unsplash.com/photo-1602525659170-997b350dd1c7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHBob3RvZ3JhcGhlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
                           alt='photos'
                        />
                     </Row>
                     <Row justify='center' className='promotionTextBottom'>
                        <RiCamera2Line className='icon' />
                        <h1>
                           Lorem nostrud quis excepteur aute officia ullamco.
                        </h1>
                        <Button className='buttonCard'>Shop Now</Button>
                     </Row>
                  </div>
               </Col>
               <Col span={6}>
                  <div className='promotionCard3'>
                     <Row
                        justify='center'
                        className='promotionTextTop'
                        span={24}
                     >
                        <RiRepeat2Fill className='icon' />
                        <h1>
                           Esse do adipisicing elit ad nulla nisi voluptate ad
                           nulla.
                        </h1>
                        <Button className='buttonCard'>Shop Now</Button>
                     </Row>
                     <Row span={24}>
                        <img
                           src='https://t2conline.com/wp-content/uploads/2019/09/Photography.jpg'
                           alt='photos'
                        />
                     </Row>
                  </div>
               </Col>
            </Row>
         </div>
      </>
   );
}

export default PromotionCard;
