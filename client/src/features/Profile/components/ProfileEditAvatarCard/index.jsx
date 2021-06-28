import { Card, Image, Spin, Upload } from 'antd';
import 'firebase/auth';
import React from 'react';
import PropTypes from 'prop-types';

ProfileEditAvatarCard.propTypes = {
   uploadImage: PropTypes.func,
   handleOnChange: PropTypes.func,
   defaultFileList: PropTypes.array,
   onPreview: PropTypes.func,
   photoURL: PropTypes.string,
};

ProfileEditAvatarCard.defaultProps = {
   uploadImage: null,
   handleOnChange: null,
   defaultFileList: [],
   onPreview: null,
   photoURL: '',
};

function ProfileEditAvatarCard(props) {
   const { uploadImage, handleOnChange, defaultFileList, onPreview, photoURL } =
      props;
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
                     <>{!photoURL ? <Spin /> : <Image src={photoURL} />}</>
                  )}
               </Upload>
               <p>Click picture to change Avatar</p>
            </div>
         </Card>
      </>
   );
}

export default ProfileEditAvatarCard;
