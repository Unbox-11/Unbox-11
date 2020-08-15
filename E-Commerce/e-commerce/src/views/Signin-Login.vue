<template>
  <div>
    <section class="main">
        <div class="layer">
            <div class="pos-absolute" style="left:0;right:0;z-index:175523">
                <p v-if="error" id="error" class="alert alert-danger text-center">{{Msg}}</p>
                <p v-if="success" id="success" class="alert alert-success text-center">{{Msg}}</p>
            </div>
            <div class="bottom-grid">
                <div class="logo">
                    <h1><router-link :to="{name:'Start'}"><span><img src="../assets/Media/google.png" alt="unbox"></span> Company</router-link></h1>
                </div>
                <div class="links">
                    <ul class="links-unordered-list">
                        <li class="">
                            <a href="#" v-if="login" @click="signUpPage" class="">Sign in</a>
                            <a href="#" v-if="signin" @click="loginPage" class="">Log in</a>
                        </li>
                        <li class="">
                            <a href="#" class="">About Us</a>
                        </li>
                        <li class="">
                            <a href="#" class="">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="content-w3ls">
                <div class="text-center icon">
                    <span class="fa fa-html5"></span>
                </div>
                <div v-if="login" class="content-bottom">
                    <form action="#" method="post">
                        <div class="field-group">
                            <span class="fa fa-user" aria-hidden="true"></span>
                            <div class="wthree-field">
                                <input name="email" spellcheck="false" id="Loginemail" type="email" :value="loginEmail" placeholder="Username" required>
                            </div>
                        </div>
                        <div class="field-group">
                            <span style="cursor:pointer" @click="togglePass" class="fa fa-eye field-icon toggle-password" aria-hidden="true"></span>
                            <div class="wthree-field">
                                <input name="password" oncopy="return false" oncut="return false" onpaste="return false" id="Loginpassword" :value="loginPassword" type="password" placeholder="Password" required>
                            </div>
                        </div>
                        <div class="wthree-field">
                            <button type="submit" @click.prevent="LogInWithEmail" class="btn">Start Shopping</button>
                            <button type="button" @click.prevent="SignInWithGoogle" class="btn"> <img id="googleImg" src="../assets/Media/google.png" alt="Google"> Log In With Google </button>
                        </div>
                        <ul class="list-login">
                            <li>
                                <a href="#" style="text-decoration:underline" @click.prevent="forgetPassword" class="text-right">Forgot password?</a>
                            </li>
                        </ul>
                        <ul class="list-login-bottom" align="center">
                            <li class="">
                                <a href="#" @click.prevent="signUpPage" class="" style="text-decoration:underline">Don't Have an Account? Sign in</a>
                            </li>
                        </ul>
                    </form>
                </div>
                <div v-if="signin" class="content-bottom">
                    <form action="#" method="post">
                        <div class="field-group">
                            <span class="fa fa-user" aria-hidden="true"></span>
                            <div class="wthree-field">
                                <input name="email" id="SignInemail" type="email" :value="SignInemail" placeholder="Username" required>
                            </div>
                        </div>
                        <div class="field-group">
                            <span style="cursor:pointer" @click="togglePass" class="fa fa-eye field-icon toggle-password" aria-hidden="true"></span>
                            <div class="wthree-field">
                                <input name="password" oncopy="return false" oncut="return false" onpaste="return false" id="SignInpassword" type="password" :value="SignInpassword" placeholder="Password" required>
                            </div>
                        </div>
                        <div class="field-group">
                            <span style="cursor:pointer" @click="togglePass" class="fa fa-eye field-icon toggle-password" aria-hidden="true"></span>
                            <div class="wthree-field">
                                <input id="CheckSignInpassword" oncopy="return false" oncut="return false" onpaste="return false" type="password" :value="SigncheckPassword" placeholder="Confirm Password" required>
                            </div>
                        </div>
                        <div class="wthree-field">
                            <button type="submit" @click.prevent="SignInWithEmail" class="btn">Sign In</button>
                            <button type="button" @click.prevent="SignInWithGoogle" class="btn"> <img id="googleImg" src="../assets/Media/google.png" alt="Google"> Sign In With Google </button>
                        </div>
                        <p></p>
                        <p></p>
                        <ul class="list-login-bottom" align="center">
                            <li class="">
                                <a href="#" @click="loginPage" class="" style="text-decoration:underline">Already A Member? Log In</a>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
            <div class="bottom-grid1">
                <div class="links">
                    <ul class="links-unordered-list">
                        <li class="">
                            <a href="#" class="">About Us</a>
                        </li>
                        <li class="">
                            <a href="#" class="">Privacy Policy</a>
                        </li>
                        <li class="">
                            <a href="#" class="">Terms of Use</a>
                        </li>
                    </ul>
                </div>
                <div class="copyright">
                    <p>©Unbox11</p>
                </div>
            </div>
        </div>
        <div id="passwordreset" class="modal" style="color:black;">
            <div class="container modal-content" align="center">
                <h5 style="font-weight:900;margin-top:-15px;">Forget Password?</h5>
                <div class="row" style="margin-top:15px;">
                <p style="margin-left:15px; font-weight:300;">Please enter your email address and we will send you a link to reset password.</p>
                </div>
                <form @submit.prevent="resetpassword">
                    <div class="form-group" align="left">
                        <input type="email" class="form-control" id="resetEmail" :value="resetEmail" name="resetEmail" 
                            placeholder="Enter Your Registered Email Id Here" aria-describedby="emailHelp">
                        <small class="form-text text-muted float-left">We'll never share your email with anyone else.</small>
                    </div>
                    <div style="text-align: center;">
                        <button type="submit" class="btn btn-outline-secondary form-control" style="margin-top: 20px;">Reset Password <i class="fa fa-arrow-right"></i> </button>
                    </div>
                </form>
            </div>
        </div>
    </section>

  </div>
