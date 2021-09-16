import { Col, Row, Space, Statistic, Typography } from 'antd';
import { BsCursor, BsStar, BsPersonCheck } from 'react-icons/bs';
import React from 'react';
import './ProfileRelationCard.scss';
import ProfileAddressMap from '../ProfileAddressMap';

const { Title, Text } = Typography;

function ProfileRelationCard(props) {
   return (
      <>
         <div className='relationCard'>
            <div className='address'>
               <Title level={5} className='title'>
                  Address
               </Title>
               <Space align='start'>
                  <BsCursor className='icon' />
                  <Text>
                     52 Thanh Thuy, Thanh Binh, Hai Chau, Thanh Pho Da Nang.
                  </Text>
               </Space>
            </div>
            <Row gutter={[15, 15]}>
               <Col span={10}>
                  <div className='userStats'>
                     <Statistic
                        title={
                           <Title level={5} className='title'>
                              User Rate
                           </Title>
                        }
                        value={4}
                        suffix={'/ 5'}
                        prefix={<BsStar className='statsIcon' />}
                     />
                  </div>
               </Col>
               <Col span={14}>
                  <div className='userStats'>
                     <Statistic
                        title={
                           <Title level={5} className='title'>
                              Success Rate
                           </Title>
                        }
                        value={100}
                        suffix={'%'}
                        prefix={<BsPersonCheck className='statsIcon' />}
                     />
                  </div>
               </Col>
            </Row>
            <div className='userMap'>
               <ProfileAddressMap />
            </div>
         </div>
      </>
   );
}

export default ProfileRelationCard;
