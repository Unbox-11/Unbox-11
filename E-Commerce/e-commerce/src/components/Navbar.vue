<template>
  
    <nav class="navbar fixed-top navbar-expand-xl m-auto" role="navigation" align="center">
      
        <div class="navbar-header">
                <router-link :to="{name:'Start'}" class="navbar-brand" id="a1" href="#">Company</router-link>
        </div>
        <div class="container-fluid">
          <div class="container" style="position:relative; max-width:600px;">
            <form @submit.prevent class="form-group  searchbox">
              <input class="form-control"  autocomplete="off" spellcheck="true" type="search" placeholder="Search" name="Search" @change="auto" @input="auto" v-model="searchitem">
              <button class="btn btn-default" type="submit"><i class="fa fa-search"></i></button>
            </form>
            <div class="dropdown">
              <div v-if="results" class="dropdown-menu">
                <router-link v-for="(res, index) in results" role="option"  data-toggle="dropdown" :key="index" class="dropdown-item"
                 @click.native="closeDropdown(res.data().name)" :to="{name:'Product',params:{id:res.id}}">{{res.data().name}}</router-link>
              </div>
              <div v-if="!results" class="dropdown-menu">
                <a role="option" @click.prevent  data-toggle="dropdown" class="dropdown-item">No Results Found!</a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="navbar-header">
              <button class="custom-toggler ml-auto navbar-toggler navbar-right" @click="navbar" type="button" data-toggle="collapse" data-target="#Itemlist" aria-controls="Itemlist" aria-expanded="false" aria-label="Toggle navigation" align="center">
                    <i class="fa fa-bars fa1"></i>
              </button>
        </div>
        
          <div class="collapse navbar-collapse" id="Itemlist" align="left">
             <ul class="navbar-nav ml-auto navbar-right">
               <li class="nav-item dropdown profileDrop" v-if="isAuthenticated">
                  <a class="nav-link custom-toggler" href="#" @mouseover="ProfileMouseOver" @mouseout="ProfileMouseOut" id="profileDropDown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{name}} <i id="dropdownToggle" class="fa fa-angle-down"></i>
                  </a><!--"-->
                  <div class="dropdown-menu" aria-labelledby="profileDropDown" @mouseover="ProfileMouseOver" @mouseout="ProfileMouseOut">
                    <router-link class="dropdown-item" @click.native="navbarClass" :to="{name:'Notifications'}">Notifications</router-link>
                    <router-link class="dropdown-item" @click.native="navbarClass" :to="{name:'Orders'}">My Order</router-link>
                    <router-link class="dropdown-item profile" @click.native="navbarClass" :to="{name:'Details'}">My Profile</router-link>
                    <router-link class="dropdown-item" @click.native="navbarClass" :to="{name:'Coupons'}">My Coupons</router-link>
                  </div>
                </li>
                <li class="nav-item"><router-link :to="{name:'Cart'}" class="nav-link"> <i style="font-size:25px;" class="fa fa-shopping-cart"></i> Cart</router-link></li>
                <li class="nav-item" v-if="!isAuthenticated"><router-link :to="{name:'Login'}" class="nav-link">Log In</router-link></li>
                <li class="nav-item" v-if="isAuthenticated"><a @click.prevent="logout" href="#" class="nav-link">Log Out</a></li>
              </ul>
        
      </div>
    </nav>
          
    
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
import db from '../views/Firebase _Overview/init'
import firebase from 'firebase'
export default {
  name: 'Navbar',
  components: {
  },
  data(){
    return{
      searchitem:'',
      suggestions:[],
      results: [],
      index:'',
      name:'Profile',
      isAuthenticated:false,
    }
  },
  methods: {
    auto(){
      $(".container-fluid .dropdown-menu").css('display', 'table');
      if (!document.querySelector('input[name="Search"]').value){
        $(".container-fluid .dropdown-menu").dropdown('hide');
        $(".container-fluid .dropdown-menu").css('display', 'none');
        this.results = []
        return null
      }
     
      var result = this.suggestions.filter(product =>{
        return product.data().name.toLowerCase().includes(this.searchitem.toLowerCase())
      })
      result.sort();
      if (result.length == 0) {
        this.results = null
      }else{
        this.results = result
      }   
      $(".container-fluid .dropdown-menu").dropdown('show');
    },
    closeDropdown(word){
      this.searchitem = word;
      if($(".container-fluid .dropdown-menu").hasClass('show')){
          $(".container-fluid .dropdown-menu").css('display', 'none');
      }
    },
    logout(){
      var vm = this 
      firebase.auth().signOut().then(function() {
        vm.isAuthenticated = false
      })
    },
    navbar(){
      $(".navbar-toggler").click(function (event) {
        $(".navbar-collapse").collapse();
      });
    },
    navbarClass(){
      $(".navbar-collapse").collapse('hide');
    },
    ProfileMobile(){
        // $('#profileDropDown').next('.dropdown-menu').slideToggle("slow");
      if($('.profileDrop').hasClass('show')){
        $(".profileDrop").find(".dropdown-menu").dropdown('hide');
          document.querySelector("#dropdownToggle").classList.remove("fa-angle-up");
          document.querySelector("#dropdownToggle").classList.add("fa-angle-down");
      }else{
         $(".profileDrop").find(".dropdown-menu").dropdown('show');
        document.querySelector("#dropdownToggle").classList.remove("fa-angle-down");
        document.querySelector("#dropdownToggle").classList.add("fa-angle-up");
      }
        
    },
    ProfileMouseOver(){
       $(".profileDrop").find(".dropdown-menu").dropdown('show');
        document.querySelector("#dropdownToggle").classList.remove("fa-angle-down");
        document.querySelector("#dropdownToggle").classList.add("fa-angle-up");
    },  
    ProfileMouseOut(){
        $(".profileDrop").find(".dropdown-menu").dropdown('hide');
      document.querySelector("#dropdownToggle").classList.remove("fa-angle-up");
      document.querySelector("#dropdownToggle").classList.add("fa-angle-down");
    },
  },
  mounted(){  
    this.results = []
    document.body.addEventListener("click", function(e){
      if(e.target.classList.contains('navbar') || e.target.classList.contains('navbar-collapse in')
        && !e.target.classList.contains("navbar-toggle"))
      {
        
      }else{
          $(".navbar-collapse").collapse('hide');
      };
      try{
        if($(".container-fluid .dropdown-menu").hasClass('show') || document.querySelector(".container-fluid .dropdown-menu").style.display == 'table')
        {
          $(".container-fluid .dropdown-menu").css('display','none')
        }
      }
    catch(e){

    }
    })
    firebase.auth().onAuthStateChanged(user =>{
        if(user){
            this.index = user.uid
            this.isAuthenticated = true
            db.collection('users').doc(this.index).get().then(snapshot =>{
                var data = snapshot.data()
                var name = data.name.split(' ')
                this.name = name[0];
            })
        }
    })
    document.documentElement.scrollTop = 0
    var vm=this
    db.collection('products').orderBy('name').onSnapshot(snapshot =>{

        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == 'added') {
                vm.suggestions.push(change.doc);
            }
            if (change.type == 'removed') {
                vm.suggestions = vm.suggestions.filter(suggestion => {
                    return suggestion.id != change.doc.id
                })
            }
            if (change.type === 'modified') {
                vm.suggestions = vm.suggestions.filter(product => {
                    return product.id != change.doc.id
                })
                vm.suggestions.push(change.doc);
            }
        });

    })
  }
}
</script>