</template>

<script>
import {db, auth} from './Firebase _Overview/init'
import fireabase from 'firebase'
export default {
    name: 'Login',
    components:{
    },
    data(){
        return{
           loginEmail:'',
           loginPassword:'',
           login:true,
           signin:false ,
           SignInemail:'',
           SignInpassword:'',
           SigncheckPassword:'',
           error:false,
           success:false,
           Msg:'',
           resetEmail:''
        }
    },
    methods:{
        signUpPage()
        {
            if (document.querySelector('input[id=Loginemail]').value != null) {
                this.loginEmail = document.querySelector('input[id=Loginemail]').value 
            }
            this.login = false;
            this.signin = true;
        },
        loginPage(){
            if (document.querySelector('input[id=SignInemail]').value != null) {
                this.SignInemail = document.querySelector('input[id=SignInemail]').value 
            }
            this.signin = false;
            this.login = true;
        },
        SignInWithEmail(){
            this.SignInemail = document.querySelector('input[id=SignInemail]').value
            this.SignInpassword = document.querySelector('input[id=SignInpassword]').value
            this.SigncheckPassword = document.querySelector('input[id=CheckSignInpassword]').value
            var vm = this
            if(this.SignInemail != '' && this.SignInpassword !== '' && this.SigncheckPassword !== '' && this.SignInpassword === this.SigncheckPassword)
            {
                auth.createUserWithEmailAndPassword(this.SignInemail, this.SignInpassword).then(cred =>{
                    return db.collection('users').doc(cred.user.uid).set({
                            country:'India',
                            name:null,
                            addresses:[],
                            mobile_number:null,
                            imagelink:'../assets/Media/dp.png',     
                    }).then(()=>{
                        vm.$router.push({name:'SignUp',params:{id:cred.user.uid}})
                    })
                }).catch(function (error) {
                    var errorCode = error.code;
                    if (errorCode == 'auth/weak-password'){
                        vm.error = true
                        vm.Msg = 'Password too weak! Minimum 6 characters required!'
                        setTimeout(() => {
                            vm.error = false
                        }, 4000);
                        return
                    }
                    else if (errorCode == 'auth/email-already-in-use'){
                        vm.error = true
                        vm.Msg = 'Email Id already in use. Try to Login or try another email id.'
                        setTimeout(() => {
                            vm.error = false
                        }, 4000);
                        return
                    }
                    else{
                        vm.error = true
                        vm.Msg = error.message
                        setTimeout(() => {
                            vm.error = false
                        }, 4000);
                        return
                    }
                });
            }
            else{
                this.error = true
                this.Msg = 'Enter Valid Credentials'
                setTimeout(() => {
                    vm.error = false
                }, 4000);
            }
        },
        SignInWithGoogle(){
            var vm = this
            const base_provider = new fireabase.auth.GoogleAuthProvider();
            auth.signInWithPopup(base_provider).then(function(result) {
                db.collection('users').doc(result.user.uid).get().then(snapshot =>{
                    if(snapshot.exists){
                       vm.$router.push({name:"Start"})
                    }
                    else{
                        return db.collection('users').doc(result.user.uid).set({
                            country:'India',
                            addresses:[],
                            mobile_number:result.user.phoneNumber,
                            name:result.user.displayName,
                            imagelink:result.user.photoURL,
                        }).catch(function (error) {
                            vm.error = true
                            vm.Msg = error.message
                            setTimeout(() => {
                                vm.error = false
                            }, 4000);
                        }).then(()=>{
                            vm.$router.push({name:'SignUp',params:{id:result.user.uid}})
                        });
                    }
                })
            })
        },
        LogInWithEmail(){
            var vm = this
            this.loginEmail = document.querySelector('input[id=Loginemail]').value
            this.loginpassword = document.querySelector('input[id=Loginpassword]').value
            if (this.loginEmail != '' && this.loginpassword != '') {
                auth.signInWithEmailAndPassword(this.loginEmail, this.loginpassword).then(function () {
                    vm.$router.push({name:"Start"})
                }).catch(function (error) {
                    vm.error = true
                    vm.Msg = error.message
                    setTimeout(() => {
                        vm.error = false
                    }, 4000);
                });
            } else {
                this.error = true
                this.Msg = 'Enter Valid Credentials'
                setTimeout(() => {
                    vm.error = false
                }, 4000);
            }
            
        },
        forgetPassword(){
            document.querySelector("#passwordreset").style.display = 'flex'
            document.querySelector("#passwordreset").addEventListener('click', function(){
                document.querySelector("#passwordreset").style.display = 'none'
            })
            document.querySelector("#passwordreset .modal-content").addEventListener('click', (e)=>{
                e.stopPropagation();
            });
        },
        resetpassword(){
            var vm = this
            this.resetEmail = document.querySelector('input[id=resetEmail]').value
            if (this.resetEmail != '') {
                auth.sendPasswordResetEmail(this.resetEmail).then(function() {
                    document.querySelector("#passwordreset").style.display = 'none'
                    vm.success = true
                    vm.Msg = 'Password Link Is SuccessFully Sent On Given Mail.'
                    setTimeout(() => {
                        vm.success = false
                    }, 4000);
                }).catch(function(error) {
                    document.querySelector("#passwordreset").style.display = 'none'
                    vm.error = true
                    vm.Msg = error.message
                    setTimeout(() => {
                        vm.error = false
                    }, 4000);
                });
            }
            else{
                this.error = true
                this.Msg = 'Enter Valid Email Address!'
                setTimeout(() => {
                    vm.error = false
                }, 4000);
            }
        },
        togglePass(e){
            e.target.classList.toggle("fa-eye-slash");
            var input = e.target.parentElement.querySelector('input');
            if (input.getAttribute("type") == "password") {
                input.setAttribute("type", "text");
            } else {
                input.setAttribute("type", "password");
            }
        },
    },
    mounted(){
        this.$parent.loader = false
        document.documentElement.scrollTop = 0
        addEventListener("load", function () {
            setTimeout(hideURLbar, 0);
        }, false);

        function hideURLbar() {
            window.scrollTo(0, 1);
        }
    }
}
</script>

