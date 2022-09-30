import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/auth/auth.guard';
import { AboutUsComponent } from './client/footer/about-us/about-us.component';
import { ContactUsComponent } from './client/footer/contact-us/contact-us.component';

const routes: Routes = [

  // Client Sides Routes
  { path: '', loadChildren: () => import('./client/home/home.module').then(m => m.HomeModule) },
  { path: 'Products/Search', loadChildren: () => import('./client/search-product/search-product.module').then(m => m.SearchProductModule) },
  { path: 'Products/:id', loadChildren: () => import('./client/client-product/client-product.module').then(m => m.ClientProductModule) },
  { path: 'Products-by-brand/:name/:id', loadChildren: () => import('./client/client-product/products-by-Footer-selected/products-by-Footer-selected.module').then(m => m.ProductsByBrandModule) },
  { path: 'Product-detail/:id', loadChildren: () => import('./client/client-product/client-product-detail/client-product-detail.module').then(m => m.ClientProductDetailModule) },
  { path: 'Cart', loadChildren: () => import('../app/client/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule) },
  { path: 'Auth', loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule) },
  { path: 'Auth/ForgetPassword', loadChildren: () => import('../app/auth/forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
  { path: 'Auth/ResetPassword', loadChildren: () => import('../app/auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },

  { path: 'User/EditUser/:id', loadChildren: () => import('./auth/Edit profile/authorized-images/authorized-images.module').then(m => m.AuthorizedImagesModule) },

  // client order
  { path: 'Client/Orders/:id', loadChildren: () => import('./client/client-order/client-order.module').then(m => m.ClientOrderModule) },
  { path: 'Client/OrdersDetail/:id', loadChildren: () => import('./client/client-order/client-order-detail/client-order-detail.module').then(m => m.ClientOrderDetailModule) },
  { path: 'Client/Order-Track', loadChildren: () => import('./client/client-order/order-tracking/order-tracking.module').then(m => m.OrderTrackingModule) },

  // review components
  { path: 'Client/Reviews', loadChildren: () => import('./client/client-order-review/client-order-review.module').then(m => m.ClientOrderReviewModule) },
  { path: 'Client/Write-Reviews/Product/:id', loadChildren: () => import('./client/client-order-review/client-single-product-review/client-single-product-review.module').then(m => m.ClientSingleProductReviewModule) },

  // some common pages
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'Client/Wishlist', loadChildren: () => import('./client/wish-list/wish-list.module').then(m => m.WishListModule) },


  // Admin side routes
  { path: 'Admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'Admin/Category', loadChildren: () => import('./admin/products-menu/category/category.module').then(m => m.CategoryModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },
  { path: 'Admin/Sub-Category', loadChildren: () => import('./admin/products-menu/sub-category/sub-category.module').then(m => m.SubCategoryModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },
  { path: 'Admin/Nest-Sub-Category', loadChildren: () => import('./admin/products-menu/nest-sub-category/nest-sub-category.module').then(m => m.NestSubCategoryModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },
  { path: 'Admin/Product-brand', loadChildren: () => import('./admin/product-extra-info/product-brand/product-brand.module').then(m => m.ProductBrandModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },
  { path: 'Admin/Dynamic-Form-Structure', loadChildren: () => import('./admin/product-extra-info/dynamic-form-structure/dynamic-form-structure.module').then(m => m.DynamicFormStructureModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },
  { path: 'Admin/Brand-With-Nest-Category', loadChildren: () => import('./admin/product-extra-info/brand-with-nest-category/brand-with-nest-category.module').then(m => m.BrandWithNestCategoryModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },


  { path: 'Admin/Product/:NestCategoryName', loadChildren: () => import('./admin/product/product.module').then(m => m.ProductModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },
  { path: 'Admin/AddProduct/:NestCategoryName', loadChildren: () => import('./admin/product/add-product/add-product.module').then(m => m.AddProductModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },
  { path: 'Admin/UpdateProduct/:NestCategoryName', loadChildren: () => import('./admin/product/update-product/update-product.module').then(m => m.UpdateProductModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },
  { path: 'Admin/Carousel', loadChildren: () => import('./admin/product-extra-info/carousel/carousel.module').then(m => m.CarouselModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },

  // role
  { path: 'Admin/UserRoles', loadChildren: () => import('../app/admin/user/user-roles/user-roles.module').then(m => m.UserRolesModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'Admin/EditRole/:id', loadChildren: () => import('../app/admin/user/user-roles/edit-role/edit-role.module').then(m => m.EditRoleModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'Admin/EditUsersRole/:id', loadChildren: () => import('../app/admin/user/user-roles/edit-role/edit-user-in-role/edit-user-in-role.module').then(m => m.EditUserInRoleModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },

  { path: 'Admin/Country', loadChildren: () => import('./admin/product-extra-info/country/country.module').then(m => m.CountryModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },
  { path: 'Admin/City', loadChildren: () => import('./admin/product-extra-info/city/city.module').then(m => m.CityModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },

  { path: 'Admin/AdminAccountBalance', loadChildren: () => import('./admin/admin-account-balance/admin-account-balance.module').then(m => m.AdminAccountBalanceModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  // payment
  { path: 'Admin/EmployeePayment', loadChildren: () => import('./admin/user/employee-payment/employee-payment.module').then(m => m.EmployeePaymentModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'Admin/ShipperPayment', loadChildren: () => import('./admin/user/shipper-payment/shipper-payment.module').then(m => m.ShipperPaymentModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },

  { path: 'Admin/Sponsored-Ad', loadChildren: () => import('./admin/sponsored-ad/sponsored-ad.module').then(m => m.SponsoredAdModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },

  { path: 'Admin/SendingEmail', loadChildren: () => import('./admin/extra-features/email-sending-info/email-sending-info.module').then(m => m.EmailSendingInfoModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },


  // Users

  { path: 'Admin/Users', loadChildren: () => import('./admin/user/users/user.module').then(m => m.UserModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },


  // Admin Orders
  { path: 'Admin/PendingUserOrders', loadChildren: () => import('./admin/user/orders/pending-orders-for-admin/pending-orders-for-admin.module').then(m => m.PendingOrdersForAdminModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },
  { path: 'Admin/CancelUserOrders', loadChildren: () => import('./admin/user/orders/cancel-orders-for-admin/cancel-orders-for-admin.module').then(m => m.CancelOrdersForAdminModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },
  { path: 'Admin/ShippedUserOrders', loadChildren: () => import('./admin/user/orders/shipped-orders-for-admin/shipped-orders-for-admin.module').then(m => m.ShippedOrdersForAdminModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },
  { path: 'Admin/ShippingPendingUserOrders', loadChildren: () => import('./admin/user/orders/shipping-pending-orders-for-admin/shipping-pending-orders-for-admin.module').then(m => m.ShippingPendingOrdersForAdminModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },

  // Admin Side Order details
  { path: 'Admin/OrderDetails/:id', loadChildren: () => import('./admin/user/orders/order-details/order-details.module').then(m => m.OrderDetailsModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee', 'Shipper'] } },


  // shipper order
  { path: 'Admin/Shipper/ShipperPendingOrders', loadChildren: () => import('./admin/user/orders/shipper-side/shipping-pending-orders-for-shipper/shipping-pending-orders-for-shipper.module').then(m => m.ShippingPendingOrdersForShipperModule), canActivate: [AuthGuard], data: { permittedRoles: ['Shipper'] } },
  { path: 'Admin/Shipper/ShipperShipmentDoneOrders/:id', loadChildren: () => import('./admin/user/orders/shipper-side/shipper-shipment-orders/shipper-shipment-orders.module').then(m => m.ShipperShipmentOrdersModule), canActivate: [AuthGuard], data: { permittedRoles: ['Shipper'] } },


  // Discount deals of products
  { path: 'Admin/Product-discount-deals', loadChildren: () => import('./admin/product-discount-deals/product-discount-deals.module').then(m => m.ProductDiscountDealsModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },
  { path: 'Admin/Add-Product-discount-deals', loadChildren: () => import('./admin/product-discount-deals/add-product-deals/add-product-deals.module').then(m => m.AddProductDealsModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },
  { path: 'Admin/Update-Product-discount-deals/:id', loadChildren: () => import('./admin/product-discount-deals/update-product-deals/update-product-deals.module').then(m => m.UpdateProductDealsModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Employee'] } },




  // wildcard
  { path: 'notfound', loadChildren: () => import('../app/client/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: '**', redirectTo: '/notfound' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
