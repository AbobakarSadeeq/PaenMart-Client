// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

let hostUrl = ""; // http://localhost:8080

export const environment = {
  // url is in nginx.config file which is => proxy_pass http://paenmart-backend:6000;
  production: false,
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

/*

With nginx proxy:

Browser makes request to: http://localhost:3000/api/Category
nginx receives it and proxies to: http://paenmart-backend:6000/api/Category
Your .NET API sees the request coming from the nginx container
But the Origin header still shows http://localhost:3000

 */



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
