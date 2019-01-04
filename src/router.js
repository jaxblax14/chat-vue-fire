import firebase from 'firebase'
import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import login from './views/login.vue'
import desplogin from './views/desplogin'
import signup from './views/signUp.vue'
import impv  from './views/impv'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'login'

    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: signup

    },
    {
      path: '/desplogin',
      name: 'desplogin',
      component: desplogin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/impv',
      name: 'impv',
      component: impv,
      meta: {
        requiresAuth: true
      }

    }
    
  ]
});
router.beforeEach((to, from,next)=>{
 
  //next()
  //return
  const currentUser = firebase.auth().currentUser;

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth && !currentUser) next ('login');
  else if (!requiresAuth && currentUser) next ('desplogin');
  else next();
})
export  default router;