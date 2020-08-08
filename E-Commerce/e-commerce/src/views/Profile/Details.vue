<template>
  <div v-if="isDisplay">
        <profile1>
            <template slot="mainPart">
                <div class="pos-fixed" style="position:fixed;left:0;right:0;z-index:98765432102;">
                    <p v-if="error" id="error" class="alert alert-danger text-center">{{Msg}}</p>
                    <p v-if="success" id="success" class="alert alert-success text-center">{{Msg}}</p>
                </div>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <h3>Personal Information</h3>
                        <hr>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="position:relative;">
                        <button class="btn btn-default cancel" @click="editPersonal('formClass','cancel', 'edit', true, true)" style="display:none">Cancel</button>
                        <button @click="editPersonal('formClass','edit', 'cancel',false)" class="btn btn-default edit">Edit</button>
                    </div>
                </div>
                
                <form @submit.prevent="updateDetails" class="formClass" align="left">
                    <div class="row firstRow">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <label for="firstName">Name</label>
                            <input type="text" id="firstName" name="name" class="form-control" :value="data.name" disabled>
                        </div>
                    </div>
                    <button style="display:none" class="btn btn-success submit" type="submit">Submit</button>
                </form>
                <div class="row"  style="margin-top:50px">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <h3  style="display:table;">Email</h3>
                        <hr>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="position:relative;">
                        <button class="btn btn-default edit changePassword" @click.prevent="popUpwindow">Change Password</button>
                    </div>
                </div>
                <div class="thirdRow" align="left">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <input type="email" id="email" class="form-control" :value="email" disabled>
                    </div>
                </div>
                
                <div class="row"  style="margin-top:50px">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="position:relative;">
                        <h3 style="display:table;">Mobile Number</h3>
                        <hr>
                    </div>
                </div>
                <div class="fourthRow" align="left">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <input type="tel" id="phonenumber" class="form-control" :value="data.mobile_number" disabled>
                    </div>
                </div>
            </template>
        </profile1>
        <div v-if="passwordChangeWindow">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="container modal-content">
                                <div  v-if="reauthenticate" id="reauthenticate">
                                    <br>
                                    <h4 class="modal-title" align="center"><strong>Log in again to Update Password</strong></h4>
                                    <hr>
                                    <div class="modal-body">            
                                        <p class="text-muted">Enter your registered Email and Password</p>
                                        <div class="account-details" align="center">
                                            <form @submit.prevent="reauthenticateuser" class="form-group reauthenticateform">
                                                <div style="margin-top:0px"  align="left">
                                                    <label for="Currentpassword">Email :</label>
                                                    <div class="showPassword" id="Currentpassword">
                                                        <input type="email" name="emailUser" :value="email" class="form-control" >
                                                        <span class="fa fa-envelope field-icon"></span>
                                                    </div>
                                                </div>
                                                <div style="margin-top:10px"  align="left">
                                                    <label for="password">Password :</label>
                                                    <div class="showPassword" id="password">
                                                        <input type="password" name="userPass" class="form-control" >
                                                        <span toggle="#password-field"  @click="togglePass"  class="fa fa-fw fa-eye field-icon toggle-password"></span>
                                                    </div>
                                                </div>
                                                <div class="modal-footer mt-5">
                                                    <button type="button" class=" mr-auto btn btn-primary" @click="reauthenticate = false; forgetpass = true">Forget Passowrd</button>
                                                    <button type="button" class="btn btn-secondary" @click="passwordChangeWindow = false;reauthenticate = false; forgetpass = false; changePass = false ">Close</button>
                                                    <button type="submit" class="btn btn-success" name="button" id="continuebtn">Continue</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div  v-if="forgetpass" id="forget">
                                    <br>
                                    <h4 class="modal-title" align="center"><strong>Forget Password?</strong></h4>
                                    <hr>
                                    <div class="modal-body">            
                                        <p class="text-muted">Enter your registered Email. We will send You Passowrd Reset Link</p>
                                        <div class="account-details" align="center">
                                            <form @submit.prevent="forgetpassword" class="form-group forgetPasswordForm">
                                                <div style="margin-top:0px"  align="left">
                                                    <label for="Currentpassword">Email :</label>
                                                    <div class="showPassword" id="Currentpassword">
                                                        <input type="email" name="emailUser" :value="email" class="form-control" >
                                                        <span class="fa fa-envelope field-icon"></span>
                                                    </div>
                                                </div>
                                                <div class="modal-footer mt-5">
                                                    <button type="button" class="btn mr-auto btn-primary" @click="reauthenticate = true; forgetpass = false">Back</button>
                                                    <button type="button" class="btn btn-secondary" @click="passwordChangeWindow = false;reauthenticate = false; forgetpass = false; changePass = false ">Close</button>
                                                    <button type="submit" class="btn btn-success" name="button">Send Link</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="changePass" id="updatepass">
                                    <br>
                                    <h4 class="modal-title" align="center"><strong>Change Passowrd</strong></h4>
                                    <hr>
                                    <div class="modal-body">            
                                        <p class="text-muted">Password Must be more than 6 letters</p>
                                        <div class="account-details" align="center">
                                            <form @submit.prevent="changePassword" class="form-group changepasswrodForm">
                                                <div align="left">
                                                    <label for="newpassword">New Password :</label>
                                                    <div class="showPassword" id="newpassword">
                                                        <input type="password" name="newpass" value=" " class="form-control" oncopy="return false" oncut="return false" onpaste="return false" >
                                                        <span toggle="#password-field"  @click="togglePass"  class="fa fa-fw fa-eye field-icon toggle-password"></span>
                                                    </div>
                                                </div>
                                                <div style="margin-top:10px" align="left">
                                                    <label for="confirmpass">Confirm Password :</label>
                                                    <div class="showPassword" id="confirmpass">
                                                        <input type="password" name="confirmnewpass" value=" " class="form-control" oncopy="return false" oncut="return false" onpaste="return false" >
                                                        <span toggle="#password-field" @click="togglePass"  class="fa fa-fw fa-eye field-icon toggle-password"></span>
                                                    </div>
                                                </div>
                                                <div class="modal-footer mt-5">
                                                    <button type="button" class="btn mr-auto btn-secondary" @click="passwordChangeWindow = false;reauthenticate = false; forgetpass = false; changePass = false ">Close</button>
                                                    <button type="submit" class="btn btn-success" name="button">Change Passowrd</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition> 
        </div>

    </div>
