import {
   DownOutlined,
   HomeOutlined,
   LikeOutlined,
   PhoneOutlined,
   UpOutlined,
   UserOutlined,
} from '@ant-design/icons';
import {
   Avatar,
   Col,
   Comment,
   Image,
   Input,
   Modal,
   Rate,
   Row,
   Spin,
   Table,
   Typography,
   Tooltip,
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './ManageShopModalUser.scss';

ManageShopModalUser.propTypes = {
   setIsModalUserVisible: PropTypes.func,
   handleOnSubmitComment: PropTypes.func,
};

ManageShopModalUser.defaultProps = {
   setIsModalUserVisible: null,
   handleOnSubmitComment: null,
};

const { Paragraph, Text, Title } = Typography;

function ManageShopModalUser(props) {
   const {
      isModalUserVisible,
      userDetailFirebase,
      orderDetail,
      userStats,
      onClickExplain,
      userComment,
      handleArrowOnClick,
      photoURL,
      handleOnSubmitComment,
      handleOnClickCloseUserModal,
   } = props;

   const [inputComment, setInputComment] = useState({});

   const columnsComment = [
      {
         width: 10,
         render: (record) => (
            <Image width={30} src={record?.authorPhotoURL} preview={false} />
         ),
      },
      {
         render: (record) => (
            <>
               <Row>
                  <Col flex='auto'>
                     <Text className='commentTableUsername'>
                        {record?.authorUsername}
                     </Text>{' '}
                     <Text className='commentTableTimeAgo'>
                        ({moment(record?.createdAt).fromNow()})
                     </Text>
                  </Col>
                  <Col>
                     <Rate
                        style={{
                           fontSize: '14px',
                        }}
                        value={record?.rate}
                        allowClear={false}
                     />
                  </Col>
               </Row>
               <div>{record?.content}</div>
            </>
         ),
      },
   ];

   return (
      <>
         <Modal
            visible={isModalUserVisible}
            onCancel={() => handleOnClickCloseUserModal()}
            className='modalUserDetails'
            width={420}
            footer={false}
         >
            {!userDetailFirebase?.displayName ? (
               <Spin />
            ) : (
               <>
                  <div className='modalInfo'>
                     <Row justify='space-around' align='middle'>
                        <Col>
                           <Avatar src={orderDetail?.User.photoURL} size={65} />
                        </Col>
                        <Col flex='auto' push='1'>
                           <Title level={3} className='modalUsername'>
                              {orderDetail?.User.username}
                           </Title>
                           <Text className='modalEmail'>
                              {userDetailFirebase?.email}
                           </Text>
                        </Col>
                     </Row>
                  </div>
                  <div className='modalMoreInfo'>
                     <Paragraph>
                        <LikeOutlined className='modalIcon' /> &nbsp;
                        <Rate
                           value={orderDetail?.User.rate}
                           className='modalMoreInfoRate'
                        />
                        <br />
                        <UserOutlined className='modalIcon' /> &nbsp;
                        <Text className='modalMoreInfoDescription'>
                           {userDetailFirebase?.displayName}
                        </Text>
                        <br />
                        <PhoneOutlined className='modalIcon' /> &nbsp;
                        <Text className='modalMoreInfoDescription'>
                           {orderDetail?.User.phoneNumber}
                        </Text>
                        <br />
                        <HomeOutlined className='modalIcon' /> &nbsp;
                        <Text className='modalMoreInfoDescription'>
                           {orderDetail?.User.address}
                        </Text>
                     </Paragraph>
                  </div>
                  <div className='modalUserStats'>
                     <Row style={{ textAlign: 'center' }}>
                        <Col span={8}>
                           <Tooltip title='Includes all user orders'>
                              <h4>Total Orders</h4>
                           </Tooltip>
                           <b>{userStats?.totalOrder}</b>
                        </Col>
                        <Col span={8}>
                           <Tooltip title='On-time order completion rate'>
                              <h4>Success Rate</h4>
                           </Tooltip>
                           <b>{userStats?.success}%</b>
                        </Col>
                        <Col span={8}>
                           <h4>Pick-up Rate</h4>
                           <b>{userStats?.come}%</b>
                        </Col>
                     </Row>
                  </div>
                  {onClickExplain ? (
                     <div className='modalArrowButton'>
                        <DownOutlined onClick={handleArrowOnClick} />
                     </div>
                  ) : (
                     <div className='modalArrowButton'>
                        <UpOutlined onClick={handleArrowOnClick} />
                     </div>
                  )}
                  {onClickExplain && orderDetail?.orderStatus.name && (
                     <>
                        {orderDetail.orderStatus.name !== 'FAILURE' &&
                        orderDetail.orderStatus.name !== 'BACK' ? null : (
                           <>
                              <Comment
                                 className='modalAreaComment'
                                 avatar={
                                    <Avatar src={photoURL} alt='Han Solo' />
                                 }
                                 content={
                                    <>
                                       <Input
                                          className='textInputComment'
                                          placeholder='Comment here...'
                                          allowClear
                                          onPressEnter={(values) => {
                                             if (
                                                Object.keys(inputComment)
                                                   .length === 0
                                             )
                                                return;
                                             handleOnSubmitComment({
                                                ...inputComment,
                                                content: values.target.value,
                                                userId: orderDetail?.userId,
                                             });
                                          }}
                                       />
                                       <Rate
                                          onChange={(values) =>
                                             setInputComment({
                                                rate: values,
                                             })
                                          }
                                       />
                                    </>
                                 }
                              />
                           </>
                        )}

                        <Table
                           className='modalCommentTable'
                           rowKey={(record) => record.id}
                           dataSource={userComment}
                           columns={columnsComment}
                           pagination={{ pageSize: 2, size: 'small' }}
                        />
                     </>
                  )}
               </>
            )}
         </Modal>
      </>
   );
}

export default ManageShopModalUser;
