import { LinkOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import PropTypes from 'prop-types';
import React from 'react';
import './SocialInputPost.scss';

SocialInputPost.propTypes = {
   userName: PropTypes.string,
   photoURL: PropTypes.string,
};

SocialInputPost.defaultProps = {
   userName: '',
   photoURL: '',
};

function SocialInputPost(props) {
   const { userName, photoURL } = props;

   return (
      <div className='socialInputPost'>
         <Input
            onClick={() => console.log('ok')}
            placeholder={`What is new, ${userName}`}
            className='socialInput'
            prefix={
               <Avatar src={photoURL} className='socialInputAvatar' size={40} />
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
   );
}

export default SocialInputPost;
