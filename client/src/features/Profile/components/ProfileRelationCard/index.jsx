import { Col, Row, Space, Statistic, Typography } from 'antd';
import React from 'react';
import { BsCursor, BsPersonCheck, BsStar } from 'react-icons/bs';
import ProfileAddressMap from '../ProfileAddressMap';
import PropTypes from 'prop-types';
import './ProfileRelationCard.scss';

const { Title, Text } = Typography;

ProfileAddressMap.propTypes = {
   userProfile: PropTypes.object,
   userStats: PropTypes.object,
};

ProfileAddressMap.defaultProps = {
   userProfile: {},
   userStats: {},
};

function ProfileRelationCard(props) {
   const { userProfile, userStats } = props;
   return (
      <>
         <div className='relationCard'>
            <div className='address'>
               <Title level={5} className='title'>
                  Address
               </Title>
               <Space align='start'>
                  <BsCursor className='icon' />
                  <Text>{userProfile?.address}</Text>
               </Space>
            </div>
            <Row gutter={[15, 15]}>
               <Col span={12}>
                  <div className='userStats'>
                     <Statistic
                        title={
                           <Title level={5} className='title'>
                              User Rate
                           </Title>
                        }
                        value={userProfile?.rate}
                        suffix={'/ 5'}
                        prefix={<BsStar className='statsIcon' />}
                     />
                  </div>
               </Col>
               <Col span={12}>
                  <div className='userStats'>
                     <Statistic
                        title={
                           <Title level={5} className='title'>
                              Success Rate
                           </Title>
                        }
                        value={userStats?.success}
                        suffix={'%'}
                        prefix={<BsPersonCheck className='statsIcon' />}
                     />
                  </div>
               </Col>
            </Row>
            <div className='userMap'>
               <ProfileAddressMap
                  userAddress={userProfile.address}
                  userPhoto={userProfile.photoURL}
               />
            </div>
         </div>
      </>
   );
}

export default ProfileRelationCard;
