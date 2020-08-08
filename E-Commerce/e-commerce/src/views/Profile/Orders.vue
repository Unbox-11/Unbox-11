<template>
  <div>
    <profile1>
        <template slot="mainPart">
            <h2><strong>Your Orders</strong></h2>
            <hr>
            <div v-if="isDisplay" class="index" align="center">
                <div v-for="(prod,idx) in product" :key="idx" class="card order" style="max-width:20rem;" align="center">
                    <img class="card-img-top" :src="prod.imageLink" :alt="prod.name">
                    <div class="card-body">
                        <h4 class="card-title">{{prod.name}}</h4>
                        <h5 class="card-text">&#8377; {{prod.price}}</h5>
                        <h5 class="card-text">Quantity: {{orders[idx].quantity}}</h5>
                    </div>
                    <div class="card-footer">
                        <button @click="$router.push({name:'Information', params:{id:ordersindex[idx], prdId:prdIndex[idx]}})" class=" form-control btn btn-secondary">View More</button>
                    </div>
                </div>
            </div>
            <div v-if="Notany" class="emptycart" align="center">
                <img @drag.prevent="false" src="../../assets/Media/cart_empty.jpg" alt="Cart is Empty">
                <h1 class="mt-3">No Orders Yet!</h1>
                <button @click="$router.push({name:'ProductsAll'})" class="btn btn-primary">Order Now</button>
            </div>
        </template>
      </profile1>
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
import firebase from 'firebase'
import db from '../Firebase _Overview/init'
export default {
    name: 'Orders',
    components:{
        profile1:profile,
    },
    data(){
        return{
            orders:[],
            ordersindex:[],
            product:[],
            isDisplay:false,
            Notany:false,
            prdIndex:[],
        }
    },
    created(){
        var vm=this
        firebase.auth().onAuthStateChanged(user =>{
                if(user)
                {
                    this.$parent.loader = true
                    db.collection('user_orders').doc(user.uid).onSnapshot(snapshot =>{
                        var orders = snapshot.data()
                        vm.orders = []
                        vm.product = []
                        var set = $.map( orders, function( value, index ) {
                            value.product.forEach((product, idx) => {
                                vm.prdIndex.push(idx)
                                vm.ordersindex.push(index)
                                vm.orders.push(product)
                                var prod = db.collection('products').doc(product.id).onSnapshot(snapshot=>{
                                    var arr = snapshot.data()
                                    vm.product.push(arr)
                                })
                            });
                        });
                        this.$parent.loader = false
                        if(vm.product.lemgth > 0){
                            vm.isDisplay = true
                            vm.Notany = false
                        }
                        else{
                            vm.Notany = true
                            vm.isDisplay = false
                        }
                    })
                }
        })
    }
}
</script>

<style lang="scss" scoped>
.order img{
    max-width:250px;
    margin:5px auto;
    max-height:250px;
}
.index{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    margin:30px 30px;
}
.order{
    border-radius: 15px;
    box-shadow: 0px 1px 3px 1px rgba(34,41,72,0.3);
    cursor: pointer;
}
.card-img-top{
    margin:0 auto;
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
@media screen and (max-width: 320px) {
    .index{
        display: grid;
        grid-template-columns: 1fr;
        margin:0;
    }
}
@media screen and (max-width: 568px) {
    .index{
        display: grid;
        grid-template-columns: 1fr;
    }
}
@media screen and (min-width: 568px) and (max-width: 968px) {
    .index{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}
@media screen and (max-width:1168px) and (min-width: 968px){
    .index{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}
@media screen and (max-width:1268px) and (min-width: 1168px){
    .index{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
}
</style>