<style lang="scss" scoped>
#passwordreset{
  width: 100%;
  height: 100%;
  padding: 30px;
  margin:0 auto;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.1);
  text-align: center;
  background: rgba(0,0,0,0.4);
  z-index: 175522;
  display: none;
  align-items: center;
  justify-content: center;
}
#passwordreset .modal-content{
  width:100%;
  max-width: 450px;
  height: 400px;
  padding: 50px;
  font-weight: bolder;
  z-index: 1;
  position: relative;
  overflow:hidden;
}
.alert{
    margin: 0 auto;
    max-width: 350px;
    animation-duration: 1s;
    animation-fill-mode: both;
    -webkit-animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    opacity: 0;
    animation-name: fadeInDown;
    -webkit-animation-name: fadeInDown;
}
@keyframes fadeInDown {
    from {
        transform: translate3d(0,-80px,0)
    }

    to {
        transform: translate3d(0,0,0);
        opacity: 1
    }
}

@-webkit-keyframes fadeInDown {
    from {
        transform: translate3d(0,-80px,0)
    }

    to {
        transform: translate3d(0,0,0);
        opacity: 1
    }
}
ol,ul {
    list-style: none;
    margin:0px;
    padding: 0px;
}

blockquote,q {
    quotes: none;
}

blockquote:before,blockquote:after,q:before,q:after {
    content: '';
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
a {
    text-decoration: none;
}
.txt-rt {
    text-align: right;
}

.txt-lt {
    text-align: left;
}
.txt-center {
    text-align: center;
}
.float-rt {
    float: right;
}
.float-lt {
    float: left;
}
.clearfix {
    clear: both;
}
.pos-relative {
    position: relative;
}
.pos-absolute {
    position: absolute;
}
.vertical-base {
    vertical-align: baseline;
}
.vertical-top {
    vertical-align: top;
}
nav.vertical ul li {
    display: block;
}
nav.horizontal ul li {
    display: inline-block;
}
img {
    max-width: 100%;
}
body a:hover {
    text-decoration: none;
}
.clearfix {
    clear: both;
}
.main {
    background: url('../assets/Media/bg.jpg') no-repeat center;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    -ms-background-size: cover;
	position: relative;
    min-height: 100vh;
}
#googleImg{
    width:25px;
    height:25px;
    margin:auto 0;
}
.layer {
    padding: 2em 0;
}
.text-center {
    text-align: center;
}
.content-w3ls {
    max-width: 500px;
    margin: 6em auto;
}
ul.links-unordered-list li a:hover {
    background: rgba(255, 255, 255, 0.05);
    padding: 5px 20px;
    color: #fff;
}
.icon span.fa{
    font-size: 60px;
    color: #eee;
}
.icon{
	margin-bottom:3em;
}
.content-bottom {
    padding: 0em 4em;
    margin: 0 1em;
	position: relative; 
    z-index: 1;
}
.logo h1 a {
    font-size: 25px;
    color: #fff;
    text-transform: capitalize;
    font-weight: 600;
    letter-spacing: 1px;
}
.logo img{
    width:30px;
    height:30px;
}
.content-w3ls ul li {
    display: inline-block;
    margin: 0 10px;
}

