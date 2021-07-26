import { Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import productApi from '../../../../api/productApi';
import { storage } from '../../../../firebase';
import ProductAddressForm from '../../components/ProductAddressForm';
import ProductCreateForm from '../../components/ProductCreateForm';
import ProductUploadImage from '../../components/ProductUploadImage';
import { v4 as uuidv4 } from 'uuid';
import './ProductCreatePage.scss';

const { Step } = Steps;

function ProductCreatePage(props) {
   const [imageList, setImageList] = useState([]);
   const [db, setDb] = useState();
   const [currentStep, setCurrentStep] = useState(3);
   const [percent, setPercent] = useState(0);
   const userEmail = useSelector((state) => state.users.email);
   const firebaseId = useSelector((state) => state.users.id);

   const uploadImage = async (options) => {
      const { onSuccess, onError, file } = options;
      const uniqueName = uuidv4();
      console.log(`${uniqueName}.${file.type.split('/')[1]}`);

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
                  console.log(url);
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
   console.log('imageList', imageList);

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
            //get coordinates from product address
            // const address = encodeURIComponent(db.productAddress);
            // const apiKey = process.env.REACT_APP_MAP_BOX_API_KEY;
            // const getCoordinates = await axios.get(
            //    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiKey}&limit=1`
            // );
            // console.log('address', getCoordinates.data.features[0].center);

            //prepare data for Db
            const data = {
               id: firebaseId,
               description: db.description,
               productPhotoURL: db.productPhotoURL,
               price: db.productPrice,
               name: db.productName,
               brand: db.productBrand,
               stock: db.productStock,
               productAddress: db.productAddress,
               lat: db.lat,
               long: db.long,
               // lat: getCoordinates.data.features[0].center[1],
               // long: getCoordinates.data.features[0].center[0],
            };
            console.log('full: ', data);
            const response = await productApi.createProduct(data);
            console.log('created product: ', response);
         } catch (error) {
            return console.log(error);
         }
      };
      createProductToDb();
   }, [db, firebaseId]);

   const nextStep = () => {
      setCurrentStep(currentStep + 1);
   };

   const prevStep = () => {
      setCurrentStep(currentStep - 1);
   };

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
