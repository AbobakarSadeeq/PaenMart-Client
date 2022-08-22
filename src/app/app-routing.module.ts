import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/auth/auth.guard';

const routes: Routes = [

  // Client Sides Routes
  { path: '', loadChildren: () => import('./client/home/home.module').then(m => m.HomeModule) },
  { path: 'Products/Search', loadChildren: () => import('./client/search-product/search-product.module').then(m => m.SearchProductModule) },
  { path: 'Products/:id', loadChildren: () => import('./client/client-product/client-product.module').then(m => m.ClientProductModule) },
  { path: 'Product-detail/:id', loadChildren: () => import('./client/client-product/client-product-detail/client-product-detail.module').then(m => m.ClientProductDetailModule) },
  { path: 'Cart', loadChildren: () => import('../app/client/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule) },
  { path: 'Auth', loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule) },
  { path: 'Auth/ForgetPassword', loadChildren: () => import('../app/auth/forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
  { path: 'Auth/ResetPassword', loadChildren: () => import('../app/auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },

  { path: 'User/EditUser/:id', loadChildren: () => import('./auth/Edit profile/authorized-images/authorized-images.module').then(m => m.AuthorizedImagesModule) },

  // client order
  { path: 'Client/Orders/:id', loadChildren: () => import('./client/client-order/client-order.module').then(m => m.ClientOrderModule) },
  { path: 'Client/OrdersDetail/:id', loadChildren: () => import('./client/client-order/client-order-detail/client-order-detail.module').then(m => m.ClientOrderDetailModule) },

  { path: 'Client/Reviews', loadChildren: () => import('./client/client-order-review/client-order-review.module').then(m => m.ClientOrderReviewModule) },



  // Admin side routes
  { path: 'Admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Shipper', 'Employee'] } },
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







  // wildcard
  { path: 'notfound', loadChildren: () => import('../app/client/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: '**', redirectTo: '/notfound' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
