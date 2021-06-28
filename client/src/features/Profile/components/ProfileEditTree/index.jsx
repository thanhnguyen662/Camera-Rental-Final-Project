import {
   DownOutlined,
   FrownFilled,
   FrownOutlined,
   MehOutlined,
   SmileOutlined,
   UserOutlined,
} from '@ant-design/icons';
import { Comment, Tree, Card, Divider, Rate, Spin } from 'antd';
import React from 'react';

ProfileEditTree.propTypes = {};

function ProfileEditTree(props) {
   const { userEmail, userName, photoURL } = props;
   const treeData = [
      {
         title: 'parent 1',
         key: '0-0',
         icon: <UserOutlined />,
         children: [
            {
               title: 'leaf',
               key: '0-0-0',
               icon: <MehOutlined />,
            },
            {
               title: 'leaf',
               key: '0-0-1',
               icon: ({ selected }) =>
                  selected ? <FrownFilled /> : <FrownOutlined />,
            },
         ],
      },
   ];

   const customIcons = {
      1: <FrownOutlined />,
      2: <FrownOutlined />,
      3: <MehOutlined />,
      4: <SmileOutlined />,
      5: <SmileOutlined />,
   };

   return (
      <>
         <Card hoverable={true}>
            {!userEmail && !userName ? (
               <Spin />
            ) : (
               <>
                  <Comment
                     author={userEmail}
                     avatar={photoURL}
                     content={userName}
                     style={{ marginTop: '-20px', marginBottom: '-18px' }}
                  />

                  <Rate
                     defaultValue={3}
                     character={({ index }) => customIcons[index + 1]}
                     style={{ marginBottom: '-10px' }}
                  />
                  <Divider />
                  <Tree
                     showIcon
                     defaultExpandAll
                     switcherIcon={<DownOutlined />}
                     treeData={treeData}
                  />
               </>
            )}
         </Card>
      </>
   );
}

export default ProfileEditTree;
