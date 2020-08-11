<template>
    <div v-if="isDisplay" class="product">
        <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-5 col-sm-6 col-xs-12">
                <div class="images">
                    <div class="buyproduct">
                        <div class="row">
                            <div class="col-12">
                                <button :disabled="order.status.ordered_on.isDelivered" @click="deliver" class="btn float-left btn-default btn-lg" id="deliver">{{msg}}</button>
                            </div>
                        </div>
                    </div>
                    <h3><strong>{{order.selectedaddresses.name}}</strong></h3>
                    <h4><strong>Mobile Number</strong> - {{order.selectedaddresses.mobile_number}}</h4>
                    <h4><strong>Alternate Number</strong> - {{order.selectedaddresses.alternate_Number}}</h4>
                    <h4><strong>Address</strong> - {{order.selectedaddresses.address}}, {{order.selectedaddresses.locality}}, 
                        {{order.selectedaddresses.city}}, {{order.selectedaddresses.state}} - {{order.selectedaddresses.pincode}}</h4>
                    <h4><strong>Status</strong> :- Ordered On: {{order.status.ordered_on.date.toDate()}} <span v-if="order.status.ordered_on.isDelivered"><br> Delivered On: {{order.status.delivered_on.toDate()}}</span></h4>
                    <h4><strong>Payment</strong> :- {{order.payment}}</h4>
                    <h4><strong>Total</strong> :- &#8377; {{total}}</h4>
                </div>
            </div>
            <div class="col-xl-8 col-lg-8 col-md-7 col-sm-6 col-xs-12">
                <div class="container" align="left" style="z-index:1;">
                    <div class="container-fluid card-link" id="card">
                        <div class="row">
                            <div v-for="(prod,index) in product" :key="index" class="col-12 mt-3">
                                <div class="card">
                                    <div class="card-horizontal">
                                        <div class="row">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" align="center">
                                                <router-link :to="{name:'Product',params:{id:prod.id}}">
                                                    <img class="card-img" :src="prod.data().imageLink" :alt="prod.data().name">
                                                </router-link>
                                            </div>
                                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 information"  align="center">
                                                <div class="card-body" align="center">
                                                    <div align="left">
                                                        <router-link :to="{name:'Product',params:{id:prod.id}}">
                                                            <h4 style="display:table" class="card-title">{{prod.data().name}}</h4>
                                                        </router-link>
                                                        <p class="card-text">
                                                            <strong style="font-size:1.1em;">&#8377; {{prod.data().price}}</strong>
                                                        </p>
                                                        <h6 class="card-text">
                                                            Size:  <strong style="font-size:1.1em;" class="mr-3">{{order.product[index].size}}</strong>
                                                            Shape:  <strong style="font-size:1.1em;" class="mr-3">{{order.product[index].shape}}</strong>
                                                            Quantity: <strong style="font-size:1.1em;" class="mr-3">{{order.product[index].quantity}}</strong>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
