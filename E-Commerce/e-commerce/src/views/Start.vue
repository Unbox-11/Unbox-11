<template>
<div style="margin-top: 130px;">
  
    <div id="containerThree">
        <carousel-3d :perspective="0" :space="400" :controls-visible="true" :controls-prev-html="'&#10092;'" :controls-next-html="'&#10093;'" 
               :controls-width="30" :controls-height="60" :clickable="false" :width="1000" :autoplay="true" :autoplay-timeout="5000">
            <slide v-for="(slide, i) in offers" :index="i" :key="i">
                <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
                    <img height="100%" :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" :src="slide">
                </template>
            </slide>
        </carousel-3d>
    </div>
    <div class="jumbotron highlightedProducts">
       <div class="row heading" style="position:relative; margin:20px;">
            <h3>Highlighted Products</h3>
            <router-link :to="{name:'ProductsAll'}">
              <button class="btn btn-default">See All</button>
            </router-link>
        </div>
        <hr>
        <div style="position:relative">
          <button @click="sideScroll('left')" class="btn btn-default anglesbtnBack"><i class="fa fa-angle-left"></i></button>
          <button @click="sideScroll('right')" class="btn btn-default anglesbtnForward"><i class="fa fa-angle-right"></i></button>
          
          <ol class="unstyled">
            <li v-for="(product, index) in products" :key="index">
                <div class="yourcourse">
                    <img class="course_img" :src="product.data().imageLink" :alt="product.data().name">
                    <p></p>
                    <h4>{{product.data().name}}</h4>
                    <p class="text-muted"><strong>&#8377; {{product.data().price}}</strong>  <span class="card-text text-muted" style="text-decoration:line-through">&#8377; {{parseInt(product.data().price) + parseInt(product.data().price/2)}}</span></p>
                    <button @click="goto(product.id)" class="btn btn-primary form-control">Buy Now</button>
                </div>
            </li>
          </ol>
        </div>
        
    </div>
    <div class="banner">
      <div align="center">
        <h1>Incredible Offers</h1>
        <h4>Just For You</h4>
      </div>
    </div>
    <div class="brands container" align="center">
      <h1>Brands We Offer</h1>
      <hr>
      <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-3 col-sm-6 col-xs-6 brandLogo">
          <img src="@/assets/Media/infortis/brands/apple.png" alt="">
        </div>
        <div class="col-xl-4 col-lg-4 col-md-3 col-sm-6 col-xs-6 brandLogo">
          <img src="@/assets/Media/infortis/brands/bluelogo.png" alt="">
        </div>
        <div class="col-xl-4 col-lg-4 col-md-3 col-sm-6 col-xs-6 brandLogo">
          <img src="@/assets/Media/infortis/brands/brandisimi.png" alt="">
        </div>
        <div class="col-xl-4 col-lg-4 col-md-3 col-sm-6 col-xs-6 brandLogo">
          <img src="@/assets/Media/infortis/brands/brandlogo.png" alt="">
        </div>
        <div class="col-xl-4 col-lg-4 col-md-3 col-sm-6 col-xs-6 brandLogo">
          <img src="@/assets/Media/infortis/brands/company.png" alt="">
        </div>
        <div class="col-xl-4 col-lg-4 col-md-3 col-sm-6 col-xs-6 brandLogo">
          <img src="@/assets/Media/infortis/brands/soundwave.png" alt="">
        </div>
        <div class="col-xl-4 col-lg-4 col-md-3 col-sm-6 col-xs-6 brandLogo">
          <img src="@/assets/Media/infortis/brands/thebrand.png" alt="">
        </div>
        <div class="col-xl-4 col-lg-4 col-md-3 col-sm-6 col-xs-6 brandLogo">
          <img src="@/assets/Media/infortis/brands/samsung.png" alt="">
        </div>
        <div class="col-xl-4 col-lg-4 col-md-3 col-sm-6 col-xs-6 brandLogo">
          <img src="@/assets/Media/infortis/brands/test-space.png" alt="">
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
import { Carousel3d, Slide } from 'vue-carousel-3d';
import firebase from 'firebase'
import db from './Firebase _Overview/init'
export default {
    name: 'Start',
    components: {
    Carousel3d,
    Slide
  },
  data(){
    return{
      offers:['https://rukminim1.flixcart.com/flap/844/140/image/5bcb52efc21c1d4e.jpg?q=50',
      'https://rukminim1.flixcart.com/flap/844/140/image/5bcb52efc21c1d4e.jpg?q=50',
      'https://rukminim1.flixcart.com/flap/844/140/image/5bcb52efc21c1d4e.jpg?q=50', 
      "https://rukminim1.flixcart.com/flap/844/140/image/5bcb52efc21c1d4e.jpg?q=50", 
      "https://rukminim1.flixcart.com/flap/844/140/image/5bcb52efc21c1d4e.jpg?q=50"],

      products:[],

    }
  },
  methods: {
    sideScroll(direction){
      var element = document.querySelector(".unstyled");
      var maxScroll = element.scrollWidth;
      var scroll = element.scrollLeft;
      if(direction == 'left'){
          $(".unstyled").animate( 
                { scrollLeft: scroll-500 }, 1000); 
      } else {
        $(".unstyled").animate( 
                {  scrollLeft: scroll+500 }, 1000);
      }
    },
    goto(index){
        this.$router.push({name:'Product',params:{id:index}})
    }
  },
  mounted(){
    document.documentElement.scrollTop = 0
    firebase.auth().onAuthStateChanged(user =>{
        if(user)
        {
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
    })
    var element = document.querySelector(".unstyled");
    var anglesbtnBack = document.querySelector(".anglesbtnBack");
    var anglesbtnForward = document.querySelector(".anglesbtnForward");
    var maxScrollLeft = element.scrollWidth - element.clientWidth;
    scrollFunction();
    if (!(element.scrollWidth > element.clientWidth))
    {
      anglesbtnForward.style.display = "none";
    }
    element.onscroll = function() {scrollFunction()};
    function scrollFunction() {
        if (element.scrollLeft < 150) {
          anglesbtnBack.style.display = "none";
          anglesbtnForward.style.display = "block";
        } else{
          anglesbtnBack.style.display = "block";
          if(element.scrollLeft > maxScrollLeft-1)
          {
           anglesbtnForward.style.display = "none";
          }else{
            anglesbtnForward.style.display = "block";
          }
          
        }
    }
  },
}
</script>

<style lang="scss" scoped>
#containerThree{
  background-image: url("../assets/Media/infortis/page-background/city4.jpg");
  background-size: 100% 100%;
  padding:15px 0px;
}
.carousel-3d-container {
  .carousel-3d-slide {
    border-radius: 15px;
    cursor: pointer;
  }
  
}
.highlightedProducts{
    padding-top:5px;
    margin-top:75px ;
}

