import PropTypes from 'prop-types';
import { Upload, Modal } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

ProductUploadImage.propTypes = {
   uploadImage: PropTypes.func,
   imageList: PropTypes.array,
   handleOnRemove: PropTypes.func,
   handleSubmit: PropTypes.func,
};

ProductUploadImage.defaultProps = {
   uploadImage: null,
   imageList: [],
   handleOnRemove: null,
   handleSubmit: null,
};

function ProductUploadImage(props) {
   const { uploadImage, imageList, handleOnRemove, handleSubmit } = props;
   const [previewImage, setPreviewImage] = useState('');
   const [previewVisible, setPreviewVisible] = useState(false);

   return (
      <>
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
         <button onClick={handleSubmit}>Submit</button>
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
      </>
   );
}

export default ProductUploadImage;