li.switch-agileits {
    float: left;
}

ul.list-login li:nth-child(2) {
    float: right;
}
ul.list-login-bottom li:nth-child(2) {
    float: right;
}

.field-group label {
    font-size: 15px;
}

form .field-group {
    overflow: hidden;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    display: flex;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    margin-bottom: 20px;
    padding: 2px 10px 2px 0;
	border-radius: 35px;
	-webkit-border-radius: 35px;
	-moz-border-radius: 35px;
	-ms-border-radius: 35px;
    -o-border-radius: 35px;
    position: relative;
    height: 50px;
}
form .field-group span {
    flex: 1;
    -webkit-box-flex: 1;      
    -moz-box-flex: 1;         
    font-size: 20px;
    -webkit-flex: 1;
    -ms-flex: 1;
    color: #fff;
    background: transparent;
    line-height: 49px;
    text-align: right;
    position: absolute;
    right:20px;
    top:0;
}
/* Change autocomplete styles in WebKit */
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus{
    -webkit-box-shadow: 0 0 0px 1000px rgba(0,0,0,1) inset;
    background: transparent;
    -webkit-text-fill-color: #fff;
}
ul.list-login {
    margin-top: 1.5em;
    margin-bottom: 1em;
}

form .field-group .wthree-field {
    flex: 4 50%;
    -webkit-box-flex:4 50%;
    -moz-box-flex: 4 50%;
    -webkit-flex: 4 50%;
    -ms-flex: 4 50%;
}

.wthree-field button.btn {
    background: #061b3df8;
    border: none;
    color: #fff;
    padding: 11px 15px;
    text-transform: uppercase;
	font-family: 'Mukta', sans-serif;
    font-size: 16px;
	width:100%;
	margin-top:10px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    -o-transition: 0.5s all;
    -ms-transition: 0.5s all;
	border-radius: 35px;
	-webkit-border-radius: 35px;
	-moz-border-radius: 35px;
	-ms-border-radius: 35px;
	-o-border-radius: 35px;
}
.wthree-field button.btn:hover{
    background: #0018;
}
.bottom-grid,.bottom-grid1{
    display: flex;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    justify-content: space-between;
    margin: 0em 10em;
}
ul.links-unordered-list li {
    display: inline-block;
    margin:10px 30px;
}
ul.links-unordered-list li a { 
    font-size: 1.2em;
    color: #ccc;
    font-weight: normal;
    letter-spacing: 1px;
    padding: 0 5px;
    text-transform: capitalize;
}
.wthree-field input {
    padding: 10px 15px;
    font-size: 20px;
    font-weight: 300;
	color:#fff;
    letter-spacing: 1px;
    border: none;
    background: transparent;
	border-radius:35px 0 0 35px;
    position: absolute;
    top:0;
    bottom: 0;
    right:0;
    left:0;
    box-sizing: border-box;
    width: 88%;
    outline: none;
}
::-webkit-input-placeholder {
  color: #ccc;
}
::-moz-placeholder {
  color: #ccc;
}
::-ms-input-placeholder {
  color: #ccc;
}
::-moz-placeholder {
  color: #ccc;
}
label.switch {
    position: relative;
    display: inline-block;
    height: 18px;
    padding-left: 3em;
    cursor: pointer;
    color: #ccc;
    font-weight: 300;
}

