
<style lang="scss" scoped>
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
.productAddForm{
    margin:120px auto;
}
.productAddForm .row{
    max-width:980px;
}
.productAddForm textarea{
    min-height: 5rem;
    max-height:5rem;
    resize: none;
    overflow-x: hidden;
    overflow-y: auto;
}
.productAddForm .form-control, .productAddForm .btn{
    margin:15px 15px 15px 0;
}
.productAddForm .form-control:focus{
    box-shadow: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.img{
    max-width: 200px;
    max-width:200px;
}
.nav-pills li a{
    color:rgba(0,0,0,0.5);
    text-decoration: none;
    font-size: 20px;
}
.nav-pills li a:hover{
    color: rgba(0,0,0,0.8);
}
.nav-pills li a:focus{
    text-decoration: none;
}
.nav-pills li .active{
    color:#fff;
    background: rgba(0,0,0,0.5);
    padding: 10px;
    font-size: 18px;
}
.nav-pills li{
    margin:0 15px;
}
table{
    margin:10px auto;
    background:whitesmoke;
    font-size: 21px;
    padding: 10px;
    cursor: pointer;
    text-align: left;
}
@media screen and (max-width:568px) {
 
}
</style>

<template>
  <div v-if="isDisplay">
    <div v-if="reauthenticateWindow">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-dialog" role="document">
                        <div class="container modal-content">
                            <div v-if="!isAdmin">
                                <h4 class="modal-title mt-1" align="center"><strong>We are Sorry. But you don't have access to this Page!</strong></h4>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-secondary" @click="$router.go(-1)" name="button">Back</button>
                                </div>
                            </div>
                            <div v-if="reauthenticate" id="reauthenticate">
                                <h4 class="modal-title mt-3 mb-0" align="center"><strong>Log in</strong></h4>
                                <hr>
                                <div class="modal-body">            
                                    <p class="text-muted">Enter your Email and Password</p>
                                    <div class="account-details" align="center">
                                        <form @submit.prevent="reauthenticateuser" class="form-group reauthenticateform">
                                            <div style="margin-top:0px"  align="left">
                                                <label for="Currentpassword">Email :</label>
                                                <div class="showPassword" id="Currentpassword">
                                                    <input type="email" name="emailUser" placeholder="Email" class="form-control" required>
                                                    <span class="fa fa-envelope field-icon"></span>
                                                </div>
                                            </div>
                                            <div style="margin-top:10px"  align="left">
                                                <label for="password">Password :</label>
                                                <div class="showPassword" id="password">
                                                    <input type="password" name="userPass" class="form-control" placeholder="Passowrd" required>
                                                    <span toggle="#password-field"  @click="togglePass"  class="fa fa-fw fa-eye field-icon toggle-password"></span>
                                                </div>
                                            </div>
                                            <div class="modal-footer mt-5">
                                                <button type="submit" class="btn btn-success" name="button" id="continuebtn">Continue</button>
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
    <div v-if="isReauthneticated" class="container productAddForm">
        <div class="jumbotron pt-4" align="center">
            <h1>Welcome Boys!</h1>
            <ul class="nav nav-pills">
                <li><a data-toggle="pill" href="#edit">Orders</a></li>
                <li><a data-toggle="pill" href="#delivered">Delivered Product</a></li>
            </ul>
            <hr>
            <div class="tab-content">
                <div id="edit" class="tab-pane fade">
                    <table class="table table-hover">
                        <thead align="center">
                            <tr>
                                <th style="width:10%">Sr. No.</th>
                                <th scope="col-8">Address</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr @click="goto(product.id)" v-for="(product, index) in products" :key="index">
                                <td align="center">{{index + 1}}.</td>
                                <td>
                                    {{product.data().selectedaddresses.name}} - {{product.data().selectedaddresses.mobile_number}} - 
                                    {{product.data().selectedaddresses.address}}, {{product.data().selectedaddresses.locality}}, 
                                    {{product.data().selectedaddresses.city}}, {{product.data().selectedaddresses.state}} - {{product.data().selectedaddresses.pincode}}
                                </td>
                                <td>{{product.data().status.ordered_on.isDelivered}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="delivered" class="tab-pane fade">
                    <p v-if='success' class="text-success">{{ success }}</p>
                    <p v-if='feedback' class="text-danger">{{ feedback }}</p>
                    <table class="table table-hover">
                        <thead align="center">
                            <tr>
                                <th style="width:10%">Sr. No.</th>
                                <th scope="col-8">Address</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr @click="goto(product.id)" v-for="(product, index) in delivered" :key="index">
                                <td align="center">{{index + 1}}.</td>
                                <td>
                                    {{product.data().selectedaddresses.name}} - {{product.data().selectedaddresses.mobile_number}} - 
                                    {{product.data().selectedaddresses.address}}, {{product.data().selectedaddresses.locality}}, 
                                    {{product.data().selectedaddresses.city}}, {{product.data().selectedaddresses.state}} - {{product.data().selectedaddresses.pincode}}
                                </td>
                                <td>{{product.data().status.ordered_on.isDelivered}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
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
import {db, auth} from '../Firebase _Overview/init'
import firebase from 'firebase'
export default {
    name: 'Admin_Orders',
    components:{
    },
    data(){
        return{
            isDisplay:false,
            reauthenticateWindow:false,
            isAdmin:true,
            reauthenticate:false,
            isReauthneticated:true,
            isDelete:false,
            products:[],
            delivered:[],
            feedback:null,
            success:null,
        }
    },
    methods:{
        togglePass(e){
            e.target.classList.toggle("fa-eye-slash");
            var input = e.target.parentElement.querySelector('input');
            if (input.getAttribute("type") == "password") {
                input.setAttribute("type", "text");
            } else {
                input.setAttribute("type", "password");
            }
        },
        goto(id){
            this.$router.push({name:'AdminOrdersToDeliver', params:{id:id}})
        },
        // reauthenticateuser(){
        //     const reauthenticateform = document.querySelector('.reauthenticateform');
        //     var email = reauthenticateform['emailUser'].value;
        //     var password = reauthenticateform['userPass'].value;
        //     var credential = firebase.auth.EmailAuthProvider.credential(email, password);
        //     const user = firebase.auth.currentUser;
        //     var vm = this
        //     if (email == 'poojapatil7142@gmail.com') {
        //         user.reauthenticateWithCredential(credential).then(function() {
        //             vm.reauthenticateWindow = false
        //             vm.reauthenticate = false
        //             vm.isReauthneticated = true
        //         }).catch(function(error) {
        //             vm.reauthenticate = true
        //             console.log(error)
        //         });
        //     } else {
        //         this.reauthenticate = false
        //         this.isAdmin  = false
        //     }
            
        // },
    },
    mounted(){
        document.documentElement.scrollTop = 0
        auth.onAuthStateChanged(user =>{
           if(user)
           {
                // if (user.email == 'poojapatil7142@gmail.com') {
                //     this.reauthenticate = true
                //     this.isAdmin  = true
                // } else {
                //     this.reauthenticate = false
                //     this.isAdmin  = false
                // }
                var vm=this
                db.collection('admin_orders').where('status.ordered_on.isDelivered', '==', false).orderBy('status.ordered_on.date', 'desc').onSnapshot(snapshot =>{

                    let changes = snapshot.docChanges();
                    changes.forEach(change => {
                        if (change.type == 'added') {
                            vm.products.push(change.doc);
                        }
                        if (change.type == 'removed') {
                            vm.products = vm.products.filter(product => {
                                return product.id != change.doc.id
                            })
                        }
                        if (change.type === 'modified') {
                            vm.products = vm.products.filter(product => {
                                return product.id != change.doc.id
                            })
                            vm.products.push(change.doc);
                        }
                    });

                })
                db.collection('admin_orders').where('status.ordered_on.isDelivered', '==', true).orderBy('status.ordered_on.date', 'desc').onSnapshot(snapshot =>{

                    let changes = snapshot.docChanges();
                    changes.forEach(change => {
                        if (change.type == 'added') {
                            vm.delivered.push(change.doc);
                        }
                        if (change.type == 'removed') {
                            vm.delivered = vm.delivered.filter(product => {
                                return product.id != change.doc.id
                            })
                        }
                        if (change.type === 'modified') {
                            vm.delivered = vm.delivered.filter(product => {
                                return product.id != change.doc.id
                            })
                            vm.delivered.push(change.doc);
                        }
                    });

                })
                this.$parent.loader = false
                vm.isDisplay = true
           }
        })
    }
}
</script>
