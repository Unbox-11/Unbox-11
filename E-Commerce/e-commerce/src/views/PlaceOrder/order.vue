<template>
  <div class="container" id="container">
    <div class="pos-fixed" style="position:fixed;left:0;right:0;z-index:175523;">
      <p v-if="error" id="error" class="alert alert-danger text-center">{{Msg}}</p>
      <p v-if="success" id="success" class="alert alert-success text-center">{{Msg}}</p>
    </div>
    <div class="row">
      <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
        <div class="orders" align="center">
            <div v-if="isDelivery" class="deliveryaddress">
                <h3><strong>Select Delivery Address</strong></h3>
                <hr>
                <form @submit.prevent="submit" action="post" @reset="reset" class="form-group addAdressForm" align="center">
                    <h4><strong>Add New Address</strong></h4>
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                            <input class="form-control" type="text" name="name" placeholder="Name">
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                            <input class="form-control" type="tel" name="mobileNumber" placeholder="Mobile Number">
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                            <input class="form-control" type="number" name="pincode" placeholder="Pincode">
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                            <input class="form-control" type="text" name="locality" placeholder="Locality">
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <textarea  class="form-control" name="address" placeholder="Address" cols="30" rows="4"></textarea>
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
                            <input type="tel" class="form-control" name="mobileNumber1" placeholder="Alternate Number">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success">Save</button>
                    <button type="reset" class="btn btn-secondary">Cancel</button>
                </form>
            
                <div class="index" align="center">
                    <div class="card newAddressCard mb-3" style="max-width: 20rem;">
                        <div class="card-body newAddress">
                            <button @click.prevent="newAddress" class="card-title address btn btn-default"><h4><i class="fa fa-plus"></i><br>Add New Address</h4></button>
                        </div>
                    </div>
                    <div v-for ="(address,index) in addresses" :key="index">
                        <label v-bind:for="index">
                            <div class="card bg-light mb-3" style="max-width: 20rem;">
                                <div class="card-header" align="center">
                                    <h5 class="indigo-text"><strong>{{address.name}}</strong></h5>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">Mobile Number : <strong>{{address.mobile_number}}</strong></h5>
                                    <p class="card-text">{{address.address}}, {{address.locality}}, {{address.city}}, {{address.state}}, {{data.country}} - {{address.pincode}}</p>
                                </div>
                            </div>
                        </label>
                        <input type="radio"  @click="onSelect" name="selected" hidden :value="index" v-bind:id="index">
                    </div>
                </div>
                <div class="placeorder">
                    <button class="float-right btn btn-primary" @click="selectaddress">Continue</button>
                </div>
            </div>



            <div v-if="isOrderSummary" class="orderSummary">
              <h3><strong>Order Summary</strong></h3>
              <hr>
              <div class="row">
                  <div class="col-12 mt-3">
                      <div class="card">
                          <div class="card-horizontal">
                            <div class="row">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" align="center">
                                <router-link :to="{name:'Product',params:{id:product.id}}">
                                  <img class="card-img" :src="product.data().imageLink" alt="Card image">
                                </router-link>
                              </div>
                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12"  align="center">
                                <div class="card-body" align="center">
                                  <div align="left">
                                    <router-link :to="{name:'Product',params:{id:product.id}}">
                                      <h4 class="card-title">{{product.data().name}}</h4>
                                    </router-link>
                                    <p class="card-text">
                                        <strong style="font-size:1.6em;">&#8377; {{product.data().price}}</strong>
                                        <span class="text-muted ml-2" style="text-decoration-line: line-through;">&#8377; {{parseInt(product.data().price) + parseInt(product.data().price/2)}}</span>
                                        <span class="ml-5" style="font-size:1.1em;"> Delivery in 4 hours</span></p>
                                    <!-- <div class="input-group">
                                      <input type="button" @click="decrementValue(product.data().price, $event, 0)" value="-" class="button-minus" data-field="quantity">
                                      <input type="number" step="1" min="1" :value="quantity" name="quantity" class="quantity-field">
                                      <input type="button" @click="incrementValue(product.data().price, $event, 0)" value="+" class="button-plus" data-field="quantity">
                                    </div> -->
                                    <h6 class="card-text">
                                      Size:  <strong style="font-size:1.1em;" class="mr-3">{{size}}</strong>
                                      Shape:  <strong style="font-size:1.1em;" class="mr-3">{{shape}}</strong>
                                      Quantity: <strong style="font-size:1.1em;" class="mr-3">{{quantity}}</strong>
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>
                </div>
                <div class="placeorder">
                    <button class="float-left btn btn-secondary" @click="back('orderSummary')">Back</button>
                    <button class="float-right btn btn-primary" @click="orderSummary">Continue</button>
                </div>
            </div>



            <div v-if="isPayment" class="paymentOptions">
                <h3><strong>Payment Options</strong></h3>
                <hr>

                <div class="form-check">
                  <input class="form-check-input" type="radio" name="paymentOptions" id="cardPayment" value="Card">
                  <label class="form-check-label" for="cardPayment">
                   Card/UPI Payment
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="paymentOptions" id="CashOnDelivery" value="CashOnDelivery">
                  <label class="form-check-label" for="CashOnDelivery">
                    Cash On Delivery
                  </label>
                </div>

                <div class="placeorder">
                    <button class="float-left btn btn-secondary" @click="back('paymentOptions')">Back</button>
                    <button class="float-right btn btn-primary" @click="checkout">Check Out</button>
                </div>
            </div>
          
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
        <div class="amount" align="center">
          <h3><strong>Price Details</strong></h3>
          <hr>
          <div class="row">
            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
              <p class="float-left">Price ({{quantity}})</p>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <p class="float-right" style="font-weight:900">₹{{total}}</p>
            </div>
            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
              <p class="float-left">Delivery Fee</p>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <p class="float-right text-success" style="font-weight:900">Free</p>
            </div>
          </div>
          <hr style="border-style:dashed; margin-top:0px;">
          <div class="row">
            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
              <p class="float-left" style="font-weight:900">Total Amount: </p>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <p class="float-right" style="font-weight:900">₹{{total}}</p>
            </div>
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
import firebase from 'firebase'
import db from '../Firebase _Overview/init'
import cities from '../Profile/cities'
export default {
    name: 'Checkout',
    components:{
    },
    data(){
        return{
          data:[],
          index:'',
          product:null,
          total:0,
          addresses:[],
          selectedAddress:'',
          quantity:null,
          size:null,
          shape:null,
          payment:'',
          isOrderSummary : false,
          isPayment : false,
          isDelivery : true,
          statestoShow:[],
          currentcities:[],
          stateSelectedAlready:null,
          error:false,
          success:false,
          Msg:'',
        }
    },
    methods:{
        submit(){
          var addressForm = document.querySelector('.addAdressForm')
          var name = addressForm['name'].value
          var mobileNumber = addressForm['mobileNumber'].value
          var pincode = addressForm['pincode'].value
          function validate(a){
              return /^(\d{4}|\d{6})$/.test(a);
          }
          if (!(validate(pincode))) {
            vm.error = true
            vm.Msg = 'Pincode Not Valid!'
            setTimeout(() => {
                vm.error = false
            }, 4000);
            return false
          }
          var locality = addressForm['locality'].value
          var address = addressForm['address'].value
          var state = addressForm['state'].value
          state = this.statestoShow[state]
          var city = addressForm['city'].value
          var mobileNumber1 = addressForm['mobileNumber1'].value
          if (!(mobileNumber1)) {
                firebase.auth().onAuthStateChanged(user=>{
                    if(user){
                        mobileNumber1 = user.phoneNumber
                    }
                })
            }
          var finalAddress ={'name': name, 'mobile_number':mobileNumber, 'alternate_Number':mobileNumber1, 'address':address, 'locality':locality, 'city':city, 'state':state, 'pincode':pincode}
          this.addresses.push(finalAddress)
          var vm = this
          firebase.auth().onAuthStateChanged(user =>{
            if(user){
                   db.collection('users').doc(user.uid).update({
                      addresses:vm.addresses,
                  }).then(() =>{
                      vm.success = true
                      document.querySelector('.addAdressForm').style.display = "none";
                      vm.Msg = 'SuccessFully Done'
                      setTimeout(() => {
                          vm.success = false
                      }, 4000);
                  }).catch(function (error) {
                      vm.error = true
                      vm.Msg = error.message
                      setTimeout(() => {
                          vm.error = false
                      }, 4000);
                  })
            }
          })
         
        },
        reset(){
            document.querySelector('.addAdressForm').style.display = "none";
        },
        newAddress(){
            document.querySelector('.addAdressForm').style.display = "block";
        },
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
        selectaddress(){
            document.querySelectorAll('.index input[name= selected]').forEach(element => {
              if(element.checked){
                this.selectedAddress = this.addresses[element.value];
              }
            })
            if (this.selectedAddress != null){
                this.isDelivery = false;
                this.isOrderSummary =  true;
            }
            $("html, body").animate( 
                { scrollTop: "0" }, 500); 
        },
        onSelect(e){
          document.querySelectorAll('.index input').forEach(element => {
            if(element.checked){
              element.parentElement.querySelector('label').classList.add('active')
            }else{
               element.parentElement.querySelector('label').classList.remove('active')
            }
          })
        },
        back(element){  
          if (element === 'orderSummary') {
            this.isOrderSummary =  false;
            this.isDelivery = true;

          }else if (element === 'paymentOptions') {
            this.isPayment = false;
            this.isOrderSummary =  true;
          }
        },
        orderSummary(){
          $("html, body").animate( 
                { scrollTop: "0" }, 500); 
          this.isOrderSummary =  false;
          this.isPayment = true;
        },
        checkout(){
          document.querySelectorAll('input[name= paymentOptions]').forEach(element => {
            if(element.checked){
              this.payment = element.value;
            }
          })
          if (this.payment) {
            var vm =this
            firebase.auth().onAuthStateChanged(user =>{
              if(user){
                  db.collection('user_orders').doc(user.uid).collection('userorder').add({
                    status:{delivered_on:null, ordered_on:{date:new Date(), isDelivered:false}},
                    product:[{id:this.index, quantity:this.quantity, size:this.quantity, shape:this.shape}],
                    selectedaddresses:this.selectedAddress,
                    payment: this.payment,
                  }).then(result=>{
                    var prodid = vm.index + vm.size + vm.shape;
                    db.collection('Cart').doc(user.uid).update({
                      [prodid]:firebase.firestore.FieldValue.delete()
                    }).then(()=>{
                      db.collection('admin_orders').add({
                          status:{delivered_on:null, ordered_on:{date:new Date(), isDelivered:false}},
                          product:[{id:this.index, quantity:this.quantity, size:this.quantity, shape:this.shape}],
                          selectedaddresses:this.selectedAddress,
                          payment: this.payment,
                          useruid: user.uid,
                          productId:result.id,
                      }).then(() =>{
                        this.$router.push({name:'Orders'})
                      })
                    })
                  })
              }
            })
          }
        },
    },
    mounted(){
        document.documentElement.scrollTop = 0
        this.index = this.$route.params.id
        this.quantity = this.$route.params.quantity
        this.size = this.$route.params.size
        this.shape = this.$route.params.shape
        var vm =this
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
              this.$parent.loader = true
                  db.collection('users').doc(user.uid).onSnapshot(snapshot=>{
                    vm.data = snapshot.data()
                    vm.addresses = snapshot.data().addresses
                  })
                  db.collection('products').doc(this.index).get().then(data => {
                    var data = data;
                    vm.product = data;
                    vm.total = vm.quantity * data.data().price
                    this.$parent.loader = false
                  })
            }
        })

        this.statestoShow = cities.state_arr
        var city_arr = cities.s_a[1].split("|");
        this.currentcities = city_arr

        var upward = document.querySelector(".upward");
        window.onscroll = function (){
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            upward.style.display = "block";
        } else {
          upward.style.display = "none";
        }
        if(window.outerWidth < 768){
          if(document.documentElement.scrollTop > document.querySelector('#container').offsetHeight - $(window).height()/2){
            var newcss = {
              'position': 'absolute',
            }
            $('.placeorder').css(newcss);
            upward.style.bottom = '30px'
          }else{
            var newcss = {
              'position': 'fixed',
            }
            $('.placeorder').css(newcss);
            upward.style.bottom = '100px'
          }
        }
        
      }

        
    },
    updated(){
      for (let index = 0; index < this.addresses.length; index++) {
        if (this.addresses[index] == this.selectedAddress) {
          document.querySelectorAll('.index input').forEach(element => {
            if(this.addresses[element.value] == this.selectedAddress){
              element.parentElement.querySelector('label').classList.add('active')
            }else{
               element.parentElement.querySelector('label').classList.remove('active')
            }
          })
        }
      }
    }
}
</script>


