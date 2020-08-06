<template>
  <div>
    <profile1>
        <template slot="mainPart">
            <h2><strong>Your Orders</strong></h2>
            <hr>
            <div class="index" align="center">
                <div v-for="(order,index) in orders" :key="index" class="card order" style="max-width:20rem;" align="center">
                    <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcStduMiKxMNRTdxPE36OC50fAbTSq6hlNbVBQ&usqp=CAU" alt="">
                    <div class="card-body">
                        <h4 class="card-title">Product Name</h4>
                        <h5 class="card-text">Price $12</h5>
                        <h5 class="card-text">Status</h5>
                    </div>
                </div>
            </div>
        </template>
      </profile1>
  </div>
</template>

<script>
import profile from './Profile'
export default {
    name: 'Orders',
    components:{
        profile1:profile,
    },
    data(){
        return{
            orders:[1,2,3,4,5,6]
        }
    },
}
</script>

<style lang="scss" scoped>
.order img{
    width:150px;
    height: 150px;
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