import { Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import productApi from '../../../../api/productApi';
import { storage } from '../../../../firebase';
import ProductAddressForm from '../../components/ProductAddressForm';
import { useHistory } from 'react-router';
import ProductCreateForm from '../../components/ProductCreateForm';
import ProductUploadImage from '../../components/ProductUploadImage';
import { v4 as uuidv4 } from 'uuid';
import './ProductCreatePage.scss';
import openNotificationWithIcon from '../../../../components/Notification';
import categoryApi from '../../../../api/categoryApi';

const { Step } = Steps;

function ProductCreatePage(props) {
   const history = useHistory();

   const [imageList, setImageList] = useState([]);
   const [db, setDb] = useState();
   const [currentStep, setCurrentStep] = useState(0);
   const [percent, setPercent] = useState(0);
   const [category, setCategory] = useState([]);
   const userEmail = useSelector((state) => state.users.email);
   const firebaseId = useSelector((state) => state.users.id);

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
      setDb(split);
   };

   //collect data from ProductCreateForm includes information of product
   const collectData = (values) => {
      setDb(values);
   };

   const handleSubmitCoordinates = (values) => {
      console.log(values);
      setDb({ ...db, ...values });
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
               id: firebaseId,
               description: db.description,
               productPhotoURL: db.productPhotoURL,
               categoryId: db.productCategory,
               price: db.productPrice,
               name: db.productName,
               brand: db.productBrand,
               stock: db.productStock,
               productAddress: db.productAddress,
               lat: db.lat,
               long: db.long,
               address: db.address,
               ward: db.ward,
               district: db.district,
               city: db.city,
            };

            const response = await productApi.createProduct(data);
            openNotificationWithIcon(
               'success',
               'Success',
               `Create ${response.name} successfully`
            );
            history.push('/manages/shop/product');
         } catch (error) {
            return console.log(error);
         }
      };
      createProductToDb();
   }, [db, firebaseId, history]);

   const nextStep = () => {
      setCurrentStep(currentStep + 1);
   };

   const prevStep = () => {
      setCurrentStep(currentStep - 1);
   };

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
         <ProductCreateForm
            collectData={collectData}
            currentStep={currentStep}
            nextStep={nextStep}
            prevStep={prevStep}
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
         />
      </>
   );
}

export default ProductCreatePage;