<style lang="scss" scoped>
#container{
    width:100%;
    margin-top:120px;
    margin-bottom:30px;
    line-height: 1.4;
}
.orders{
  position: relative;
  border:1px solid #ccc;
  background: rgba(248,248,248);
  box-shadow: 0px 1px 3px 1px rgba(34,41,72,0.1);
  border-radius: 15px;
  overflow: hidden;
  padding:20px;
  padding-bottom:100px;
}
.placeorder{
  position: absolute;
  left:0;
  right:0;
  bottom:0;
  background: rgba(248,248,255);
  border-top:1px solid #ccc;
  box-shadow: 0px 1px 3px 1px rgba(34,41,72,0.1);
  z-index:1257;
  padding:15px;
}
.amount{
  position: relative;
  border:1px solid #ccc;
  background: rgba(248,248,248);
  box-shadow: 0px 1px 3px 1px rgba(34,41,72,0.1);
  border-radius: 15px;
  overflow: hidden;
  padding:20px;
  margin:10px auto;
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

.addAdressForm{
    max-width: 1000px;
    padding: 20px;
    padding-top: 50px;
    background: rgba(143, 197, 255, 0.1);
    border:0.5px solid black;
    border-radius: 15px;
    margin: 0 auto;
    display: none;
    animation-duration: 1s;
    animation-fill-mode: both;
    -webkit-animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    opacity: 0;
    animation-name: fadeInDown;
    -webkit-animation-name: fadeInDown;
    z-index: 123456;
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
.addAdressForm .row{
    margin: 0 auto;
}
.addAdressForm textarea{
    min-height: 5rem;
    max-height:5rem;
    resize: none;
    overflow-x: hidden;
    overflow-y: auto;
}
.addAdressForm .form-control, .addAdressForm .btn{
    margin:15px;
}
.addAdressForm .form-control:focus, .addAdressForm button:focus{
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
  grid-template-columns: 1fr 1fr;
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
    cursor: pointer;
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
.card-footer{
    padding:auto auto;
}
input[type="radio"]{
    margin-right:15px;
    width:15px;
    height: 15px;
}
.active{
  zoom:102%;
}
.active .card-header{
  background: rgb(80, 177, 80);
  color:white;
}
.active .card-body{
  background: rgba(214, 241, 172, 0.562);
  font-weight: 900;
}

.orderSummary .card{
  border-radius: 15px;
}
.orderSummary .card-link{
  color:black;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
}
.orderSummary .card-link:hover{
  color:black;
  text-decoration: none;
}
.orderSummary .card-horizontal {
    width:100%;
    display: flex;
    flex: 1 1 auto;
    text-align: left;
    cursor: pointer;
    background-color: #ecedef;
    border-radius: 15px;
}
.orderSummary .card-img{
  max-width:250px;
  max-height:250px;
  border-radius: 15px;
  margin: 15px;
}
.orderSummary .card-body{
  margin:auto 15px;
  padding: 50% auto;
}
.orderSummary .card-title{
  color:#141414;
  text-decoration: none;
}
.orderSummary a:focus{
  text-decoration: none;
}
.orderSummary a:hover{
  text-decoration: none;
}
.orderSummary input{
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  margin: 0;
  outline: none;
  padding: 10px;
}

.orderSummary input[type="button"] {
  -webkit-appearance: button;
  cursor: pointer;
}

.orderSummary .input-group {
  clear: both;
  margin: 15px 0;
  position: relative;
}

.orderSummary .input-group input[type='button'] {
  background-color: #ccc;
  min-width: 38px;
  width: auto;
  transition: all 300ms ease;
}

.orderSummary .input-group .button-minus,
.orderSummary .input-group .button-plus {
  font-size: 1.1em;
  font-weight: bold;
  height: 38px;
  padding: 0;
  width: 38px;
  position: relative;
}

.orderSummary .input-group .quantity-field {
  position: relative;
  height: 38px;
  left: -6px;
  text-align: center;
  width: 62px;
  display: inline-block;
  margin: 0 0 5px;
  resize: vertical;
  font-size: 1.1em;
}

.orderSummary .button-plus {
  left: -13px; 
  border-radius: 0px 10px 10px 0;
}
.orderSummary .button-minus {
  border-radius: 10px 0px 0px 10px;
}
.orderSummary input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: none;
}
.paymentOptions .form-check{
    margin:15px 0;
    cursor: pointer;
    font-size: 1.2em;
}
.paymentOptions label{
    cursor: pointer;
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
@media screen and (max-width: 668px) {
    #container{
      margin-top:150px;
    }
}
@media screen and (max-width:1168px) and (min-width: 968px){
    .index{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}
@media screen and (max-width: 768px) {
  .placeorder{
  position: fixed;
}
}
</style>