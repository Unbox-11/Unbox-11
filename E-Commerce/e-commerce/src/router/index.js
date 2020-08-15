import Vue from 'vue'
import VueRouter from 'vue-router'
import Home1 from '../views/Start.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Start',
    component: Home1,
    meta: { title: 'Unbox' }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { title: 'About Us' }
  },
  {
    path: '/profile/details',
    name: 'Details',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile/Details.vue'),
    meta: { title: 'My Details' }
  },
  {
    path: '/profile/addresses',
    name: 'Address',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile/Address.vue'),
    meta: { title: 'My Addresses' }
  },
  {
    path: '/profile/orders',
    name: 'Orders',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile/Orders.vue'),
    meta: { title: 'My Orders' }
  },
  {
    path: '/profile/notifications',
    name: 'Notifications',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile/Notifications.vue'),
    meta: { title: 'My Notifications' }
  },
  {
    path: '/profile/coupons',
    name: 'Coupons',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile/Coupons.vue'),
    meta: { title: 'My Coupons' }
  },
  {
    path: '/cart',
    name: 'Cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PlaceOrder/Cart.vue'),
    meta: { title: 'Cart' }
  },
  {
    path: '/products',
    name: 'ProductsAll',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductsAll/Products.vue'),
    meta: { title: 'Products' }
  },
  {
    path: '/product/:id/:name',
    name: 'Product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductsAll/product.vue'),
    meta:{
        title : 'Product'
      },
  },
  {
    path: '/order/:id :name :size :shape :quantity',
    name: 'Order',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PlaceOrder/order.vue'),
    meta: { title: 'Order' }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signin-Login.vue'),
    meta: { title: 'Log In' }
  },
  {
    path: '/sign_up_form/:id',
    name: 'SignUp',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserDetails.vue'),
    meta: { title: 'User Details' }
  },
  {
    path: '/product_adding_form_only_for_team 0092257447/',
    name: 'ProductForm',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Private Pages/productForm.vue'),
    meta: { title: 'Products Form' }
  },
  {
    path: '/products_to_delivered 0092257447/',
    name: 'AdminOrders',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Private Pages/admin_orders.vue'),
    meta: { title: 'Orders Delivery' }
  },
  {
    path: '/products_to_delivered_0092257447/:id',
    name: 'AdminOrdersToDeliver',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Private Pages/admin_orders_information.vue'),
    meta: { title: 'Orders Delivery' }
  },
  {
    path: '/orders/:id/:prdId',
    name: 'Information',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile/Orders_Information.vue'),
    meta: { title: 'Summary' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.afterEach((to) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    Vue.nextTick(() => {
        document.title = to.params.name || to.meta.title || 'Unbox'
    });
});
export default router
