<style lang="scss" scoped>
.products{
    width:100%;
    height: 100%;
    min-height: 100vh;
    padding-top:100px;
    padding-bottom:50px;
    position:relative;
    background:#f1f3f6;
}
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
    margin:10px auto;
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
@media screen and (max-width: 668px) {
    .products{
        padding-top:150px;
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
<template>
    <div class="products">
        <div class="container" align="center">
            <h2><strong>All Products</strong></h2>
            <hr>
            <div class="index" align="center">
                <div v-for="(product,index) in products" :key="index" @click="goto(product.id)" class="card order" style="max-width:20rem;" align="center">
                    <img class="card-img-top" :src="product.data().imageLink" :alt="product.data().name">
                    <div class="card-body">
                        <h4 class="card-title">{{product.data().name}}</h4>
                        <h5 class="card-text"><strong>&#8377; {{product.data().price}}</strong></h5>
                        <h5 class="card-text text-muted" style="text-decoration:line-through">&#8377; {{parseInt(product.data().price) + parseInt(product.data().price/2)}}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../Firebase _Overview/init'
export default {
    name: 'ProductsAll',
    components:{

    },
    data(){
        return{
            products:[],
        }
    },
    methods:{
        goto(index){
            this.$router.push({name:'Product',params:{id:index}})
        }
    },
    created(){
        document.documentElement.scrollTop = 0
        var vm=this
        db.collection('products').orderBy('name').onSnapshot(snapshot =>{

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
    }
}
</script>

