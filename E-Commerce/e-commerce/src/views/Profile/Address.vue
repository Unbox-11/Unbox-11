<template>
  <div v-if="isDisplay">
    <profile1>
        <template slot="mainPart">
            <div class="pos-fixed" style="position:fixed;left:0;right:0;z-index:98765432102;">
                <p v-if="error" id="error" class="alert alert-danger text-center">{{Msg}}</p>
                <p v-if="success" id="success" class="alert alert-success text-center">{{Msg}}</p>
            </div>
            <form v-if="isShow" @submit.prevent="submit" @reset="isShow = false" class="form-group addAdressForm" align="center">
                <h4><strong>Add New Address</strong></h4>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <input class="form-control" type="text" name="name" placeholder="Name" required>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <input class="form-control" type="tel" name="mobileNumber" placeholder="Mobile Number" required>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <input class="form-control" type="number" name="pincode" placeholder="Pincode" required>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <input class="form-control" type="text" name="locality" placeholder="Locality(Optional)">
                    </div>
                    <div class="col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <textarea  class="form-control" name="address" placeholder="Address"  cols="30" rows="4" required></textarea>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <select class="form-control" @change.prevent="stateSelected" name="state" required>
                            <option v-for="(state, index) in statestoShow" :key="index" :value="index">{{state}}</option>
                        </select>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <select class="form-control" name="city" required>
                            <option v-for="(city, index) in currentcities" :key="index" :value="city">{{city}}</option>
                        </select>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <input type="tel" class="form-control" name="mobileNumber1" placeholder="Alternate Number(Optional)" >
                    </div>
                </div>
                <button type="submit" class="btn btn-success">Save</button>
                <button type="reset" class="btn btn-secondary">Cancel</button>
            </form>
            <form v-if="isEdit" @submit.prevent="update" @reset="isEdit = false" class="form-group editAdressForm" align="center">
                <h4><strong>Edit Address</strong></h4>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <input class="form-control" type="text" name="name" :value="addresses[id].name" placeholder="Name" required>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <input class="form-control" type="tel" name="mobileNumber" :value="addresses[id].mobile_number" placeholder="Mobile Number" required>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <input class="form-control" type="number" name="pincode" :value="addresses[id].pincode" placeholder="Pincode" required>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <input class="form-control" type="text" name="locality" :value="addresses[id].locality" placeholder="Locality(Optional)">
                    </div>
                    <div class="col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <textarea  class="form-control" name="address" placeholder="Address" :value="addresses[id].address" cols="30" rows="4" required></textarea>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <select class="form-control" @change.prevent="stateSelected" name="state" required>
                            <option :value="stateSelectedAlready">{{addresses[id].state}}</option>
                            <option v-for="(state, index) in statestoShow" :key="index" :value="index">{{state}}</option>
                        </select>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <select class="form-control" name="city" required>
                            <option :value="addresses[id].city">{{addresses[id].city}}</option>
                            <option v-for="(city, index) in currentcities" :key="index" :value="city">{{city}}</option>
                        </select>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <input type="tel" class="form-control" :value="addresses[id].alternate_Number" name="mobileNumber1" placeholder="Alternate Number(Optional)" >
                    </div>
                </div>
                <button type="submit" class="btn btn-success">Update</button>
                <button type="reset" class="btn btn-secondary">Cancel</button>
            </form>
            <div class="index" align="center">
                <div class="card newAddressCard mb-3" style="max-width: 20rem;">
                    <div class="card-body newAddress">
                         <button @click.prevent="isShow = true; isEdit= false" class="card-title address btn btn-default"><h4><i class="fa fa-plus"></i><br>Add New Address</h4></button>
                    </div>
                </div>
                <div v-for="(address, index) in addresses" :key="index" class="card bg-light mb-3" style="max-width: 20rem;">
                    <div class="card-header" align="center">
                        <h5 class="indigo-text"><strong>{{address.name}}</strong></h5>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Mobile Number : <strong>{{address.mobile_number}}</strong></h5>
                        <p class="card-text">{{address.address}}, {{address.locality}}, {{address.city}}, {{address.state}}, {{data.country}} - {{address.pincode}}</p>
                    </div>
                    <div class="card-footer ">
                        <a class="float-right" @click="id=index; isEdit= true; isShow= false; isDelete=false; cityselect(index)"><h3><i class="fa fa-pencil"></i></h3></a>
                        <a class="float-left" @click="delId=index; isEdit= false; isShow= false; isDelete=true"><h3><i class="fa fa-trash"></i></h3></a>
                    </div>
                </div>
            </div>
            
        </template>
    </profile1>
    <div v-if="isDelete">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-dialog" role="document">
                        <div class="container modal-content">
                            <br>
                            <h4 class="modal-title" align="center">You are Deleting a address <br><strong>Are You Sure?</strong></h4>
                            <div class="modal-footer">
                                <button type="button" class="btn mr-auto btn-secondary" @click="isDelete = false;reauthenticate = false; forgetpass = false; changePass = false ">Cancel</button>
                                <button type="button" class="btn btn-danger" @click="deleteAdd" name="button" id="continuebtn">Delete</button>
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
import cities from './cities'
import db from '../Firebase _Overview/init'
import firebase from 'firebase'
export default {
    name: 'Address',
    components:{
        profile1:profile,
    },
    data(){
        return{
            isShow:false,
            addresses:[],
            index : '',
            error:false,
            success:false,
            Msg:'',
            id:null,
            isEdit:false,
            isDelete:false,
            delId:null,
            statestoShow:[],
            currentcities:[],
            stateSelectedAlready:null,
            isDisplay:false,
        }
    },
    methods:{
        stateSelected(){
            var idx = parseInt(document.querySelector('select[name="state"]').value) + 1
            var city_arr = cities.s_a[idx].split("|");
            this.currentcities = city_arr
        },
        cityselect(inx){
            var idx = null
            this.statestoShow.forEach((element, index) => {
                if (element == this.addresses[inx].state)
                {
                    this.stateSelectedAlready = index
                    idx = index + 1
                }
            });
            var city_arr = cities.s_a[idx].split("|");
            this.currentcities = city_arr
        },
        submit(){
            var addressForm = document.querySelector('.addAdressForm')
            var name = addressForm['name'].value
            var mobileNumber = addressForm['mobileNumber'].value
            var pincode = addressForm['pincode'].value
            var locality = addressForm['locality'].value
            var address = addressForm['address'].value
            var state = addressForm['state'].value
            state = this.statestoShow[state]
            var city = addressForm['city'].value
            var mobileNumber1 = addressForm['mobileNumber1'].value
            var finalAddress ={'name': name, 'mobile_number':mobileNumber, 'alternate_Number':mobileNumber1, 'address':address, 'locality':locality, 'city':city, 'state':state, 'pincode':pincode}
            this.addresses.push(finalAddress)
            var vm = this
            db.collection('users').doc(this.index).update({
                    addresses:vm.addresses,
            }).catch(function (error) {
                vm.error = true
                vm.Msg = error.message
                setTimeout(() => {
                    vm.error = false
                }, 4000);
            }).then(() =>{
                vm.success = true
                vm.Msg = 'SuccessFully Done'
                setTimeout(() => {
                    vm.success = false
                }, 4000);
                vm.isShow = false
            })
        },
        update(){
            var addressForm = document.querySelector('.editAdressForm')
            var name = addressForm['name'].value
            var mobileNumber = addressForm['mobileNumber'].value
            var pincode = addressForm['pincode'].value
            var locality = addressForm['locality'].value
            var address = addressForm['address'].value
            var state = addressForm['state'].value
            state = this.statestoShow[state]
            var city = addressForm['city'].value
            var mobileNumber1 = addressForm['mobileNumber1'].value
            var finalAddress ={'name': name, 'mobile_number':mobileNumber, 'alternate_Number':mobileNumber1, 'address':address, 'locality':locality, 'city':city, 'state':state, 'pincode':pincode}
            this.addresses[this.id] = finalAddress
            var vm = this
            db.collection('users').doc(this.index).update({
                    addresses:vm.addresses,
            }).catch(function (error) {
                vm.error = true
                vm.Msg = error.message
                setTimeout(() => {
                    vm.error = false
                }, 4000);
            }).then(() =>{
                vm.success = true
                vm.Msg = 'SuccessFully Updated!'
                setTimeout(() => {
                    vm.success = false
                }, 4000);
                vm.isEdit = false
                vm.id = null
            })
        },
        deleteAdd(){
            this.addresses = this.addresses.filter(address => {
                return address != this.addresses[this.delId]
            })
            var vm = this
            db.collection('users').doc(this.index).update({
                    addresses:vm.addresses,
            }).catch(function (error) {
                vm.error = true
                vm.Msg = error.message
                setTimeout(() => {
                    vm.error = false
                }, 4000);
            }).then(() =>{
                vm.success = true
                vm.Msg = 'SuccessFully Deleted!'
                setTimeout(() => {
                    vm.success = false
                }, 4000);
                vm.isDelete = false
                vm.delId = null
            })
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
                    this.addresses = snapshot.data().addresses
                })
                this.$parent.loader = false
                this.isDisplay = true
            }
        })
        this.statestoShow = cities.state_arr
        var city_arr = cities.s_a[0].split("|");
        this.currentcities = city_arr
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

