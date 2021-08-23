import { Card, Upload } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

ProfileEditAvatarCard.propTypes = {
   uploadImage: PropTypes.func,
   handleOnChange: PropTypes.func,
   defaultFileList: PropTypes.array,
   onPreview: PropTypes.func,
};

ProfileEditAvatarCard.defaultProps = {
   uploadImage: null,
   handleOnChange: null,
   defaultFileList: [],
   onPreview: null,
};

function ProfileEditAvatarCard(props) {
   const { uploadImage, handleOnChange, defaultFileList, onPreview } = props;
   return (
      <>
         <Card hoverable={true}>
            <div>
               <Upload
                  accept='image/*'
                  customRequest={uploadImage}
                  onChange={handleOnChange}
                  listType='picture-card'
                  defaultFileList={defaultFileList}
                  onPreview={onPreview}
                  className='image-upload-grid'
               >
                  {defaultFileList.length >= 1 ? null : (
                     <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                     </div>
                  )}
               </Upload>
               <p>Click here to change Avatar</p>
            </div>
         </Card>
      </>
   );
}

export default ProfileEditAvatarCard;
