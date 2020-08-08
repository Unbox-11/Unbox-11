<template>
  <div id="app">
    <div class="upward" @click="upward">
      <i class="fa fa-angle-up"></i>
    </div>

    <navbar v-if="!(exceptpage.includes(pagename))" />
    <div style="min-height:100vh; height:100%;position:relative">
      <div v-if="loader" class="loaderDiv">
        <span  class="loader">
          <span class="loader-inner"></span>
        </span>
      </div>
      <router-view/>
    </div>
    
    <credit1 v-if="!(exceptpage.includes(pagename))" />
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
import navbar from '../components/Navbar'
import credit from '@/components/Credit'
export default {
  name: 'StartPage',
  components:{
    navbar,
    credit1:credit,
  },
  data(){
    return{
        pagename:'',
        exceptpage:['Login','SignUp'],
        loader:true,
    }
  },
  methods:{
    upward(){
        $("html, body").animate( 
                { scrollTop: "0" }, 500); 
    },
  },
  updated(){
    this.pagename = this.$route.name
  },
  mounted(){
    var upward = document.querySelector(".upward");
    scrollFunction();
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          upward.style.display = "block";
        } else {
          upward.style.display = "none";
        }
    }
    window.addEventListener("scroll", function(){
      if(window.outerWidth < 668)
      {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          $('#a1').css('display','none');
          $('.navbar .container-fluid').css('margin-left','-18px')
        } else {
          $('#a1').css('display','block');
          $('.navbar .container-fluid').css('margin-left','0px')
        }
      }
    })
  },
}
</script>

<style>
body
{
  width:100%;
  height:100%;
  position:relative;
  font-family: 'Baloo Da 2';
  overflow: auto;
}
body::-webkit-scrollbar
{
  display: none;
}
.upward{
  position: fixed;
  right:20px;
  bottom:30px;
  width:50px;
  height: 50px;
  border-radius: 50% 50%;
  color:whitesmoke;
  background: rgba(0,0,0,0.5);
  z-index: 1234567890;
  font-size: 35px;
  font-weight: 1200;
  cursor: pointer;
  display: block;
}
.upward i{
  margin: 0 28%;
}

.loaderDiv{
  width:100%;
  height:100%;
  position: absolute;
  left:0;
  right:0;
  top:0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  display: inline-block;
  width: 50px;
  height: 50px;
  z-index:3;
  border: 4px solid #172337;
  margin:auto auto;
  animation: loader 2s infinite ease;
}

.loader-inner {
  vertical-align: middle;
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: #172337;
  animation: loader-inner 2s infinite ease-in;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  
  25% {
    transform: rotate(180deg);
  }
  
  50% {
    transform: rotate(180deg);
  }
  
  75% {
    transform: rotate(360deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-inner {
  0% {
    height: 0%;
  }
  
  25% {
    height: 0%;
  }
  
  50% {
    height: 100%;
  }
  
  75% {
    height: 100%;
  }
  
  100% {
    height: 0%;
  }
}
</style>
