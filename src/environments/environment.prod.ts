let hostUrl = ""; // http://localhost:8080

export const environment = {
  // url is in nginx.config file which is => proxy_pass http://paenmart-backend:6000;
  production: true,
  categoryApiUrl: hostUrl + "/api/Category",
  subCategoryApiUrl: hostUrl + "/api/SubCategory",
  nestSubCategoryApiUrl: hostUrl + "/api/NestSubCategory",
  productBrandApiUrl: hostUrl + "/api/ProductBrand",
  dynamicFormStructureApiUrl: hostUrl + "/api/DynamicFormStructure",
  productApiUrl: hostUrl + "/api/Product",
  accountApiUrl: hostUrl + "/api/Account",
  userAddressApiUrl: hostUrl + "/api/UserAddress",
  cityApiUrl: hostUrl + "/api/City",
  countryApiUrl: hostUrl + "/api/Country",
  adminAccountBalanceUrl: hostUrl + "/api/AdminAccountBalance",
  extraFeaturesApiUrl: hostUrl + "/api/ExtraFeatures",
  productDiscountDealsApiUrl: hostUrl + "/api/ProductDiscountDeals",
  carouselApiUrl: hostUrl + "/api/Carousel",
  sponsoreAdsApiUrl: hostUrl + "/api/SponsoreAds",
  usersApiUrl: hostUrl + "/api/Users",
  userOrderApiUrl: hostUrl + "/api/UserOrder",
  administratorApiUrl: hostUrl + "/api/Administrator",
  userPhotoApiUrl: hostUrl + "/api/UserPhoto",
  userOrderProductReviewApiUrl: hostUrl + "/api/UserOrderProductReview",
  homeApiUrl: hostUrl + "/api/Home",
  productWishListApiUrl: hostUrl + "/api/ProductWishList",
  notificationUrl: hostUrl + "/notificationhub"
};
