<template>
    <div class="sign-up">
        <img alt="Vue logo" src="http://www.drunkmall.com/wp-content/uploads/2016/04/Temoporary-Dickbutt-Tattoo.jpg"
         style="widht:200px;height:200px"> 
        <p> crea tu wea de cuenta.</p>
        <input type="text"  v-model="email" placeholder="Email"><br>
        <input type="text" v-model="NickName" placeholder="NickName"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <br>
        <button @click="signUp" >Crear Cuenta</button>
        <br>
        <span>Vuelve atras  a <router-link to="/login">login</router-link>.</span>

    </div>   
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'sign-up',
    data() {
        return{
            email:'',
            password:'',
            NickName:'',
            
        }
    }, 
    methods:{
        signUp: function(){
            firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(
                (user)=>{


                     firebase.database().ref('users/' +user.user.uid).set({
                        userNick: this.NickName,
                    
                    });

                    firebase.database().ref('online/'+user.user.uid).set({
                        NickName:this.NickName
                    })
                    this.$router.replace('home')
                },
                (err)=>{
                    alert ('oops.' +err.message)
                }
            );
        }
    }
}
</Script>