import { LinkOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Tag, Typography, Upload } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Modal from 'antd/lib/modal/Modal';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './SocialInputPost.scss';

SocialInputPost.propTypes = {
   userName: PropTypes.string,
   photoURL: PropTypes.string,
   name: PropTypes.string,
   uploadImage: PropTypes.func,
   imageList: PropTypes.array,
   handleOnRemove: PropTypes.func,
   userId: PropTypes.string,
   myProduct: PropTypes.array,
   handleOnClickSubmit: PropTypes.func,
};

SocialInputPost.defaultProps = {
   userName: '',
   photoURL: '',
   name: '',
   uploadImage: null,
   imageList: [],
   handleOnRemove: null,
   userId: '',
   myProduct: [],
   handleOnClickSubmit: null,
};

const { Text } = Typography;
const { TextArea } = Input;

function SocialInputPost(props) {
   const {
      userName,
      photoURL,
      name,
      uploadImage,
      imageList,
      handleOnRemove,
      userId,
      myProduct,
      handleOnClickSubmit,
   } = props;

   const [isModalVisible, setIsModalVisible] = useState(false);
   const [input, setInput] = useState('');
   const [selectProduct, setSelectProduct] = useState([]);

   const destructuring = (imageList) => {
      return imageList.reduce((array, item) => {
         array.push(item.url);
         return array;
      }, []);
   };

   const onClickSubmit = async () => {
      const formData = {
         caption: input,
         images: destructuring(imageList),
         userId: userId,
         products: selectProduct,
      };
      handleOnClickSubmit(formData);
      setIsModalVisible(false);
   };

   const selectProductRender = (props) => {
      const { label, closable, onClose } = props;

      const onPreventMouseDown = (event) => {
         event.preventDefault();
         event.stopPropagation();
      };

      return (
         <Tag
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            className='selectedTag'
         >
            {label}
         </Tag>
      );
   };

   const disabledButton = input ? false : true;
   const disableSelect = imageList.length > 0 ? false : true;

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
               value={input}
               suffix={
                  <Button
                     className='socialInputButton'
                     type='primary'
                     icon={<LinkOutlined />}
                     onClick={() => setIsModalVisible(true)}
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
            width={420}
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
                     placeholder={`What is new?...`}
                     bordered={false}
                     onChange={(e) => setInput(e.target.value)}
                  />
               </div>
               <div className='socialUploadPost'>
                  <Upload
                     className='image-upload-grid'
                     listType='picture-card'
                     accept='image/*'
                     customRequest={uploadImage}
                     fileList={imageList}
                     onRemove={handleOnRemove}
                  >
                     {imageList?.length >= 6 ? null : (
                        <div>
                           <PlusOutlined />
                           <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                     )}
                  </Upload>
               </div>
               <div>
                  <Select
                     className='socialSelectProduct'
                     mode='multiple'
                     showArrow
                     tagRender={selectProductRender}
                     options={myProduct}
                     onChange={(value) => setSelectProduct(value)}
                     placeholder='Select your product'
                     allowClear={true}
                     disabled={disableSelect}
                     maxTagCount={10}
                     optionFilterProp='label'
                  />
               </div>
               <Button
                  type='primary'
                  className='socialSubmitButton'
                  icon={<LinkOutlined />}
                  disabled={disabledButton}
                  onClick={onClickSubmit}
               >
                  Post It!
               </Button>
            </div>
         </Modal>
      </>
   );
}

export default SocialInputPost;