.heading h3{
    font-weight: 800;
    margin-left:20px;
    margin-top:15px;
}
.heading button{
    border: #17233763 2px solid;
    border-radius: 10px;
    color:#172337;
    height: 45px;
    font-size:18px;
    font-weight: bold;
    letter-spacing: 2px;
    font-family: 'Poppins', sans-serif;
    position:absolute;
    right:10px;
    top:10px;
}
.heading button:hover{
    background: none;
    box-shadow: 0px 0px 3px 1px #17233763;
}
.yourcourse{
  text-align: center;
  margin:10px;
  padding:20px;
  border-radius: 15px;
  border:grey 1px solid;
  background: #fff;
  cursor: pointer;
  position:relative;
  width:100%;
  min-width:250px;
  max-width:328px;
}
.yourcourse:hover{
    box-shadow: 0px 0px 10px 1px rgba(34,41,72,0.2);
}

.yourcourse img{
  width:200px;
  height: 200px;
}

.anglesbtnBack{
  position: absolute;
  top:10px;
  bottom:18px;
  left:0;
  width:100px;
  z-index: 1;
  font-size:50px;
  font-weight:900;
  border:none;
  background:linear-gradient(to left, rgba(255,255,255,0.8) 20%, rgba(255,255,255,1) 80%);
  display: none;
}
.anglesbtnBack:focus{
  box-shadow:none;
}
.anglesbtnForward{
  position: absolute;
  top:10px;
  bottom:18px;
  right:0;
  width:100px;
  z-index: 1;
  font-size:50px;
  font-weight:900;
  border:none;
  background:linear-gradient(to right, rgba(255,255,255,0.8) 20%, rgba(255,255,255,1) 80%);
  display: none;
}
.anglesbtnForward:focus{
  box-shadow:none;
}
.unstyled {
  display: flex;
  justify-content: flex-start;
  position: relative;
  width:100%;
  overflow-x:auto;
}
/* width */
.unstyled::-webkit-scrollbar {
  height:7px;
}

/* Track */
.unstyled::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
.unstyled::-webkit-scrollbar-thumb {
  background: #557A95;
    border-radius: 10px;
}

/* Handle on hover */
.unstyled::-webkit-scrollbar-thumb:hover {
  background: #557A95;
}
.unstyled li{
  display: flex;
  flex: none;
}

.banner{
line-height: 1.7;
font-weight:800;
font-size: 1.1rem;
box-sizing: border-box;
background-size: cover;
background-position: center center;
background-repeat: no-repeat;
background-attachment: fixed;
padding: 4em 0;
position: relative;
background-image:linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url("../assets/Media/infortis/slideshow/d03.jpg");
margin-top:50px;
width:100%;
height:100%;
min-height: 250px;
color:#f1f1f1;
}

.brands{
  margin:50px auto;
  margin-bottom:100px;
}
.brandLogo{
  margin:20px auto;
}



@media screen and (max-width:578px) {
  .heading button{
    position:relative;
    left:auto;
    right:auto;
    bottom:auto;
    margin:0 auto;
}
}
@media screen and (max-width: 780px) {
  .banner{
    background-size:100% 100%;
  }
  .anglesbtnBack{
    width:50px;
    font-size: 25px;
  }
  .anglesbtnForward{
    width:50px;
      font-size: 25px;
  }
}
</style>