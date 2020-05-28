import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }, {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue')
  }, {
    path: '/news/:id?',
    name: 'NewsContent',
    component: () => import('../views/NewsContent.vue')
  }, {
    path: '/product',
    name: 'Shop',
    component: () => import('../views/Shop.vue')
  }, {
    path: '/product/:id?',
    name: 'Product',
    component: () => import('../views/Product.vue')
  }, {
    path: '/cart/:id?',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  }, {
    path: '/forgot',
    name: 'Forgot',
    component: () => import('../views/Forgot.vue')
  }, {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }, {
    path: '/account',
    name: 'Acconut',
    redirect: '/account/member',
    component: () => import('../views/Account.vue'),
    children: [
      {
        path: 'member',
        name: 'Member',
        component: () => import('../views/Member.vue'),
      }, {
        path: 'order',
        name: 'Order',
        component: () => import('../views/Order.vue'),
      }, {
        path: 'maintain',
        name: 'Maintain',
        component: () => import('../views/Maintain.vue'),
      }
    ],
    beforeEnter: (to, from, next) => {
      const isLogin = sessionStorage.getItem('token') === 'ImLogin';
      if (isLogin) {
        next();
      } else {
        if (to.path !== '/login')
          next('/login');
        else
          next();
      }
    }
  }, {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  }, {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('../views/Privacy.vue')
  }, {
    path: '/service',
    name: 'Service',
    component: () => import('../views/Service.vue')
  }, {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
})

export default router
