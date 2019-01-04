<template>
  <div class="impv" >
    <p>Sala de chat privado</p>

    <button @click="logout">logout</button>
    <hr>
    

    <div>
      from : {{username}}
      <br>message:
      <br>
        <textarea name id cols="70" rows="5" placeholder="New message" v-on:keyup.enter="sendMessage"></textarea>
    <hr>
    </div>
        <div   class="userconnect" >
           <!-- <strong>conectados</strong>
            <ul>
              <li v-for=" online in recentonlineRef"> 
                <router-link to="/impv" target="_blank">{{online.NickName}}</router-link>
              </li>
            </ul> 
            -->
        </div>
    <div
      class="messagepv"
      style="overflow-y: scroll;min-width: 200px;max-width: 20em;
                height: 12em;
                padding: 1em;
                margin: auto;
                border: 0.062em solid #999;
                background-color: #fff;
                overflow: 0;
                direction: rtl;
                text-align: left;
                bottom: 0"
                
    >
      <h3>message</h3>
      <div class="messagepv" v-for="messagepv in messagepv" >
        <strong>{{messagepv.username}}</strong>
        <p>{{messagepv.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";



export default {
  name: "desplogin",

  data() {
    return {
      username: "",
      messagepv: [],
      userId: "",
      online: false,
      recentonlineRef:""
    };
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {

        firebase.database().ref('online/' +user.user.uid).set({
          NickName: null
         });          
          this.$router.replace("login");
        });
    },
    
    updateUsername(e) {
        //firebase.auth().currentUser.uid.   
      e.preventDefault();
      if (e.target.value) {
        this.username = e.target.value;
      }
    },

    sendMessage(e) {
      e.preventDefault();
      if (e.target.value) {
        const messagepv = {
          username: this.username,
          text: e.target.value,

        };

        firebase
          .database()
          .ref("messagepv")
          .push(messagepv);

        e.target.value = "";
      }
    }
  },

  mounted() {
    let vm = this;
    const itemsRef = firebase.database().ref("messagepv");
    
    var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
      this.username = (snapshot.val() && snapshot.val().userNick) ;
      this.userId = userId;
    });
    
    var recentonlineRef = firebase.database().ref('online').once('value').then((snapshot) =>{
      this.recentonlineRef = (snapshot.val())
    })
    
    itemsRef.on("value", snapshot => {
      let data = snapshot.val();
      let messagepv = [];

      Object.keys(data).forEach(key => {
        messagepv.push({
          id: key,
          username: data[key].username,
          text: data[key].text
        });
      });
      vm.messagepv = messagepv;
    });
  }
};
</script>