<style lang="scss" scoped>

body
{
  width:100%;
  height:100%;
  position:relative;
  padding-bottom: 10px;
  font-family: 'Baloo Da 2', cursive;
}
body::-webkit-scrollbar
{
  display: none;
}
.current{
  background: red;
}
.navbar{
  color:#fff;
  background:#172337!important;
  width:100%;
  z-index:9874563210;
}

.custom-toggler.navbar-toggler{
    color: #fff;
    border: #fff 1.5px solid;
    width:35px;
    height: 35px;
    outline:none;
    position: absolute;
    top:15px;
    right:10px;
}
.fa1{
  width:30px;
  height:30px;
  margin-left:-10px;
}
.container-fluid{
  min-width: 250px;
  width:50%;
  // max-width: 550px;
  padding:0 auto;
}
.nav-item{
  font-size:20px;
  margin:0 25px;
  letter-spacing: 1px;
}
.nav-link{
  color:rgb(255,255,255);
  opacity: 0.5;
  font-family: 'Baloo Da 2', cursive;
  text-decoration: none;
}
.nav-link:hover{
  opacity:1;
  text-decoration: none;
}
a.router-link-exact-active{
  opacity: 1;
  font-weight: 600;
}
.searchbox{
  border:#fff 1px solid;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  width:100%;
  margin:10px auto;
  position: relative;
}
.searchbox input{
  border:none;
  width:92%;
  // height: 100%;
  // position: absolute;
  // top:0;
  // left: 0;
  // right: 0;
  // bottom: 0;
}
.searchbox input:focus{
  border:none;
  box-shadow: none;
}
.searchbox button{
  background: rgba(12, 12, 12, 0.5);
  border:none;
  color:rgba(255,255,255,0.8);
  position: absolute;
  right:0;
  bottom:0;
  top:0;
}
.searchbox button:hover{
  background: rgba(12, 12, 12, 0.8);
  color:rgba(255,255,255,1);
}
.searchbox button:focus{
  border:none;
  box-shadow: none;
}
.container-fluid .dropdown{
  position: absolute;
  bottom: 0;
}
.container-fluid .dropdown-menu{
  width: 80vw;
  max-width: 550px;
}
.profileDrop .dropdown-menu{
  color:#141414;
}
.dropdown-item:focus{
    background: #ccc;
    color:#141414;
}
.profileDrop .dropdown-menu::before{
  content: '';                  
  position: absolute;             
  width: 5px;                     
  height: 5px;                    
  border: 10px solid transparent;  
  border-bottom-color: #fff;   
  left:50px;                      
  top: -20px;            
  }
.profileDrop .dropdown-menu::after{
  content: '';                  
  position: absolute;             
  width:100%;                     
  height: 5px;                    
  border: 10px solid transparent;
  left:0px;                      
  top: -20px;             
}
@media screen and (max-width:1024px){
  .profileDrop .dropdown-menu::before{                   
  top: 30px;          
  }
  .profileDrop .dropdown-menu::after{                 
  top: 30px;             
  }
  .container-fluid{
    width:80%;
  }
}
@media screen and (max-width:655px) {
  .container-fluid{
    width:100%;
  }
}
</style>
