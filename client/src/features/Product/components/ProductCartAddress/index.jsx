import { EditOutlined } from '@ant-design/icons';
import { Avatar, Col, Divider, Row, Skeleton, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCartAddress.scss';

ProductCartAddress.propTypes = {
   email: PropTypes.string,
   userAddress: PropTypes.string,
   userPhotoURL: PropTypes.string,
   name: PropTypes.string,
   phoneNumber: PropTypes.string,
};

ProductCartAddress.defaultProps = {
   email: '',
   userAddress: '',
   userPhotoURL: '',
   name: '',
   phoneNumber: '',
};

const { Title, Paragraph, Text } = Typography;

function ProductCartAddress(props) {
   const { userAddress, userPhotoURL, name, email, phoneNumber } = props;
   return (
      <>
         <div className='productCartAddress'>
            <div className='productCartAddressHeader'>
               <Row>
                  <Col flex='auto'>
                     <Title level={5} style={{ marginBottom: 2 }}>
                        Address
                     </Title>
                     <Paragraph className='subHeader'>
                        You must provide address
                     </Paragraph>
                  </Col>
                  <Col>
                     <Link to='/profile/edit'>
                        <EditOutlined />
                     </Link>
                  </Col>
               </Row>
            </div>
            <Divider style={{ margin: '-2px 0px 10px 0px' }} />
            {!userPhotoURL ? (
               <Skeleton paragraph={{ rows: 1 }} />
            ) : (
               <div className='cartUserInfo'>
                  <Row justify='space-around' align='middle'>
                     <Col span={5} className='cartUserAvatar'>
                        <Avatar src={userPhotoURL} size={45} />
                     </Col>
                     <Col span={19} className='cartUserInfo'>
                        <Typography>
                           <Text className='cartUsername'>{name}</Text> |{' '}
                           <Text className='cartUserPhone'>{phoneNumber}</Text>
                        </Typography>
                        <Text className='cartUserEmail'>{email}</Text>
                     </Col>
                  </Row>
                  <Typography className='cartUserAddress'>
                     {userAddress}
                  </Typography>
               </div>
            )}
         </div>
      </>
   );
}

export default ProductCartAddress;
