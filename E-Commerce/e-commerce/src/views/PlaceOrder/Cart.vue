<style lang="scss" scoped>
.container{
    width:100%;
    margin-top:120px;
    margin-bottom:30px;
    line-height: 1.4;
}
.carts{
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
#card{
  margin-bottom: 15px;
}
.card{
  border-radius: 15px;
}
.card-link{
  color:black;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
}
.card-link:hover{
  color:black;
  text-decoration: none;
}
.card-horizontal {
    width:100%;
    display: flex;
    flex: 1 1 auto;
    text-align: left;
    cursor: pointer;
    background-color: #ecedef;
    border-radius: 15px;
    padding-bottom: 30px;
    position: relative;
    overflow: hidden;
}
.card-horizontal:hover{
  box-shadow:0px 0px 5px 1px rgba(34,41,72,0.2);
  color:#141414;
}
.card-img{
  width:150px;
  height:150px;
  border-radius: 15px;
  margin: 15px;
}
.card-body{
  margin:auto 10px;
}
.card-horizontal a{
  position: absolute;
  bottom:0;
  left:0;
  right: 0;
  font-size: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.2);
  height: 35px;
  color: rgba(0,0,0,0.8);
}
.card-horizontal a:hover{
  background: rgba(0,0,0,0.5);
  color: rgba(255,255,255,0.8);
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
.emptycart img{
  max-width: 550px;
  max-height: 400px;
  margin:10px;
  border-radius: 10px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
}
.information{
  display:flex;
  align-items: center;
  justify-content: center;
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
.card-body input{
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  margin: 0;
  outline: none;
  padding: 10px;
}

.card-body input[type="button"] {
  -webkit-appearance: button;
  cursor: pointer;
}

.card-body .input-group {
  clear: both;
  margin: 15px 0;
  position: relative;
}

.card-body .input-group input[type='button'] {
  background-color: #ccc;
  min-width: 38px;
  width: auto;
  transition: all 300ms ease;
}

.card-body .input-group .button-minus,
.card-body .input-group .button-plus {
  font-size: 1.1em;
  font-weight: bold;
  height: 38px;
  padding: 0;
  width: 38px;
  position: relative;
}

.card-body .input-group .quantity-field {
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

.card-body .button-plus {
  left: -13px; 
  border-radius: 0px 10px 10px 0;
}
.card-body .button-minus {
  border-radius: 10px 0px 0px 10px;
}
.card-body input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: none;
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
@media screen and (max-width: 768px) {
    .placeorder{
      position: fixed;
    }
}
@media screen and (max-width: 320px){
    .card-horizontal a{
      font-size:0.8em;
    }
}
</style>

<template>
  <div class="container" id="container">
    <div class="pos-fixed" style="position:fixed;left:0;right:0;z-index:175523;">
      <p v-if="error" id="error" class="alert alert-danger text-center">{{Msg}}</p>
      <p v-if="success" id="success" class="alert alert-success text-center">{{Msg}}</p>
    </div>
    <div v-if="carts.length > 0" class="row">
      <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
        <div class="carts" align="center">
          <h3><strong>My Orders</strong></h3>
          <hr>
          <div class="container-fluid card-link" id="card">
              <div class="row">
                  <div v-for="(prod,index) in cartsProd" :key="index" class="col-12 mt-3">
                      <div class="card">
                          <div class="card-horizontal">
                            <div class="row">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" align="center">
                                <img class="card-img" :src="prod.data().imageLink" :alt="prod.name">
                              </div>
                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 information"  align="center">
                                <div class="card-body" align="center">
                                  <div align="left">
                                    <h4 class="card-title">{{prod.data().name}}</h4>
                                    <p class="card-text">
                                      <strong style="font-size:1.1em;">&#8377; {{prod.data().price}}</strong>
                                      <span class="text-muted ml-3" style="text-decoration-line: line-through;">&#8377; {{parseInt(prod.data().price) + parseInt(prod.data().price/2)}}</span>
                                      <small class="text-muted ml-5"> Delivery in 4 hours</small>
                                    </p>
                                    <div class="input-group">
                                      <input type="button" @click="decrementValue(prod.data().price, $event, index)" value="-" class="button-minus" data-field="quantity">
                                      <input type="number" step="1" min="1" :value="quantity[index]" name="quantity" class="quantity-field">
                                      <input type="button" @click="incrementValue(prod.data().price, $event, index)" value="+" class="button-plus" data-field="quantity">
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <a @click.prevent="removeId = prod.id; isDelete = true">Remove From The Cart</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="placeorder">
             <button class="float-right btn btn-primary">Place Order</button>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
        <div class="amount" align="center">
          <h3><strong>My Orders</strong></h3>
          <hr>
          <div class="row">
            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
              <p class="float-left">Price ({{carts.length}})</p>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <p class="float-right" style="font-weight:900">₹{{cartsPrice.reduce(function(a,b){return a+b})}}</p>
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
              <p class="float-right" style="font-weight:900">₹{{cartsPrice.reduce(function(a,b){return a+b})}}</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    <div v-else class="emptycart" align="center">
      <img @drag.prevent="false" src="../../assets/Media/cart_empty.jpg" alt="Cart is Empty">
      <h1 class="mt-3">No items in the cart Currently! View All Products here</h1>
      <button @click="$router.push({name:'ProductsAll'})" class="btn btn-primary">View Products</button>
    </div>
    <div v-if="isDelete">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-dialog" role="document">
                        <div class="container modal-content">
                            <div id="delete">
                                <h4 class="modal-title mt-3 mb-0" align="center"><strong>Are You Sure?</strong></h4>
                                <hr>
                                <div class="modal-body"  align="center">            
                                    <p class="text-muted">Do you want to remove Product from the cart?</p>
                                    <div class="account-details">
                                        <div class="modal-footer">
                                            <button type="button" @click="isDelete=false;" class="btn mr-auto btn-secondary" name="button" >Close</button>
                                            <button type="button" @click="remove" class="btn ml-auto btn-danger" name="button" id="continuebtn">Delete</button>
                                        </div>
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
import db from '../Firebase _Overview/init'
import firebase from 'firebase'
export default {
    name: 'Orders',
    components:{
    },
    data(){
        return{
          carts:[],
          cartsProd:[],
          cartsPrice:[0],
          total:0,
          index:null,
          quantity:[],
          removeId:null,
          isDelete:false,
          error:false,
          success:false,
          Msg:'',
        }
    },
    methods:{
      remove(){
        var vm = this
        this.carts = this.carts.filter(cart =>{
          return cart != vm.removeId
        })
        this.cartsProd = this.cartsProd.filter(cart =>{
          return cart.id != vm.removeId
        })
        db.collection('users').doc(this.index).update({
          cart:vm.carts
        }).then(()=>{
            vm.removeId = null
            this.isDelete = false
            vm.success = true
            vm.Msg = "Successfully Removed From the Cart!"
            setTimeout(() => {
              vm.success = null
            }, 2000);
        }).catch(error =>{
            vm.error = true
            vm.Msg = "Something Went Wrong!" + error.message
            setTimeout(() => {
              vm.error = null
            }, 2000);
        })
        
      },
      decrementValue(price, e, id) {
          var fieldName = $(e.target).data('field');
          var parent = $(e.target).closest('div');
          var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
          var tempcart = 0
          if (!isNaN(currentVal) && currentVal > 1) {
            parent.find('input[name=' + fieldName + ']').val(currentVal - 1);
            this.$set(this.quantity, id, currentVal - 1)
            tempcart = price * (currentVal - 1)
          } else {
            parent.find('input[name=' + fieldName + ']').val(1);
            this.$set(this.quantity, id, 1)
            tempcart = price * 1
          }
          this.$set(this.cartsPrice, id, tempcart)
      },
      incrementValue(price, e, id) {
          var fieldName = $(e.target).data('field');
          var parent = $(e.target).closest('div');
          var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
          var tempcart = 0
          if (!isNaN(currentVal)) {
            parent.find('input[name=' + fieldName + ']').val(currentVal + 1);
            this.$set(this.quantity, id, currentVal+1)
            tempcart = price * (currentVal + 1)
          } else {
            parent.find('input[name=' + fieldName + ']').val(1);
            this.$set(this.quantity, id, 1)
            tempcart = price * 1
          }
          this.$set(this.cartsPrice, id, tempcart)
      },
    },
    mounted(){
      document.documentElement.scrollTop = 0
      var vm =this
      firebase.auth().onAuthStateChanged(user =>{
          if(user){
              this.index = user.uid
              db.collection('users').doc(this.index).onSnapshot(snapshot =>{
                  var carts = snapshot.data().cart
                  if (carts.length > 0) {
                    vm.carts = carts;
                  }
                  vm.cartsProd = []
                  vm.total = null
                  vm.carts.forEach((pro, idx) => {
                    db.collection('products').doc(pro).get().then(data => {
                      vm.cartsProd.push(data)
                      if (idx == 0) {
                        vm.cartsPrice=[parseInt(data.data().price)]
                      } else {
                        vm.cartsPrice.push(parseInt(data.data().price))
                      }
                      
                      vm.quantity.push(1)
                    })
                  });
              })
          }
      })
      window.onscroll = function (){
          var upward = document.querySelector(".upward");
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
            $('.carts').css('padding-bottom','100px')
            upward.style.bottom = '30px'
          }else{
            var newcss = {
              'position': 'fixed',
            }
            $('.placeorder').css(newcss);
            $('.carts').css('padding-bottom','20px')
            upward.style.bottom = '100px'
          }
        }
        
      }
      
    }
}
</script>
