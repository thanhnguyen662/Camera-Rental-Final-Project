import axiosClient from './axiosClient';

const productApi = {
   getAllProducts: (params) => {
      const url = '/product';
      return axiosClient.get(url, { params });
   },

   getProductDetail: (params) => {
      const url = `/product/${params}`;
      return axiosClient.get(url, {
         withCredentials: true,
      });
   },

   getProductComment: (params) => {
      const url = `/product/comments`;
      return axiosClient.get(url, { params });
   },

   createProduct: (data) => {
      const url = '/product/createProduct';
      return axiosClient.post(url, data);
   },

   getMyProduct: (params) => {
      const url = '/product/myProduct';
      return axiosClient.get(url, { params });
   },

   orderItemsIncludeProduct: (params) => {
      const url = '/product/orderItemsIncludeProduct';
      return axiosClient.get(url, { params });
   },

   updateProduct: (data) => {
      const url = '/product/update';
      return axiosClient.patch(url, data);
   },

   topRenting: () => {
      const url = '/product/topRenting';
      return axiosClient.get(url);
   },

   newProduct: () => {
      const url = '/product/newProduct';
      return axiosClient.get(url);
   },

   otherProductInShop: (params) => {
      const url = '/product/shop/other';
      return axiosClient.get(url, { params });
   },

   topRentingInShop: (params) => {
      const url = '/product/shop/top';
      return axiosClient.get(url, { params });
   },

   allProductInShop: (params) => {
      const url = '/product/shop/all';
      return axiosClient.get(url, { params });
   },

   countMyProduct: (params) => {
      const url = '/product/shop/count';
      return axiosClient.get(url, { params });
   },

   searchMyProduct: (params) => {
      const url = '/product/shop/search';
      return axiosClient.get(url, { params });
   },

   getProductInShopByCategory: (params) => {
      const url = '/product/shop/category';
      return axiosClient.get(url, { params });
   },
};

export default productApi;
