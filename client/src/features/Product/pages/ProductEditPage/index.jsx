import { Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import categoryApi from '../../../../api/categoryApi';
import productApi from '../../../../api/productApi';
import { storage } from '../../../../firebase';
import ProductAddressForm from '../../components/ProductAddressForm';
import ProductCreateForm from '../../components/ProductCreateForm';
import ProductUploadImage from '../../components/ProductUploadImage';
import openNotificationWithIcon from '../../../../components/Notification';

const { Step } = Steps;

function ProductEditPage(props) {
   const { slug } = useParams();
   const history = useHistory();
   const [currentStep, setCurrentStep] = useState(0);
   const [db, setDb] = useState();
   const [productData, setProductData] = useState({});
   const [imageList, setImageList] = useState([]);
   const [percent, setPercent] = useState(0);
   const [category, setCategory] = useState([]);

   const userEmail = useSelector((state) => state.users.email);

   useEffect(() => {
      const getProductDetail = async () => {
         if (!slug) return;
         const response = await productApi.getProductDetail(slug);
         console.log('Detail: ', response);

         setProductData(response);
         setImageList(() => {
            let data = [];
            response.productPhotoURL.map((url) => {
               return data.push({
                  status: 'done',
                  url: url,
                  id: uuidv4(),
               });
            });

            return data;
         });
      };
      getProductDetail();
   }, [slug]);

   useEffect(() => {
      const getCategoryInDb = async () => {
         try {
            const response = await categoryApi.getCategory();
            setCategory(response);
         } catch (error) {
            console.log(error);
         }
      };
      getCategoryInDb();
   }, []);

   const uploadImage = async (options) => {
      const { onSuccess, onError, file } = options;
      const uniqueName = uuidv4();

      const uploadTask = storage
         .ref(
            `products/${userEmail}/product/${uniqueName}.${
               file.type.split('/')[1]
            }`
         )
         .put(file);
      uploadTask.on(
         'state_changed',
         (snapshot) => {
            setPercent((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
         },
         (error) => {
            console.error(error);
         },
         () => {
            storage
               .ref(`products/${userEmail}/product`)
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

   const collectBasicData = (values) => {
      console.log('collectBasicData', values);
      setDb(values);
   };

   const handleOnRemove = (file) => {
      const index = imageList.indexOf(file);
      const split = [...imageList];
      split.splice(index, 1);
      setImageList(split);
   };

   const handleSubmit = () => {
      let array = [];
      //extract url in imageList to new array ['url1', 'url2']
      imageList.map((image) => {
         const mutable = { ...image };
         array.push(mutable.url);

         return mutable;
      });

      //add photoURL array to array data for push into DB
      const split = { ...db };
      split.productPhotoURL = array;
      console.log('photo', split);
      setDb(split);
   };

   const handleSubmitCoordinates = (values) => {
      console.log('submitCoordinates', values);
      setDb({ ...db, ...values });
   };

   const nextStep = () => {
      setCurrentStep(currentStep + 1);
   };

   const prevStep = () => {
      setCurrentStep(currentStep - 1);
   };

   useEffect(() => {
      const createProductToDb = async () => {
         if (
            !db?.description ||
            !db.productPrice ||
            !db.productName ||
            !db.productPhotoURL ||
            !db.lat ||
            db.productPhotoURL?.length === 0
         )
            return;

         try {
            //prepare data for Db
            const data = {
               productId: productData.id,
               description: db.description,
               productPhotoURL: db.productPhotoURL,
               price: db.productPrice,
               name: db.productName,
               brand: db.productBrand,
               stock: db.productStock,
               lat: db.lat,
               long: db.long,
               address: db.address,
               ward: db.ward,
               district: db.district,
               city: db.city,
               categoryId: db.productCategory,
            };
            const response = await productApi.updateProduct(data);
            openNotificationWithIcon(
               'success',
               'Updated',
               `Update ${response.name} successfully`
            );
            history.push('/manages/shop/product');
         } catch (error) {
            return console.log(error);
         }
      };
      createProductToDb();
      // eslint-disable-next-line
   }, [db, productData.id]);

   return (
      <>
         <div className='createStep'>
            <Steps current={currentStep}>
               <Step title='Create product' description='Basic information.' />
               <Step title='Description' description='Product description.' />
               <Step title='Image' description='Photos of product.' />
               <Step title='Address' description='Address for rent.' />
            </Steps>
         </div>
         {Object.keys(productData).length !== 0 && (
            <>
               <ProductCreateForm
                  collectData={collectBasicData}
                  currentStep={currentStep}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  oldData={productData}
                  category={category}
               />
               <ProductUploadImage
                  uploadImage={uploadImage}
                  imageList={imageList}
                  handleOnRemove={handleOnRemove}
                  handleSubmit={handleSubmit}
                  currentStep={currentStep}
                  percent={percent}
                  prevStep={prevStep}
                  nextStep={nextStep}
               />
               <ProductAddressForm
                  currentStep={currentStep}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleSubmitCoordinates={handleSubmitCoordinates}
                  oldData={productData}
               />
            </>
         )}
      </>
   );
}

export default ProductEditPage;
