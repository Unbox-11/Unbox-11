<template>
    <div v-if="isDisplay" class="product">
        <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-5 col-sm-6 col-xs-12" align="center">
                <div class="images">
                    <img :src="product.imageLink" :alt="product.name">
                    <br>
                    <div class="buyproduct">
                        <div class="row">
                            <div class="col-xs-6 add col-sm-6 col-xs-6 col-md-6">
                                <router-link :to="{name:'Product', params:{id:order.product[prdIndex].id}}">
                                    <button class="btn float-left btn-default btn-lg addTocart">Review Product</button>
                                </router-link>
                            </div>
                            <div class="col-xs-6 add col-sm-6 col-xs-6 col-md-6">
                                <router-link :to="{name:'Product', params:{id:order.product[prdIndex].id}}">
                                    <button class="btn float-right btn-default btn-lg">Buy Again</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             <div class="col-xl-8 col-lg-8 col-md-7 col-sm-6 col-xs-12">
                <div class="container" align="left" style="z-index:1;">
                    <router-link :to="{name:'Product',params:{id:order.product[prdIndex].id}}">
                        <h3 style="display:table">{{product.name}}</h3>
                    </router-link>
                    <hr style="margin-top:-7px;">
                    <h3><strong>&#8377; {{product.price}}</strong></h3>
                    <h5 class="text-muted" style="text-decoration:line-through">&#8377; {{parseInt(product.price) + parseInt(product.price/2)}}</h5>
                    <h3>Quantity: {{order.product[prdIndex].quantity}}</h3>
                    <h3>Size: {{order.product[prdIndex].size}}</h3>
                    <h3>Shape: {{order.product[prdIndex].shape}} </h3>
                    <h4>Payment Mode: {{order.payment}}</h4>
                    <h4>Ordered On: {{order.status.ordered_on.date.toDate()}}</h4>
                    <h4 v-if="order.status.ordered_on.isDelivered">Delivered On: {{order.status.delivered_on.toDate()}}</h4>
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
    name: 'Product',
    components:{

    },
    data(){
        return{
            index:null,
            prdIndex:null,
            product:[],
            order:[],
            isDisplay:false
        }
    },
    methods:{

    },
    created(){
        $("html, body").animate( 
            { scrollTop: "0" }, 100); 
        this.index = this.$route.params.id
        this.prdIndex = this.$route.params.prdId
        var vm=this
        firebase.auth().onAuthStateChanged(user =>{
                if(user)
                {
                    db.collection('user_orders').doc(user.uid).collection('userorder').doc(this.index).onSnapshot(snapshot =>{
                        var orders = snapshot.data()
                        vm.order = orders
                        vm.product = []
                        db.collection('products').doc(snapshot.data().product[vm.prdIndex].id).get().then(data => {
                            vm.product = data.data()
                        })   
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
                if(document.documentElement.scrollTop > document.querySelector('.product').offsetHeight - window.outerHeight/2){
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
.images img{
    width:100%;
    height:100%;
    z-index:0;
    max-height:450px;
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