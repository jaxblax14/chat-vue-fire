<template>
    <div class="login">
        <img alt="Vue logo" src="http://www.drunkmall.com/wp-content/uploads/2016/04/Temoporary-Dickbutt-Tattoo.jpg"
         style="widht:200px;height:200px"> 
        <h3 style="color:#9B10CB"> inicio de sesion.</h3>
        <input type="text" v-model= "email" placeholder="email"> <br>
        <input type="password"  v-model= "password" placeholder="Password"> <br>
        <br>
        <button @click="login"> connect</button>
        <p> inicia tu session perro detonado bomba. </p> <br>
        <br>
        <br>
         <span>Crea una cuenta en: <router-link to="/signUp">signUp</router-link>.</span>
    </div>
        
</template>
<script>
import firebase,{ functions } from 'firebase'
export default {
    name: 'login',
    data() {
        return{
            email:'',
            password:'',
            
        }
    }, 
    methods:{
        login: function(){
            firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(
                (user) => {

                    var username
                    var userId = firebase.auth().currentUser.uid;
                    firebase.database().ref('/online/' + userId).once('value').then((snapshot) => {
                    username = (snapshot.val() && snapshot.val().NickName) ;
                     
                    firebase.database().ref('online/'+user.user.uid).set({
                        NickName: username
                    })
 
                    });                     

                     this.$router.replace('desplogin')
                },
                 (err) => {
                    alert('ops.' + err.message)
                }

            ) ;
            
        }

    }
}

</script>


<style scoped>
</style>
