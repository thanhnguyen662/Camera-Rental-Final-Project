// import { PlusOutlined } from '@ant-design/icons';
// import { Modal, Upload, Button } from 'antd';
// import PropTypes from 'prop-types';
// import React, { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import { storage } from '../../../../firebase';
// import './ImageModal.scss';

// ImageModal.propTypes = {
//    isModalVisible: PropTypes.bool,
//    handleModalVisible: PropTypes.func,
//    handleOnSendMessage: PropTypes.func,
//    setMessageInputValue: PropTypes.func,
// };

// ImageModal.defaultProps = {
//    isModalVisible: false,
//    handleModalVisible: null,
//    handleOnSendMessage: null,
//    setMessageInputValue: null,
// };

// function ImageModal(props) {
//    const {
//       isModalVisible,
//       handleModalVisible,
//       selectedConversation,
//       handleOnSendMessage,
//    } = props;

//    const [url, setUrl] = useState('');
//    const [defaultFileList, setDefaultFileList] = useState([]);

//    const uploadImage = async (options) => {
//       const { onSuccess, onError, file, onProgress } = options;
//       const uniqueName = uuidv4();
//       const uploadTask = storage
//          .ref(
//             `messages/${selectedConversation.id}/messageImage/${uniqueName}.${
//                file.type.split('/')[1]
//             }`
//          )
//          .put(file);
//       uploadTask.on(
//          'state_changed',
//          (snapshot) => {
//             onProgress({
//                percent: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
//             });
//          },
//          (error) => {
//             console.log(error);
//          },
//          () => {
//             storage
//                .ref(`messages/${selectedConversation.id}/messageImage`)
//                .child(`${uniqueName}.${file.type.split('/')[1]}`)
//                .getDownloadURL()
//                .then((url) => {
//                   console.log(url);
//                   setUrl(url);
//                   onSuccess();
//                })
//                .catch((error) => {
//                   console.log(error);
//                   onError();
//                });
//          }
//       );
//    };

//    const handleOnChange = ({ fileList }) => {
//       setDefaultFileList(fileList);
//    };

//    const disableButton = defaultFileList.length === 0 && {
//       disabled: true,
//    };

//    return (
//       <>
//          <Modal
//             title='Send Image'
//             className='modalSendImage'
//             visible={isModalVisible}
//             onCancel={handleModalVisible}
//             width={400}
//             footer={[
//                <Button onClick={() => handleModalVisible()} key='cancel'>
//                   Cancel
//                </Button>,
//                <Button
//                   {...disableButton}
//                   type='primary'
//                   onClick={() => {
//                      handleOnSendMessage(url);
//                      setDefaultFileList((prev) => (prev.length = 0));
//                      handleModalVisible();
//                   }}
//                   key='upload'
//                >
//                   Upload
//                </Button>,
//             ]}
//          >
//             <Upload
//                accept='image/*'
//                customRequest={uploadImage}
//                onChange={handleOnChange}
//                listType='picture-card'
//                defaultFileList={defaultFileList}
//                className='image-upload-grid'
//             >
//                {defaultFileList.length >= 1 ? null : (
//                   <div>
//                      <PlusOutlined />
//                      <div style={{ marginTop: 8 }}>Upload</div>
//                   </div>
//                )}
//             </Upload>
//             <p>Click plus to send a picture</p>
//          </Modal>
//       </>
//    );
// }

// export default ImageModal;
