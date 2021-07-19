import PropTypes from 'prop-types';
import {
   Upload,
   Modal,
   Progress,
   Typography,
   Divider,
   Button,
   Row,
   Col,
} from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { LeftOutlined } from '@ant-design/icons';

import './ProductUploadImage.scss';

ProductUploadImage.propTypes = {
   uploadImage: PropTypes.func,
   imageList: PropTypes.array,
   handleOnRemove: PropTypes.func,
   handleSubmit: PropTypes.func,
   currentStep: PropTypes.number,
   percent: PropTypes.number,
   prevStep: PropTypes.func,
};

ProductUploadImage.defaultProps = {
   uploadImage: null,
   imageList: [],
   handleOnRemove: null,
   handleSubmit: null,
   currentStep: 0,
   percent: 0,
   prevStep: null,
};

const { Title, Text } = Typography;

function ProductUploadImage(props) {
   const {
      uploadImage,
      imageList,
      handleOnRemove,
      handleSubmit,
      currentStep,
      percent,
      prevStep,
   } = props;
   const [previewImage, setPreviewImage] = useState('');
   const [previewVisible, setPreviewVisible] = useState(false);

   const error = () => {
      Modal.error({
         title: 'We need more photos',
         content: 'Only accept more than 4 photos',
      });
   };

   console.log('test:', imageList);
   return (
      <>
         {currentStep === 2 && (
            <>
               <div className='productUploadImage'>
                  <div className='header'>
                     <Row span={24}>
                        <Col span={23}>
                           <Title level={3}>Upload image</Title>
                           <Text>Photos of product</Text>
                        </Col>
                        <Col span={1} className='backButton2'>
                           <Button
                              shape='circle'
                              icon={<LeftOutlined />}
                              onClick={() => prevStep()}
                           />
                        </Col>
                     </Row>
                  </div>
                  <Divider className='divider' />
                  <div className='progressBar'>
                     <Progress
                        strokeColor={{
                           from: '#108ee9',
                           to: '#87d068',
                        }}
                        percent={percent}
                        status='active'
                        size='small'
                     />
                  </div>

                  <Upload
                     listType='picture-card'
                     customRequest={uploadImage}
                     fileList={imageList}
                     onRemove={handleOnRemove}
                     onPreview={(file) => {
                        setPreviewImage(file.url);
                        setPreviewVisible(true);
                     }}
                  >
                     <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                     </div>
                  </Upload>
                  <Button
                     type='primary'
                     onClick={() => {
                        if (imageList?.length <= 3) return error();
                        handleSubmit();
                     }}
                     className='submitButton'
                  >
                     Submit
                  </Button>

                  {!previewImage ? null : (
                     <Modal
                        title='Preview Image'
                        footer={null}
                        visible={previewVisible}
                        onCancel={() => setPreviewVisible(false)}
                     >
                        <img
                           alt='example'
                           style={{ width: '100%' }}
                           src={previewImage}
                        />
                     </Modal>
                  )}
               </div>
            </>
         )}
      </>
   );
}

export default ProductUploadImage;
