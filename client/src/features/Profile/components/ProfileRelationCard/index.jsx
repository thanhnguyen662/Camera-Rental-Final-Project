import { Card } from 'antd';
import React from 'react';

function ProfileRelationCard(props) {
   const tabListNoTitle = [
      {
         key: 'article',
         tab: 'article',
      },
      {
         key: 'app',
         tab: 'app',
      },
      {
         key: 'project',
         tab: 'project',
      },
   ];

   return (
      <>
         <Card tabList={tabListNoTitle}>Card content</Card>
      </>
   );
}

export default ProfileRelationCard;
