import { Col, Input, Menu, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
   BsCameraVideo,
   BsClipboardData,
   BsGrid,
   BsPersonSquare,
   BsSearch,
} from 'react-icons/bs';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import './ProfileSearchBar.scss';

ProfileSearchBar.propTypes = {};

function ProfileSearchBar(props) {
   const { userId } = useParams();
   const history = useHistory();
   const match = useRouteMatch();

   const timeout = useRef(null);
   const [current, setCurrent] = useState('overview');
   const [search, setSearch] = useState('');

   const menuStyle = {
      marginBottom: -2.5,
      fontSize: 16,
   };

   useEffect(() => {
      setCurrent('overview');
   }, [userId]);

   useEffect(() => {
      if (current === 'overview') return history.push(`${match.url}`);
      if (current === 'search') return handleOnSearchChange();
      history.push(`${match.url}/${current}`);
      // eslint-disable-next-line
   }, [current, search]);

   const handleOnSearchChange = (value) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
         return history.push(`${match.url}/${current}/${search || null}`);
      }, 400);
   };

   return (
      <>
         <div className='profileSearchBar'>
            <Row justify='center' align='middle'>
               <Col span={18}>
                  <Menu
                     mode='horizontal'
                     className='menu'
                     onSelect={(e) => setCurrent(e.key)}
                     selectedKeys={[current]}
                  >
                     <Menu.Item
                        key='overview'
                        icon={<BsClipboardData style={menuStyle} />}
                     >
                        Overview
                     </Menu.Item>
                     <Menu.Item
                        key='dslr'
                        icon={<BsCameraVideo style={menuStyle} />}
                     >
                        DSLR
                     </Menu.Item>
                     <Menu.Item
                        key='lens'
                        icon={<BsPersonSquare style={menuStyle} />}
                     >
                        Lens
                     </Menu.Item>
                     <Menu.Item
                        key='accessories'
                        icon={<BsGrid style={menuStyle} />}
                     >
                        Accessories
                     </Menu.Item>
                     {current === 'search' && (
                        <Menu.Item
                           key='search'
                           icon={<BsSearch style={menuStyle} />}
                        >
                           Result
                        </Menu.Item>
                     )}
                  </Menu>
               </Col>
               <Col span={6}>
                  <div className='input'>
                     <Input
                        onChange={(e) => setSearch(e.target.value)}
                        suffix={<BsSearch />}
                        placeholder='Search here'
                        onPressEnter={() => {
                           if (search === '') return;
                           setCurrent('search');
                        }}
                     />
                  </div>
               </Col>
            </Row>
         </div>
      </>
   );
}

export default ProfileSearchBar;
