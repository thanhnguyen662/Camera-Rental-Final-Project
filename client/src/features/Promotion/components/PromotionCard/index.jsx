import { Avatar, Button, Col, Row, Typography } from 'antd';
import React from 'react';
// import PropTypes from 'prop-types';
import './PromotionCard.scss';

PromotionCard.propTypes = {};

const { Paragraph } = Typography;

function PromotionCard(props) {
   const { latestPost } = props;
   console.log('latestPost: ', latestPost[1]?.images[0]);

   return (
      <>
         <div className='promotion'>
            <Row gutter={[28, 30]}>
               <Col flex='none'>
                  <div className='promotionCard'>
                     <Row span={24} className='socialPostPhoto'>
                        <img src={latestPost[0]?.images[0]} alt='photos' />
                     </Row>
                     <div className='promotionTextBottom'>
                        <div className='socialPostAvatar'>
                           <Avatar
                              src={latestPost[0]?.user.photoURL}
                              size={45}
                           />
                        </div>
                        <Paragraph
                           className='socialPostCaption'
                           ellipsis={{ rows: 3 }}
                        >
                           {latestPost[0]?.caption}
                        </Paragraph>
                        <Button className='buttonCard'>Shop Now</Button>
                     </div>
                  </div>
               </Col>
               <Col flex='none'>
                  <div className='promotionCard1'>
                     <div className='promotionTextBottom'>
                        <div className='socialPostAvatar'>
                           <Avatar
                              src={latestPost[1]?.user.photoURL}
                              size={45}
                           />
                        </div>
                        <Paragraph
                           className='socialPostCaption'
                           ellipsis={{ rows: 3 }}
                        >
                           {latestPost[1]?.caption}
                        </Paragraph>
                        <Button className='buttonCard'>Shop Now</Button>
                     </div>
                     <Row span={24} className='socialPostPhoto'>
                        <img src={latestPost[1]?.images[0]} alt='photos' />
                     </Row>
                  </div>
               </Col>
               <Col flex='none'>
                  <div className='promotionCard'>
                     <Row span={24} className='socialPostPhoto'>
                        <img src={latestPost[2]?.images[0]} alt='photos' />
                     </Row>
                     <div className='promotionTextBottom'>
                        <div className='socialPostAvatar'>
                           <Avatar
                              src={latestPost[2]?.user.photoURL}
                              size={45}
                           />
                        </div>
                        <Paragraph
                           className='socialPostCaption'
                           ellipsis={{ rows: 3 }}
                        >
                           {latestPost[2]?.caption}
                        </Paragraph>
                        <Button className='buttonCard'>Shop Now</Button>
                     </div>
                  </div>
               </Col>
               <Col flex='none'>
                  <div className='promotionCard1'>
                     <div className='promotionTextBottom'>
                        <div className='socialPostAvatar'>
                           <Avatar
                              src={latestPost[3]?.user.photoURL}
                              size={45}
                           />
                        </div>
                        <Paragraph
                           className='socialPostCaption'
                           ellipsis={{ rows: 3 }}
                        >
                           {latestPost[3]?.caption}
                        </Paragraph>
                        <Button className='buttonCard'>Shop Now</Button>
                     </div>
                     <Row span={24} className='socialPostPhoto'>
                        <img src={latestPost[3]?.images[0]} alt='photos' />
                     </Row>
                  </div>
               </Col>
            </Row>
         </div>
      </>
   );
}

export default PromotionCard;
