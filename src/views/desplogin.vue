<template>
  <div class="desplogin" >
    <p>Sala de chat:</p>

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
            <strong>conectados</strong>
            <ul>
              <li v-for=" online in recentonlineRef"> 
                <router-link to="/impv">{{online.NickName}}</router-link>
              </li>
            </ul>
        </div>
    <div
      class="message"
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
      <div class="message" v-for="message in message" >
        <strong>{{message.username}}</strong>
        <p>{{message.text}}</p>
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
      message: [],
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
      e.preventDefault();
      if (e.target.value) {
        this.username = e.target.value;
      }
    },

    sendMessage(e) {
      e.preventDefault();
      if (e.target.value) {
        const message = {
          username: this.username,
          text: e.target.value,

        };

        firebase
          .database()
          .ref("message")
          .push(message);

        e.target.value = "";
      }
    }
  },

  mounted() {
    let vm = this;
    const itemsRef = firebase.database().ref("message");
    
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
      let message = [];

      Object.keys(data).forEach(key => {
        console.log(key)
        console.log(data[key])
        message.push({
          id: key,
          username: data[key].username,
          text: data[key].text
        });
      });
      vm.message = message;
    });
  }
};
</script>
