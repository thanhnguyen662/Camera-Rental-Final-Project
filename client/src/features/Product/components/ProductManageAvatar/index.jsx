import { Avatar, Col, Row, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './ProductManage.scss';

ProductManageAvatar.propTypes = {
   userAvatar: PropTypes.string,
   username: PropTypes.string,
};

ProductManageAvatar.defaultProps = {
   userAvatar: '',
   username: '',
};

const { Text } = Typography;

function ProductManageAvatar(props) {
   const { userAvatar, username, email, phoneNumber } = props;

   return (
      <div className='productManageUserInfo'>
         <Row>
            <Row justify='space-around' align='middle'>
               <Col flex='auto' className='productManageUserAvatar'>
                  <Avatar src={userAvatar} size={42} />
               </Col>
               <Col className='productManageUserProfile'>
                  <Text className='productUsername'>{username}</Text> |{' '}
                  <Text className='productUserEmail'> {phoneNumber}</Text>
                  <Typography style={{ fontSize: 12 }}>{email}</Typography>
               </Col>
            </Row>
         </Row>
      </div>
   );
}

export default ProductManageAvatar;