.addAdressForm, .editAdressForm{
    max-width: 1000px;
    padding: 20px;
    padding-top: 50px;
    background: rgba(143, 197, 255, 0.1);
    border:0.5px solid black;
    border-radius: 15px;
    margin: 0 auto;
    animation-duration: 1s;
    animation-fill-mode: both;
    -webkit-animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    opacity: 0;
    animation-name: fadeInDown;
    -webkit-animation-name: fadeInDown;
    z-index: 123456;
}
.editAdressForm{
    background: rgba(0,0,0,0.1);
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
.addAdressForm .row, .editAdressForm .row{
    max-width:980px;
}
.addAdressForm textarea, .editAdressForm textarea{
    min-height: 5rem;
    max-height:5rem;
    resize: none;
    overflow-x: hidden;
    overflow-y: auto;
}
.addAdressForm .form-control, .addAdressForm .btn, .editAdressForm .form-control, .editAdressForm .btn{
    margin:15px 15px 15px 0;
}
.addAdressForm .form-control:focus, .addAdressForm button:focus{
    box-shadow: none;
}
.editAdressForm .form-control:focus, .editAdressForm button:focus{
    box-shadow: none;
}
.address{
    height: 100%;
    border:1px darkblue dashed;
}
.address:focus{
    box-shadow: none;
    background: none;
}
.address:hover{
    box-shadow: 0px 0px 3px 1px rgba(34,41,72,0.3);
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
.index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.index h4{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .card{
    position: relative;
}
.newAddress{
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.newAddressCard{
    background: none;
    border:none;
}
.card-footer a{
    cursor: pointer;
    display:table;
    color:rgba(0,0,0,0.5);
}
.card-footer a:hover{
    color:rgba(0,0,0,0.8);
}
.card-footer{
    padding-bottom:0px;
}
@media screen and (max-width: 768px) {
    .index{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}
@media screen and (max-width: 508px) {
    .index{
        display: grid;
        grid-template-columns: 2fr;
    }
}
@media screen and (max-width:1168px) and (min-width: 968px){
    .index{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}
</style>