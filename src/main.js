import Vue from 'vue'
import firebase from 'firebase'

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let app = ''; 
  // Initialize Firebase
  
  firebase.initializeApp ({
    apiKey: "AIzaSyCyZBG7i5coYZGUMUHnSWLRtrtHKkXsDlk",
    authDomain: "vue-firebase-tutorial-7534c.firebaseapp.com",
    databaseURL: "https://vue-firebase-tutorial-7534c.firebaseio.com",
    projectId: "vue-firebase-tutorial-7534c",
    storageBucket: "vue-firebase-tutorial-7534c.appspot.com",
    messagingSenderId: "197015380071"
  });

  firebase.auth().onAuthStateChanged(()  => {
    if (!app) {
      app = new Vue ({
        router,
        render: h => h(App)
      }).$mount('#app');
    }
  });

