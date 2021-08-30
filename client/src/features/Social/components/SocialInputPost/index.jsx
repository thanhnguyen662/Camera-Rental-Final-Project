import { LinkOutlined } from '@ant-design/icons';
import { Button, Input, Space, Typography, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import Modal from 'antd/lib/modal/Modal';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './SocialInputPost.scss';

SocialInputPost.propTypes = {
   userName: PropTypes.string,
   photoURL: PropTypes.string,
   name: PropTypes.string,
};

SocialInputPost.defaultProps = {
   userName: '',
   photoURL: '',
   name: '',
};

const { Text } = Typography;
const { TextArea } = Input;

function SocialInputPost(props) {
   const { userName, photoURL, name } = props;

   const [isModalVisible, setIsModalVisible] = useState(false);

   return (
      <>
         <div className='socialInputPost'>
            <Input
               onClick={() => setIsModalVisible(true)}
               placeholder={`What is new, ${userName}`}
               className='socialInput'
               prefix={
                  <Avatar
                     src={photoURL}
                     className='socialInputAvatar'
                     size={40}
                  />
               }
               suffix={
                  <Button
                     className='socialInputButton'
                     type='primary'
                     icon={<LinkOutlined />}
                  >
                     Post It!
                  </Button>
               }
            />
         </div>
         <Modal
            title={<Text className='modalTitle'>Create Post</Text>}
            footer={false}
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            className='modalCreatePost'
            width={400}
         >
            <div className='socialPostContainer'>
               <div>
                  <Space size={15}>
                     <Avatar src={photoURL} size={40} />
                     <div className='socialPostUser'>
                        <Space direction='vertical' size={0}>
                           <Text className='name'>{name}</Text>
                           <Text className='username'>{userName}</Text>
                        </Space>
                     </div>
                  </Space>
               </div>
               <div>
                  <TextArea
                     autoSize={{ minRows: 5, maxRows: 7 }}
                     placeholder={`What is new, ${userName}`}
                     bordered={false}
                  />
               </div>
               <div className='socialUploadPost'>
                  <Upload
                     accept='image/*'
                     // customRequest={uploadImage}
                     // onChange={handleOnChange}
                     listType='picture-card'
                     // defaultFileList={defaultFileList}
                     className='image-upload-grid'
                  >
                     {/* {defaultFileList.length >= 1 ? null : ( */}
                     <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                     </div>
                     {/* )} */}
                  </Upload>
               </div>
            </div>
         </Modal>
      </>
   );
}

export default SocialInputPost;
