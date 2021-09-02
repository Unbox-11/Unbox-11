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
                                <button @click="addtocart(1, $event)" class="btn float-left btn-default btn-lg addTocart">Add to Cart</button>
                            </div>
                            <div class="col-xs-6 add col-sm-6 col-xs-6 col-md-6">
                                <router-link @click.native="addtocart(0, $event)" :to="{name:'Order', params:{id:$route.params.id, name:product.name, quantity:quantity, size:sizeSelected, shape:shapeSelected}}">
                                    <button class="btn float-right btn-default btn-lg">Buy Now</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             <div class="col-xl-8 col-lg-8 col-md-7 col-sm-6 col-xs-12">
                <div class="container" align="left" style="z-index:1;">
                    <h3><strong>{{product.name}}</strong></h3>
                    <hr style="margin-top:-7px;">
                    <p class="text-muted">4.23,567 Ratings & 308 Reviews</p>
                    <h3><strong>&#8377; {{product.price}}</strong></h3>
                    <h5 class="text-muted" style="text-decoration:line-through">&#8377; {{parseInt(product.price) + parseInt(product.price/2)}}</h5>
                    
                    <div class="form-group">
                        <label for="">Select Quantity:  </label>
                        <div class="input-group">
                            <input type="button" @click="decrementValue($event)" value="-" class="button-minus" data-field="quantity">
                            <input type="number" step="1" min="1" :value="quantity" name="quantity" class="quantity-field">
                            <input type="button" @click="incrementValue($event)" value="+" class="button-plus" data-field="quantity">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="">Select Size:  </label>
                        <select class="form-control" v-model="sizeSelected" name="size" required>
                            <option v-for="(size, index) in product.size" :key="index" :value="size">{{size}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="">Select Shape:  </label>
                        <select class="form-control" v-model="shapeSelected" name="shape" required>
                            <option v-for="(shape, index) in product.shape" :key="index" :value="shape">{{shape}}</option>
                        </select>
                    </div>
                    <div class="highlight">
                        <h4><strong>Highlights</strong></h4>
                        <hr style="margin-top:-7px;">
                        <ul>
                            <li v-for="(hgl, index) in product.highlight" :key="index"><h6>{{hgl}}</h6></li>
                        </ul>
                    </div>
                    <div class="description">
                        <h4><strong> Description</strong></h4>
                        <hr style="margin-top:-7px;">
                        <h6>
                            {{product.description}}
                        </h6>
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
export default {
    name: 'Product',
    components:{

    },
    data(){
        return{
            index:'',
            product:[],
            cart:[],
            quantity:1,
            sizeSelected:null,
            shapeSelected:null,
            isDisplay:false
        }
    },
    methods:{
        addtocart(n, e){
            var target = e
            var vm = this
            auth.onAuthStateChanged(user =>{
                if(user)
                {
                    db.collection('Cart').doc(user.uid).get().then(snapshot =>{
                        vm.cart={id:vm.index, size:vm.sizeSelected, shape:vm.shapeSelected, quantity:vm.quantity, cancel:false}
                        var docId = this.index+ vm.sizeSelected+ vm.shapeSelected
                        db.collection('Cart').doc(user.uid).update({
                            [docId]:vm.cart,
                        }).then(()=>{
                            target.target.innerText = "Added To Cart"
                            if (n==1) {
                                vm.$router.push({name:"Cart"})
                            }
                        })
                    })
                    
                }
            })
        },
        decrementValue(e) {
            var fieldName = $(e.target).data('field');
            var parent = $(e.target).closest('div');
            var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);

            if (!isNaN(currentVal) && currentVal > 1) {
              this.quantity =  currentVal - 1
            } else {
              this.quantity = 1
            }
        },
        incrementValue(e) {
            var fieldName = $(e.target).data('field');
            var parent = $(e.target).closest('div');
            var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);

            if (!isNaN(currentVal)) {
              this.quantity =  currentVal + 1
            } else {
              this.quantity =  1
            }
        },
    },
    mounted(){
        $("html, body").animate( 
            { scrollTop: "0" }, 100); 
        this.index = this.$route.params.id
        var vm=this
        db.collection('products').doc(this.index).onSnapshot(snapshot =>{
            this.product = snapshot.data()
            this.sizeSelected = snapshot.data().size[0]
            this.shapeSelected = snapshot.data().shape[0]
            this.$parent.loader = false
            this.isDisplay = true
        })
        auth.onAuthStateChanged(user =>{
                if(user)
                {
                    db.collection('Cart').doc(user.uid).onSnapshot(snapshot =>{
                        if (!(snapshot.exists)) {
                            return db.collection('Cart').doc(user.uid).set({})
                        }
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
input{
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  margin: 0;
  outline: none;
  padding: 10px;
}

input[type="button"] {
  -webkit-appearance: button;
  cursor: pointer;
}

.input-group {
  clear: both;
  margin: 15px 0;
  position: relative;
}
label{
    font-size:1em;
    font-weight: 900;
    margin: auto 0;
    margin-right: 15px;
}
.input-group input[type='button'] {
  background-color: #ccc;
  min-width: 38px;
  width: auto;
  transition: all 300ms ease;
}

.input-group .button-minus,
.input-group .button-plus {
  font-size: 1.1em;
  font-weight: bold;
  height: 38px;
  padding: 0;
  width: 38px;
  position: relative;
}

.input-group .quantity-field {
  position: relative;
  height: 38px;
  left: -6px;
  text-align: center;
  font-weight: bold;
  width: 62px;
  display: inline-block;
  margin: 0 0 5px;
  resize: vertical;
  font-size: 1.1em;
}

.button-plus {
  left: -13px; 
  border-radius: 0px 10px 10px 0;
}
.button-minus {
  border-radius: 10px 0px 0px 10px;
}
select{
    max-width: 250px;
}
select:focus{
    box-shadow: none;
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