<template>
  <div class="creditPart">
    <div class="container">
      <div class="row">
        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12 columns">
          <div class="head">ABOUT</div>
          <div align="left" style="display:table;">
            <a href="#" >Contact Us</a><br>
            <a href="#" >About Us</a><br>
          </div>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12 columns">
          <div class="head">HELP</div>
          <a href="#" >Payments</a><br>
          <a href="#" >Shipping</a><br>
          <a href="#" >FAQ</a><br>
          <a href="#" >Cancellation &amp; Returns</a><br>
          <a href="#" >Report Infringement</a><br>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12 columns">
          <div class="head">POLICY</div>
          <a href="#" >Return Policy</a><br>
          <a href="#" >Terms Of Use</a><br>
          <a href="#" >Security</a><br>
          <a href="#" >Privacy</a><br>
          <a href="#" >Sitemap</a><br>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12 columns">
          <div class="head">Registered Office Address</div>
          <p>XYZ<br>
          XYZ<br>
          XYZ<br>
          XYZ<br>
          XYZ<br>
          XYZ<br>
          XYZ<br>
          Telephone: <a href="tel:1234567890">1234567890</a></p>
        </div>
           
      </div>
    </div>
    <hr style="background:rgba(255,255,255,0.5);">
    <div class="container" align="center">
      <nav class="navbar navbar-expand-lg" role="navigation" align="center">
          <div class="navbar-header navbar-left">
            <a class="navbar-brand" href="#">
                Company
            </a>
          </div>
          <ul class="navbar-nav ml-auto navbar-right" align="left">
            <li class="nav-item"><a href = "mailto:"> <i class="fa fa-envelope"></i>  </a></li>
            <li class="nav-item"><a href = "mailto:"> <i class="fa fa-facebook"></i> </a></li>
            <li class="nav-item"><a href = "mailto:"> <i class="fa fa-instagram"></i> </a></li>
            <li class="nav-item"><a href = "">©Company Pvt. Ltd</a></li>
          </ul>
      </nav>
    </div>


</div>
</template>

<script>

export default {
  name: 'CreditPage',
  data(){
    return{
      
    }
  },
  methods: {
  
  },
}
</script>

<style lang="scss" scoped>
body
{
  width:100%;
  height:100%;
  min-height: 100vh;
  position:relative;
  font-family: 'Baloo Da 2', cursive;
  overflow: auto;
}
body::-webkit-scrollbar
{
  display: none;
}
.creditPart{
  font-size: 18px;
  color: #fff;
  background:#172337;
  line-height: 1.4;
  letter-spacing: 0;
  text-align: left !important;
  padding: 10px;
  padding-top:25px;
  // margin-top:25px;
}
.head{
  font-size: 22px;
  font-weight: 800;
}
.columns a{
  color: rgba(255,255,255, 0.5);
}
.columns a:hover{
  color: rgba(255,255,255, 0.8);
  text-decoration: none;
}
.nav-item{
  font-size: 18px;
  margin-left:10px;

}
.nav-item a{
  color: rgba(255,255,255, 0.5);
}
.nav-item a:hover{
  color: rgba(255,255,255, 0.8);
  text-decoration: none;
}
</style>
