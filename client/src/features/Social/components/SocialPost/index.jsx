import {
   EllipsisOutlined,
   FireOutlined,
   HeartOutlined,
   MessageOutlined,
} from '@ant-design/icons';
import { Col, Image, Input, Row, Space, Table, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './SocialPost.scss';

SocialPost.propTypes = {
   photoURL: PropTypes.string,
};

SocialPost.defaultProps = {
   photoURL: '',
};

const { Text } = Typography;

function SocialPost(props) {
   const { photoURL } = props;
   const images = [
      {
         image: 'https://scontent.fdad4-1.fna.fbcdn.net/v/t1.6435-9/117307481_2112709495540126_5030044787972036923_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=Dl8JtjOdbg4AX_sKJiy&_nc_ht=scontent.fdad4-1.fna&oh=a9fe48c95f75730dbeca54670fc76183&oe=614E977E',
      },
      {
         image: 'https://scontent.fdad4-1.fna.fbcdn.net/v/t1.6435-9/239611200_4644195738946171_1326995487214057253_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=4LjRHRAk6pIAX9ln4vo&tn=iMqG9lEjMZzo3pIg&_nc_ht=scontent.fdad4-1.fna&oh=5350dd8037cbb7e56ef2aae301a3c382&oe=6150937B',
      },
      {
         image: 'https://scontent.fdad4-1.fna.fbcdn.net/v/t39.30808-6/p180x540/240926763_1238237936690378_1324191677240763248_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=825194&_nc_ohc=Ut9oVkcrh7gAX8sTyTo&_nc_ht=scontent.fdad4-1.fna&oh=5116ca1e8d36f3686495935e93ed1f54&oe=612F9FB0',
      },
   ];

   const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      centerPadding: '60px',
      adaptiveHeight: true,
   };

   const dataSource = [
      {
         key: '1',
         userName: '_ayellowlemontree',
         content: 'No caption needed 🌈🤟🏻',
      },
      {
         key: '3',
         userName: 'wyntracyy',
         content: ' Ko có gì ngoài tóc......',
      },
      {
         key: '2',
         userName: 'hhya.21',
         content: 'Fall in love with taking care of myself.',
      },
   ];

   const columns = [
      {
         title: 'Name',
         key: 'name',
         render: (record) => {
            return (
               <>
                  <Text className='commentTableUsername'>
                     {record.userName}
                  </Text>
                  &nbsp;
                  <Text className='commentTableContent'>{record.content}</Text>
               </>
            );
         },
      },
   ];

   return (
      <>
         <div className='socialPost'>
            <div className='post'>
               <div className='postUserInfo'>
                  <Row justify='center' align='middle'>
                     <Col flex='auto'>
                        <Space size={12}>
                           <Avatar size={40} />
                           <div>
                              <div className='userName'>thanhnguyen662</div>
                              <div className='timeAgo'>12 minutes ago</div>
                           </div>
                        </Space>
                     </Col>
                     <Col>
                        <EllipsisOutlined className='ellipsisOutlinedIcon' />
                     </Col>
                  </Row>
                  <div className='description'>
                     Ut reprehenderit irure quis cillum cupidatat laboris enim
                     reprehenderit anim occaecat ut cupidatat labore amet. Lorem
                     ut eiusmod Lorem do magna qui ut ea consectetur.
                  </div>
               </div>
               <div>
                  <Slider {...settings} className='postSlide'>
                     {images.map((image) => (
                        <div key={image.image}>
                           <Image
                              src={image.image}
                              alt='photos'
                              preview={true}
                           />
                        </div>
                     ))}
                  </Slider>
               </div>
               <div className='socialButtonGroup'>
                  <Space size={20}>
                     <div>
                        <Space>
                           <HeartOutlined className='icon' />
                           <Text className='text'>234</Text>
                        </Space>
                     </div>
                     <div>
                        <Space>
                           <MessageOutlined className='icon' />
                           <Text className='text'>564</Text>
                        </Space>
                     </div>
                     <div>
                        <Space>
                           <FireOutlined className='icon' />
                           <Text className='text'>123</Text>
                        </Space>
                     </div>
                  </Space>
               </div>
               <div className='socialComment'>
                  <Text className='viewAll'>View all comment</Text>
                  <Table
                     dataSource={dataSource}
                     columns={columns}
                     pagination={false}
                     className='socialCommentTable'
                  />
               </div>
               <div className='socialCommentInput'>
                  <Row gutter={[15, 0]}>
                     <Col>
                        <Avatar src={photoURL} size={40} />
                     </Col>
                     <Col flex='auto'>
                        <Input placeholder='Write your comment...' />
                     </Col>
                  </Row>
               </div>
            </div>
         </div>
      </>
   );
}

export default SocialPost;
