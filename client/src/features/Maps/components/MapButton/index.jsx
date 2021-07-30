import { DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Tooltip } from 'antd';
import React from 'react';

MapButton.propTypes = {};

function MapButton(props) {
   const {
      searchStatusNotification,
      location,
      setIsModalVisible,
      setSelectedMarker,
      handleOnClickShowAllPopup,
   } = props;
   console.log(location.state?.productDetail.name);
   return (
      <>
         <Row span={24} align='middle'>
            <Col span={1} offset={1}>
               <Tooltip title='search'>
                  <Button
                     className='searchButton'
                     type='primary'
                     shape='circle'
                     icon={<SearchOutlined />}
                     onClick={() => setIsModalVisible(true)}
                  />
               </Tooltip>
            </Col>
            <Col flex='auto' className='searchStatusRow'>
               {location.state?.productDetail.name &&
                  !searchStatusNotification && (
                     <div className='searchStatusNotification'>
                        We will show all {location.state?.productDetail.name}{' '}
                        near you
                     </div>
                  )}
               {searchStatusNotification &&
                  searchStatusNotification.productName && (
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
            <Col span={4} offset={11}>
               <Space>
                  <Button
                     size='large'
                     type='primary'
                     icon={<EyeOutlined />}
                     onClick={handleOnClickShowAllPopup}
                  />
                  <Button
                     size='large'
                     type='primary'
                     danger
                     className='showAllPopupButton'
                     icon={<DeleteOutlined />}
                     onClick={() => setSelectedMarker([])}
                  />
               </Space>
            </Col>
         </Row>
      </>
   );
}

export default MapButton;
