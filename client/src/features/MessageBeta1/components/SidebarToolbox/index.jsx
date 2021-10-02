import { ExpansionPanel, Sidebar } from '@chatscope/chat-ui-kit-react';
import { Image, Space } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { storage } from '../../../../firebase';

SidebarToolbox.propTypes = {
   conversationId: PropTypes.string,
};

SidebarToolbox.defaultProps = {
   conversationId: '',
};

function SidebarToolbox(props) {
   const { conversationId } = props;
   const [imageList, setImageList] = useState([]);

   useEffect(() => {
      const getImageFirebase = async () => {
         const ref = await storage
            .ref(`messages/${conversationId}/messageImage`)
            .listAll();
         const urlPromises = ref.items.map((imageRef) =>
            imageRef.getDownloadURL()
         );
         return Promise.all(urlPromises);
      };

      const loadImages = async () => {
         const urls = await getImageFirebase();
         setImageList(urls);
      };
      loadImages();
   }, [conversationId]);

   return (
      <>
         <Sidebar position='right'>
            <ExpansionPanel title='Media' open={true}>
               <Space>
                  {imageList?.map((url) => (
                     <Image
                        key={url}
                        src={url}
                        width={60}
                        height={60}
                        style={{ objectFit: 'cover' }}
                     />
                  ))}
               </Space>
            </ExpansionPanel>
         </Sidebar>
      </>
   );
}

export default SidebarToolbox;
