import { Col, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import productApi from '../../../../api/productApi';
import { storage } from '../../../../firebase';
import SocialInputPost from '../../components/SocialInputPost';
import SocialNewProduct from '../../components/SocialNewProduct';
import SocialPost from '../../components/SocialPost';
import SocialUserMenu from '../../components/SocialUserMenu';
import { RiCameraLensFill, RiCameraFill, RiCompass3Fill } from 'react-icons/ri';
import './SocialPage.scss';
import postApi from '../../../../api/postApi';

const { Text } = Typography;

function LadingPage(props) {
   const photoURL = useSelector((state) => state.users.photoURL);
   const userName = useSelector((state) => state.users.username);
   const name = useSelector((state) => state.users.name);
   const userId = useSelector((state) => state.users.id);
   // eslint-disable-next-line
   const [current, setCurrent] = useState('');
   const [imageList, setImageList] = useState([]);
   const [myProduct, setMyProduct] = useState([]);
   const [posts, setPosts] = useState([]);
   const [newProduct, setNewProduct] = useState([]);

   useEffect(() => {
      if (!userId) return;
      const getMyProduct = async () => {
         try {
            const response = await productApi.getMyProduct({
               firebaseId: userId,
            });
            setMyProduct(
               response.reduce((array, item) => {
                  array.push({
                     label: (
                        <Space size={1}>
                           {item.categoryId === 1 && (
                              <RiCameraFill className='categoryIcon' />
                           )}
                           {item.categoryId === 2 && (
                              <RiCameraLensFill className='categoryIcon' />
                           )}
                           {item.categoryId === 3 && (
                              <RiCompass3Fill className='categoryIcon' />
                           )}
                           <Text>{item.name}</Text>
                        </Space>
                     ),
                     value: item.id,
                     key: item.id,
                  });
                  return array;
               }, [])
            );
         } catch (error) {
            return console.log(error);
         }
      };
      getMyProduct();
   }, [userId]);

   useEffect(() => {
      if (!userId) return;
      const getAllPost = async () => {
         try {
            const response = await postApi.getPost({
               userId: userId,
            });
            setPosts(response);
         } catch (error) {
            return console.log(error);
         }
      };
      getAllPost();
   }, [userId]);

   useEffect(() => {
      const getAllNewProducts = async () => {
         try {
            const response = await productApi.newProduct();
            setNewProduct(response);
         } catch (error) {
            console.log(error);
         }
      };
      getAllNewProducts();
   }, []);

   const handleChangeMenuSelected = (value) => {
      setCurrent(value.key);
   };

   const handleOnClickSubmit = async (formData) => {
      try {
         const response = await postApi.createPost(formData);
         setPosts((prev) => [response, ...prev]);
      } catch (error) {
         console.log(error);
      }
   };

   const uploadImage = async (options) => {
      const { onSuccess, onError, file, onProgress } = options;
      const uniqueName = uuidv4();
      const uploadTask = storage
         .ref(`posts/${userId}/${uniqueName}.${file.type.split('/')[1]}`)
         .put(file);
      uploadTask.on(
         'state_changed',
         (snapshot) => {
            onProgress({
               percent: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            });
         },
         (error) => {
            console.log(error);
         },
         () => {
            storage
               .ref(`posts/${userId}`)
               .child(`${uniqueName}.${file.type.split('/')[1]}`)
               .getDownloadURL()
               .then((url) => {
                  onSuccess(null, file);
                  setImageList((prevList) => [
                     ...prevList,
                     {
                        status: 'done',
                        url: url,
                     },
                  ]);
               })
               .catch((error) => {
                  console.log(error);
                  onError();
               });
         }
      );
   };

   const handleOnRemoveImage = (file) => {
      setImageList((prev) => {
         const filter = prev.filter((image) => image.url !== file.url);
         return filter;
      });
   };

   const updateWhenClickHeart = (response) => {
      setPosts((prev) => {
         const findIndex = prev.findIndex((post) => post.id === response.id);
         prev[findIndex].isLike = response.isLike;
         prev[findIndex].like = response.like;

         return [...prev];
      });
   };

   const handleClickLike = async (formData) => {
      try {
         const response = await postApi.likePost(formData);
         updateWhenClickHeart(response);
      } catch (error) {
         console.log(error);
      }
   };

   const handleClickUnlike = async (formData) => {
      try {
         const response = await postApi.unlikePost(formData);
         updateWhenClickHeart(response);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <div>
            <Row gutter={[25, 0]} span={24}>
               <Col span={6}>
                  <SocialUserMenu
                     photoURL={photoURL}
                     userName={userName}
                     name={name}
                     handleChangeMenuSelected={handleChangeMenuSelected}
                  />
               </Col>
               <Col span={11}>
                  <Space direction='vertical' size={25}>
                     <SocialInputPost
                        userId={userId}
                        userName={userName}
                        photoURL={photoURL}
                        name={name}
                        imageList={imageList}
                        myProduct={myProduct}
                        uploadImage={uploadImage}
                        handleOnRemove={handleOnRemoveImage}
                        handleOnClickSubmit={handleOnClickSubmit}
                     />
                     <SocialPost
                        photoURL={photoURL}
                        posts={posts}
                        userId={userId}
                        handleClickUnlike={handleClickUnlike}
                        handleClickLike={handleClickLike}
                     />
                  </Space>
               </Col>
               <Col span={7}>
                  <SocialNewProduct newProduct={newProduct} />
               </Col>
            </Row>
         </div>
      </>
   );
}

export default LadingPage;
