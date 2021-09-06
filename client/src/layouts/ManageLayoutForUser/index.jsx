import { Col, Row } from 'antd';
import React from 'react';
import BreadcrumbBar from '../../components/BreadcrumbBar';
import ManagesMenuUser from '../../features/Manages/components/ManagesMenuUser';

function ManageLayoutForUser({ children }) {
   return (
      <>
         <BreadcrumbBar />
         <div>
            <Row>
               <Col span={4}>
                  <ManagesMenuUser />
               </Col>
               <Col span={20}>{children}</Col>
            </Row>
         </div>
      </>
   );
}

export default ManageLayoutForUser;
