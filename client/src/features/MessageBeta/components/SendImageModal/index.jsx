import { Modal, Space, Upload, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../../../firebase';
import './SendImageModal.scss';

SendImageModal.propTypes = {
   isModalVisible: PropTypes.bool,
   handleIsModalVisible: PropTypes.func,
   onSendMessage: PropTypes.func,
   conversationId: PropTypes.string,
};

SendImageModal.defaultProps = {
   isModalVisible: false,
   handleIsModalVisible: null,
   onSendMessage: null,
   conversationId: '',
};

function SendImageModal(props) {
   const {
      isModalVisible,
      handleIsModalVisible,
      conversationId,
      onSendMessage,
   } = props;
   const [url, setUrl] = useState('');
   const [fileList, setFileList] = useState([]);

   const modalFooterButton = () => {
      return (
         <Space>
            <Button onClick={() => handleIsModalVisible()} key='cancel'>
               Cancel
            </Button>
            <Button
               type='primary'
               key='upload'
               {...disableButton}
               onClick={() => {
                  onSendMessage(url);
                  setFileList([]);
                  handleIsModalVisible();
               }}
            >
               Upload
            </Button>
         </Space>
      );
   };

   const disableButton = fileList.length === 0 && {
      disabled: true,
   };

   const uploadImage = async (options) => {
      const { onSuccess, onError, file, onProgress } = options;
      const uniqueName = uuidv4();
      const uploadTask = storage
         .ref(
            `messages/${conversationId}/messageImage/${uniqueName}.${
               file.type.split('/')[1]
            }`
         )
         .put(file);
      uploadTask.on(
         'state_changed',
         (snapshot) => {
            onProgress({
               percent: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            });
         },
         (error) => {
            console.log(error);
         },
         () => {
            storage
               .ref(`messages/${conversationId}/messageImage`)
               .child(`${uniqueName}.${file.type.split('/')[1]}`)
               .getDownloadURL()
               .then((url) => {
                  setUrl(url);
                  onSuccess();
               })
               .catch((error) => {
                  console.log(error);
                  onError();
               });
         }
      );
   };

   return (
      <>
         <div>
            <Modal
               title='Send Image'
               className='sendImageModal'
               visible={isModalVisible}
               onCancel={handleIsModalVisible}
               width={400}
               footer={modalFooterButton()}
            >
               <Upload
                  accept='image/*'
                  customRequest={uploadImage}
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  listType='picture-card'
                  className='image-upload-grid'
                  onPreview={() => window.open(url)}
               >
                  {fileList.length >= 1 ? null : (
                     <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                     </div>
                  )}
               </Upload>
               <p>Click plus to send a picture</p>
            </Modal>
         </div>
      </>
   );
}

export default SendImageModal;