export default {
    name: 'AdminOrders',
    components:{

    },
    data(){
        return{
            index:null,
            product:[],
            order:[],
            prodQuantity:[],
            isDisplay:false,
            total:null,
            msg:null,
        }
    },
    methods:{
        deliver(){
            var vm = this;
            firebase.auth().onAuthStateChanged(user =>{
                if(user)
                {
                    db.collection('admin_orders').doc(this.index).update({
                        'status.ordered_on.isDelivered':true,
                        'status.delivered_on': new Date()
                    }).then(()=>{
                        db.collection('user_orders').doc(user.uid).collection('userorder').doc(vm.order.productId).update({
                            'status.ordered_on.isDelivered':true,
                            'status.delivered_on': new Date()
                        }).then(()=>{
                            this.$router.push({name:'AdminOrders'})
                        })
                    })
                }
            })
        },
    },
    created(){
        $("html, body").animate( 
            { scrollTop: "0" }, 100); 
        this.index = this.$route.params.id
        var vm=this
        firebase.auth().onAuthStateChanged(user =>{
                if(user)
                {
                    db.collection('admin_orders').doc(this.index).onSnapshot(snapshot =>{
                        var orders = snapshot.data()
                        vm.order = orders
                        vm.product = []
                        snapshot.data().product.forEach(product => {
                            vm.prodQuantity.push(product)
                            db.collection('products').doc(product.id).get().then(data => {
                                vm.product.push(data)
                                vm.total += data.data().price * product.quantity
                            })  
                        });
                        if (snapshot.data().status.ordered_on.isDelivered) {
                            vm.msg = "Already Delivered"
                        } else {
                            vm.msg = "Deliver Product"
                        }
                        vm.isDisplay = true
                        this.$parent.loader = false
                    })
                }
        })

        window.resize = function () {
            if (window.innerWidth > 768)
                $('.images').css('position','sticky');
            if (window.innerWidth < 768)
                $('.images').css('position','relative');
            if (indow.outerWidth > 568)
            {
                $('.buyproduct').css('position', 'absolute');
                $('.images').css('padding-bottom','150px')
            }
            else{
                $('.buyproduct').css('position', 'fixed');
                $('.images').css('padding-bottom','15px')
            }
        }
        var upward = document.querySelector(".upward");
        window.onscroll = function (){
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                upward.style.display = "block";
                } else {
                upward.style.display = "none";
                }
        if (window.outerWidth > 768) {
            try{
                if(document.documentElement.scrollTop > document.querySelector('.product').scrollHeight - window.outerHeight/2){
                    var newcss = {
                        'position': 'relative',
                    }
                    $('.images').css(newcss);
                }else{
                    var newcss = {
                        'position': 'sticky',
                    }
                    $('.images').css(newcss);
                }
            }catch(e){
                console.log();
            }
            
        }
        if(window.outerWidth < 568){
            try {
                if(document.documentElement.scrollTop > document.querySelector('.product').scrollHeight - window.outerHeight/2){
                    var newcss = {
                        'position': 'absolute',
                    }
                    $('.buyproduct').css(newcss);
                    $('.images').css('padding-bottom','150px')
                    upward.style.bottom = '30px'
                }else{
                    var newcss = {
                        'position': 'fixed',
                    }
                    $('.buyproduct').css(newcss);
                    $('.images').css('padding-bottom','15px')
                    upward.style.bottom = '100px'
                }
            } catch (error) {
                
            }
          
        }
        
           
      }

    },
}
</script>

<style lang="scss" scoped>
.product{
    width:100%;
    height: 100vh;
    padding: 0 30px;
    padding-top:100px;
    padding-bottom:50px;
    position:relative;
    background:#f1f3f6;
    overflow-y: auto;
    overflow-x:hidden;
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
    padding-bottom: auto;
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
  margin:auto 0;
}
a{
  color:#141414;
  text-decoration: none;
}
a:hover{
  text-decoration: none;
}

.product::-webkit-scrollbar{
    display: none;
}
.images{
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    padding:1%;
    overflow: hidden;
    padding: 10px;
    padding-top:30px;
    border:1px solid white;
    padding:20px;
    margin:15px auto;
    background: white;
    border-radius: 15px;
    box-shadow: 0px 1px 3px 1px rgba(34,41,72,0.3);
    line-height: 1.4;
    padding-bottom: 150px;
}
a{
    color:rgba($color: #000000, $alpha: 1.0);
    text-decoration: none;
}
.product .container{
    padding:30px 30px;
    border:1px solid white;
    margin:15px auto;
    background: white;
    border-radius: 15px;
    box-shadow: 0px 1px 3px 1px rgba(34,41,72,0.3);
    line-height: 1.4;
}
.highlight, .description{
    margin:30px 0;
}
.images .btn-default{
    border: #17233763 2px solid;
    color:#172337;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
    height:100%;
}
.images .btn-default:hover{
    border:white 2px solid;
    background: #17233763;
    color: white;
}
.images button{
    width:100%;
    border-radius: 0;
    font-size: 1em;
    margin:5px;
    position: relative;
    top:0;
    left:0;
    right:0;
    bottom:0;
}
.images button:hover{
    border:white 2px solid;
    color: white;
}
.buyproduct{
  position: absolute;
  left:0;
  right:0;
  bottom:0;
  z-index:12552;
  padding:15px;
  border-top:1px solid #ccc;
  background: rgba(248,248,255);
}

@media screen and (max-width:768px){
    .images{
        position: relative;
    }
    .product{
        width:100%;
        height: 100%;
    }
}
@media screen and (max-width: 568px) {
    
    .buyproduct{
        position: fixed;
        height:80px;
    }
    .images button{
        border-radius: 0;
        font-size: 1em;
        margin:0px;
    }
    .add{
        width:50vw;
        height: 100%;
    }
}
@media screen and (max-width: 668px) {
    .product{
        padding-top:150px;
    }
}
</style>