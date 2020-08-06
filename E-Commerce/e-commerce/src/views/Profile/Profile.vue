<template>
<div class="profileContainer">
    <div class="sidebar" id="profileInf">
        <div class="close">
           <h4 @click="sideBarClose()"><i class="fa fa-times-circle"></i></h4>
        </div>
        <div class="sections pic row">
            <img :src="data.imagelink" alt="">
            <p>{{data.name}}</p>
        </div>
        <div class="sections notification">
            <router-link :to="{name:'Notifications'}"><h4><i class="fa fa-bell"></i>  Notifications</h4></router-link>
        </div>
        <div class="sections orders">
            <router-link :to="{name:'Orders'}"><h4><i class="fa fa-shopping-bag"></i>  My Orders</h4></router-link>
        </div>
        <div class="sections account">
            <h4>Account</h4>
            <hr>
            <router-link :to="{name:'Details'}"><h5><i class="fa fa-user"></i>  Details</h5></router-link>
            <router-link :to="{name:'Address'}"><h5><i class="fa fa-address-card"></i>  Address</h5></router-link>
        </div>
        <div class="sections coupons">
            <router-link :to="{name:'Coupons'}"><h4><i class="fa fa-gift"></i>  My Coupons</h4></router-link>
        </div>
        <div class="sections">
            <h4><i class="fa fa-sign-out"></i> Log Out</h4>
        </div>
        
    </div>
    <div class="sideBarMain" id="sideBarMain">
        <button class="btn btn-default toggler" @click="sideBarOpen()" type="button">
                <i class="fa fa-bars fa1"></i>
        </button>
        <div class="container" align="center">
            <slot name="mainPart"></slot>
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
import db from '../Firebase _Overview/init'
import firebase from 'firebase'
export default {
    name: 'Profile',
    components: {
  },
  data(){
    return{
      index : '',
      data:[],
    }
  },
  methods: {
    sideBarOpen() {
        document.getElementById("profileInf").style.display = "block";
    },

    sideBarClose() {
        document.getElementById("profileInf").style.display = "none";
    },
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user =>{
        if(user){
            this.index = user.uid
            db.collection('users').doc(this.index).onSnapshot(snapshot =>{
                var data = snapshot.data()
                this.data = data;
            })
        }
    })
    $("html, body").animate( 
            { scrollTop: "0" }, 100); 
    resizeFunction();
    function resizeFunction() {
        if($(window).width() < 968)
        {
            document.getElementById("profileInf").style.display = "none";
            $('.sideBarMain').css("margin-left","0");
            $(".toggler").css("display",'block');
            $(".close").css("display",'block');
            document.body.addEventListener("click", function(e){
                if(e.target.classList.contains('sidebar') || e.target.classList.contains('sections') 
                && !e.target.classList.contains("close") || e.target.parentElement.classList.contains('toggler') || e.target.classList.contains('toggler'))
                {
                    document.getElementById("profileInf").style.display = "block";
                }else{
                    document.getElementById("profileInf").style.display = "none";
                };
                
            })
        }else{
            document.getElementById("profileInf").style.display = "block";
            $('.sideBarMain').css("margin-left","300px");
            $(".toggler").css("display",'none');
            $(".close").css("display",'none');
        }
    }
    $(window).resize(resizeFunction);
    
  },
}
</script>

<style lang="scss" scoped>
input[type="number"] {
    -moz-appearance: textfield;
    appearance: none;
    -webkit-appearance: none;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
a.router-link-exact-active h5{
  color:rgba(0,0,0,1);
  font-weight: 600;
}
a.router-link-exact-active h4{
  color:rgba(0,0,0,1);
  font-weight: 600;
}
.profileContainer{
    width:100%;
    height: 100%;
    min-height: 100vh;
    padding:20px;
    padding-top:100px;
    position:relative;
    background:#f1f3f6;
    z-index: 15;
}
.sidebar{
    position: absolute;
    top:0;
    bottom: 0;
    left:0;
    width:300px;
    height: 100%;
    padding-bottom: 20px;
    padding-top:100px;
    text-align: center;
    animation-duration: 1s;
    animation-fill-mode: both;
    -webkit-animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    opacity: 0;
    animation-name: fadeInRight;
    -webkit-animation-name: fadeInRight;
    z-index: 123456;
}
@keyframes fadeInRight {
    from {
        transform: translate3d(-80px,0,0)
    }

    to {
        transform: translate3d(0,0,0);
        opacity: 1
    }
}

@-webkit-keyframes fadeInRight {
    from {
        transform: translate3d(-80px,0,0)
    }

    to {
        transform: translate3d(0,0,0);
        opacity: 1
    }
}
.close{
    color:white;
    cursor: pointer;
    position: absolute;
    top:80px;
    right:5px;
}
.pic img{
    width:75px;
    height:75px;
    border-radius: 50%;
}
.pic p{
    margin:auto 5px;
    font-size: 25px;
    font-weight:700;
}
.sections{
    width:270px;
    border:1px solid white;
    padding:10px;
    padding-bottom: 5px;
    margin: 15px;
    background: whitesmoke;
    border-radius: 15px;
    box-shadow: 0px 1px 3px 2px rgba(34,41,72,0.3);
    line-height: 1.4;
    cursor: pointer;
}
.account hr{
    margin-top:10px;
}
.sections a{
    color:rgba(0, 0, 0, 0.5);
    display: table;
    margin: auto auto;
}
.sections a:hover{
    color:rgba(0, 0, 0, 0.8);
    text-decoration: none;
}
.sections i{
    color:#172337;
}
.sections h4{
    display: table;
    margin: auto auto;
}
.toggler{
    background: gray;
    border:none;
    color:white;
    margin-left:5px;
}
.toggler:focus{
    box-shadow: none;
}
.sideBarMain .container{
    width:100%;
    max-width: 1280px;
    border:1px solid white;
    padding:20px;
    margin-top: 15px;
    background: whitesmoke;
    border-radius: 15px;
    box-shadow: 0px 1px 3px 2px rgba(34,41,72,0.3);
    line-height: 1.4;
}
@media screen and (max-width:578px) {
  
}
@media screen and (max-width: 1180px) { 
    .sidebar{
        background: rgba(0, 0, 0, 0.5);
    }
}
@media screen and (max-width: 668px) {
    .close{
        top:120px;
    }
    .sidebar, .profileContainer{
        padding-top: 150px;
    }
}
@media screen and (max-height:600px){
    .sections h4{
        font-size: 1.3em;
    }
    .sections{
        padding-top:5px;
        padding-bottom:0px;
    }
}
</style>