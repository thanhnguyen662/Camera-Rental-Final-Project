import { ExpansionPanel, Sidebar } from '@chatscope/chat-ui-kit-react';
import { Col, Image, Row } from 'antd';
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
               <Row span={24} gutter={[2, 2]}>
                  {imageList?.map((url) => (
                     <Col span={6} key={url}>
                        <Image
                           src={url}
                           width={60}
                           height={60}
                           style={{ objectFit: 'cover' }}
                        />
                     </Col>
                  ))}
               </Row>
            </ExpansionPanel>
         </Sidebar>
      </>
   );
}

export default SidebarToolbox;
