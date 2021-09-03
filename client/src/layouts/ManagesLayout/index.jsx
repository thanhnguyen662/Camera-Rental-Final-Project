import { Col, Row } from 'antd';
import React from 'react';
import BreadcrumbBar from '../../components/BreadcrumbBar';
import ManagesMenu from '../../features/Manages/components/ManagesMenu';
import './ManagesLayout.scss';

function Manages({ children }) {
   return (
      <>
         <BreadcrumbBar />
         <div className='managesLayout'>
            <Row>
               <Col span={4}>
                  <ManagesMenu />
               </Col>
               <Col flex='auto'>
                  <div className='managesContent'>{children}</div>
               </Col>
            </Row>
         </div>
      </>
   );
}

export default Manages;
