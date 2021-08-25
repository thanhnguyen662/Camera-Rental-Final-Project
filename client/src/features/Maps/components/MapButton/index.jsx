import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Tooltip } from 'antd';
import React from 'react';

MapButton.propTypes = {};

function MapButton(props) {
   const {
      searchStatusNotification,
      location,
      setIsModalVisible,
      // setSelectedMarker,
      // handleOnClickShowAllPopup,
   } = props;

   return (
      <>
         <Row span={24} justify='start' align='middle'>
            <Space>
               <Col>
                  <Tooltip title='Search'>
                     <Button
                        className='searchButton'
                        type='primary'
                        shape='circle'
                        icon={<SearchOutlined />}
                        onClick={() => setIsModalVisible(true)}
                     />
                  </Tooltip>
               </Col>
               <Col className='searchStatusRow' flex='auto'>
                  {location.state?.productDetail.name &&
                     !searchStatusNotification && (
                        <div className='searchStatusNotification'>
                           We will show all {location.state?.productDetail.name}{' '}
                           near you
                        </div>
                     )}
                  {searchStatusNotification.productName && (
                     <div className='searchStatusNotification'>
                        This is result of{' '}
                        <b>"{searchStatusNotification.productName}"</b>
                        <i style={{ fontSize: '13px' }}>
                           {searchStatusNotification.address &&
                              ` at ${searchStatusNotification.address}`}
                           {searchStatusNotification.ward &&
                              `, ${searchStatusNotification.ward}`}
                           {searchStatusNotification.district &&
                              `, ${searchStatusNotification.district}`}
                           {searchStatusNotification.city &&
                              `, ${searchStatusNotification.city}`}
                        </i>
                     </div>
                  )}
                  {!searchStatusNotification.productName &&
                     !searchStatusNotification.address &&
                     !location.state?.productDetail.name && (
                        <div className='searchStatusNotification'>
                           We will show all product in map
                        </div>
                     )}
                  {!searchStatusNotification.productName &&
                     searchStatusNotification.address && (
                        <div className='searchStatusNotification'>
                           This is product in area
                        </div>
                     )}
               </Col>
            </Space>
         </Row>
         {/* <div className='supportDisplayButton'>
            <Space>
               <Button
                  size='large'
                  type='primary'
                  icon={<EyeOutlined />}
                  onClick={handleOnClickShowAllPopup}
                  style={{
                     boxShadow: ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                  }}
               />
               <Button
                  size='large'
                  type='primary'
                  danger
                  className='showAllPopupButton'
                  icon={<DeleteOutlined />}
                  onClick={() => setSelectedMarker([])}
                  style={{
                     boxShadow: ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                  }}
               />
            </Space>
         </div> */}
      </>
   );
}

export default MapButton;