</template>
<script
  src="https://code.jquery.com/jquery-3.5.0.js"
  integrity="sha256-r/AaFHrszJtwpe+tHyNi/XCfMxYpbsRg2Uqn0x3s2zc="
  crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js"></script>

  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
          integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
 
<script>
import profile from './Profile'
import db from '../Firebase _Overview/init'
import firebase from 'firebase'
export default {
    name: 'Details',
    components:{
        profile1:profile,
    },
    data(){
        return{
            index : '',
            data:[],
            email:'',
            error:false,
            success:false,
            Msg:'',
            passwordChangeWindow:false,
            forgetpass:false,
            reauthenticate:false,
            changePass:false,
            isDisplay:false,
        }
    },
    methods:{
        editPersonal(element, button, button2, cond, cond1){
            var elementDiv = document.querySelector('.'+ element);
            elementDiv.querySelectorAll('input').forEach(item => {
                item.disabled = cond;
            });
            if(cond1){
                elementDiv['name'].value = this.data.name
            }
            var parentDiv = document.querySelector('.'+button);
            parentDiv.style.display = "none";
            document.querySelector('.'+ button2).style.display = "block";
            if(!cond){
                elementDiv.querySelector('.submit').style.display = 'block';
            }else{
                elementDiv.querySelector('.submit').style.display = 'none'
            }
            
        },
        updateDetails(){
            var elementDiv = document.querySelector('.formClass');
            var name = elementDiv['name'].value
            var vm = this
            db.collection('users').doc(this.index).update({
                name:name,
            }).catch(function (error) {
                vm.error = true
                vm.Msg = error.message
                setTimeout(() => {
                    vm.error = false
                }, 2000);
            }).then(() =>{
                vm.editPersonal('formClass','cancel', 'edit', true, false)
                vm.success = true
                vm.Msg = 'Successfully Updated!'
                setTimeout(() => {
                    vm.success = false
                }, 2000);
            })
        },
        popUpwindow(){
            this.passwordChangeWindow = true
            this.reauthenticate = true
        },
        reauthenticateuser(){
            const reauthenticateform = document.querySelector('.reauthenticateform');
            var email = reauthenticateform['emailUser'].value;
            var password = reauthenticateform['userPass'].value;
            var credential = firebase.auth.EmailAuthProvider.credential(email, password);
            const user = firebase.auth().currentUser;
            var vm = this
            user.reauthenticateWithCredential(credential).then(function() {
                vm.reauthenticate = false
                vm.changePass = true
            }).catch(function(error) {
                vm.error = true
                vm.Msg = error.message
                setTimeout(() => {
                    vm.error = false
                }, 4000);
            });
        },
        forgetpassword(){
            var vm = this
            const form = document.querySelector('.forgetPasswordForm');
            var resetEmail = form["emailUser"].value;
            if (resetEmail != '') {
                firebase.auth().sendPasswordResetEmail(resetEmail).then(function() {
                    vm.forgetpass = false
                    vm.reauthenticate = true
                    vm.success = true
                    vm.Msg = 'Password Link Is SuccessFully Sent On Given Mail.'
                    setTimeout(() => {
                        vm.success = false
                    }, 4000);
                }).catch(function(error) {
                    vm.forgetpass = false
                    vm.reauthenticate = true
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
        changePassword(){
            const updatePass = document.querySelector('.changepasswrodForm');
            var newPass = updatePass['newpass'].value;
            var confirmpass = updatePass['confirmnewpass'].value;
            var vm = this
            if (newPass.length < 6) {
                this.error = true
                this.Msg = 'Password Must be more than 6 letters'
                setTimeout(() => {
                    vm.error = false
                }, 4000);
            }else if (newPass != confirmpass) {
                this.error = true
                this.Msg = 'Passwords Do Not Match'
                setTimeout(() => {
                    vm.error = false
                }, 4000);
            }else{
                const user = firebase.auth().currentUser;
                user.updatePassword(confirmpass).then(function() {
                    vm.success = true
                    vm.Msg = 'Password Link Is SuccessFully Sent On Given Mail.'
                    setTimeout(() => {
                        vm.success = false
                    }, 4000);
                    vm.passwordChangeWindow = false
                    vm.forgetpass = false
                    vm.reauthenticate = false
                    vm.changePass = false
                }).catch(function(error) {
                    vm.error = true
                    vm.Msg = error.message
                    setTimeout(() => {
                        vm.error = false
                    }, 4000);
                });
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
    created(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                this.index = user.uid
                this.email = user.email
                db.collection('users').doc(this.index).onSnapshot(snapshot =>{
                    var data = snapshot.data()
                    this.data = data;
                })
                this.$parent.loader = false
                this.isDisplay = true
            }
        })

    }
}
</script>

<style lang="scss" scoped>
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
.showPassword{
  position: relative;
}
.field-icon{
  position:absolute;
  top:0;
  right:5px;
  bottom:0;
  color:rgba(0,0,0,0.5);
  padding-top:10px;
  cursor: pointer;
}
.modal-mask {
  position: fixed;
  z-index: 98765432101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.formClass input:focus{
    box-shadow: none;
}

label{
    font-size:18px;
    font-weight: 800;
    margin-top:5px;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
}
.secondRow label{
    margin-left:8px;
    font-size:20px;
    margin-top: -10px;
    cursor: pointer;
}
.formClass p{
    font-size:18px;
    font-weight: 800;
    margin-top:15px;
}
input:disabled {
    cursor: not-allowed;
    color:#878787;
}
input:disabled ~ label {
    cursor: not-allowed;
    color:#878787;
}
.submit{
    margin-top:15px;
    font-size: 18px;
    font-weight: 800;
}
.edit, .cancel{
    border: #17233763 2px solid;
    border-radius: 10px;
    color:#172337;
    padding:auto auto;
    font-weight: bold;
    letter-spacing: 2px;
    position:absolute;
    right:20px;
}
.edit:focus, .cancel:focus{
    box-shadow: none;
}
.edit:hover, .cancel:hover{
    box-shadow: 0px 0px 3px 1px rgba(34,41,72,0.3);
}
.changePassword{
    right:20px;
}
@media screen and (max-width: 768px) {
    .edit{
        position: relative;
        left:0;
    }
    .cancel{
        position: relative;
        left:0;
    }
    .changePassword{
        position: relative;
        left:0px;
        margin-left:5px;
    }
    
}
@media screen and (max-width: 320px){
    .changePassword{
        position: relative;
        margin-left:0px;
        margin-top:5px;
    }
    .formClass input[type="radio"]{
        margin-left:50px;
        margin-top:-5px;
    }
}
</style>