li:nth-child(2) a,
label.switch {
    font-size: 15px;
    letter-spacing: 1px;
    font-weight: 300;
    color: #ccc !important;
    text-transform: capitalize;
}
ul.list-login-bottom li:nth-child(1) a,ul.list-login-bottom li:nth-child(2) a {
    font-size: 15px;
    letter-spacing: 2px;
    font-weight: normal;
    text-transform: uppercase;
    color: #fff !important;
}

li:nth-child(2) a,li:nth-child(1) a {
    color: #fff;
}

.copyright p {
    color: #ccc;
    letter-spacing: 1px;
    font-size:1.4em;
    font-weight:700;
    word-spacing: 1px;
    text-transform: capitalize;
}
.copyright p a {
    color: #fff;
}

@media screen and (max-width: 1280px) {
    .content-w3ls {
        margin: 4em auto;
    }
}
@media screen and (max-width: 1080px) {
    .bottom-grid,.bottom-grid1 {
		margin: 0em 5em;
	}
	.icon span.fa {
		font-size: 50px;
	}
}
@media screen and (max-width: 900px) {
   .bottom-grid, .bottom-grid1 {
		margin: 0em 2em;
	}
}
@media screen and (max-width: 800px) {
	.bottom-grid1 {
		flex-direction: column;
		text-align: center;
	}
	.copyright {
		margin-top: 1em;
	}
}
@media screen and (max-width: 768px) {
	.logo h1 a {
		font-size: 22px;
    }
    .logo img{
        width:27px;
        height:27px;
    }
}
@media screen and (max-width: 668px) {
    
    .content-w3ls {
        margin: 3em auto;
    }
	ul.links-unordered-list li a,.copyright p {
		font-size: 15px;
	}
	ul.links-unordered-list li {
		margin-right: 0px;
	}
	ul.list-login {
		margin-bottom: .5em;
	}
	.icon {
		margin-bottom: 2em;
	}
	.icon span.fa {
		font-size: 40px;
	}
	ul.list-login-bottom li:nth-child(1) a, ul.list-login-bottom li:nth-child(2) a {
		font-size: 14px;
	}
}
@media screen and (max-width: 600px) {
    .copyright p {
        color: #fff;
        letter-spacing: 1px;
    }
}
@media screen and (max-width: 568px) {
    .content-bottom {
        padding: 0em 2.5em;
    }
	.content-w3ls {
		margin: 3em auto 2em;
		max-width: 450px;
	}
}

@media screen and (max-width: 480px) {
    .logo h1 a {
		font-size: 20px;
    }
    .logo img{
        width:25px;
        height:25px;
    }
    ul.links-unordered-list li {
        display: inline-block;
        margin:10px 0;
    } 
}

@media screen and (max-width: 415px) {
    .bottom-grid, .bottom-grid1 {
		flex-direction: column;
		text-align: center;
	}
	.logo {
		margin-bottom: 10px;
	}
	form .field-group {
		padding: 0px 10px 0px 0;
	}
	.wthree-field button.btn {
		font-size: 15px;
	}
	ul.list-login-bottom li:nth-child(1) a, ul.list-login-bottom li:nth-child(2) a {
		font-size: 13px;
	}
	.bottom-grid, .bottom-grid1 {
		margin: 0em 1em;
    }
      
}

@media screen and (max-width: 384px) {
    .content-bottom {
		padding: 0em 1em;
	}
	.layer {
		padding: 1em 0;
	}
	label.switch {
		padding-left: 2.5em;
	}
}

@media screen and (max-width: 375px) {
    
}
@media screen and (max-width: 320px) {
   
}

</style>