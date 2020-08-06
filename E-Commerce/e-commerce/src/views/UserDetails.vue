<template>
    <div>
        <div class="pos-fixed" style="position:fixed;left:0;right:0;z-index:175523;">
            <p v-if="error" id="error" class="alert alert-danger text-center">{{Msg}}</p>
            <p v-if="success" id="success" class="alert alert-success text-center">{{Msg}}</p>
        </div>
        <div class="form_container">  
           
            <div class="container">
                <h1 class="p-b-59">Welcome On Board!</h1>
                <hr>
                <form @submit.prevent="form_submit" class="validate-form">
                    <div class="validate-input">
                        <input class="input100" type="text" name="name" placeholder="Name" :value="data.name" required>
                        <span class="focus-input100"></span>
                    </div>
                    <div class="validate-input row">
                        <span class="label-input100">Gender</span>
                        <div>
                            <input type="radio" id="female" @click="gender" name="gender" value="Female">
                            <label for="female">Female</label>
                        </div>
                        <div>
                            <input type="radio" id="male" @click="gender" name="gender" value="Male">
                            <label for="male">Male</label>
                        </div>
                    </div>
                    <div class="validate-input" data-validate = "Only Numbers are allowed">
                        <input class="input100" type="number" name="age" v-model="data.age" placeholder="age" required>
                        <span class="focus-input100"></span>
                    </div>
                    <div class="validate-input" data-validate = "Only Numbers are allowed">
                        <input class="input100" type="number" name="mobileNumber" v-model="data.mobile_number" placeholder="Mobile Number" required>
                        <span class="focus-input100"></span>
                    </div>
                    <div class="validate-input" data-validate = "Address is required">
                        <textarea class="input100" name="address" placeholder="Address" required cols="30" rows="3"></textarea>
                        <span class="focus-input100"></span>
                    </div>
                    <div class="validate-input">
                        <input class="input100" type="text" name="locality" placeholder="Locality(Optional)">
                        <span class="focus-input100"></span>
                    </div>
                    <div class="validate-input" data-validate = "Only Numbers are allowed">
                        <input class="input100" type="number" name="pincode" placeholder="Pincode" required>
                        <span class="focus-input100"></span>
                    </div>
                    <div class="validate-input" data-validate = "State is required">
                        <span class="label-input100">State</span>
                        <select class="form-control" @change.prevent="stateSelected" name="state" required>
                            <option v-for="(state, index) in states" :key="index" :value="index">{{state}}</option>
                        </select>
                    </div>
                    <div class="validate-input" data-validate = "State is required">
                        <span class="label-input100">City</span>
                        <select class="form-control" name="city" required>
                            <option v-for="(city, index) in currentcities" :key="index" :value="city">{{city}}</option>
                        </select>
                    </div>
                    <div class="container-login100-form-btn m-auto">
                        <div class="wrap-login100-form-btn">
                            <div class="login100-form-bgbtn"></div>
                            <button class="login100-form-btn">
                                Save & Continue
                            </button>
                        </div>
                    </div>
                </form>
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
import cities from './Profile/cities'
import db from './Firebase _Overview/init'
export default {
    name: 'SignUp',
    components:{

    },
    data(){
        return{
            data:[],
            index:'',
            states:[],
            currentcities:[],
            error:false,
            success:false,
            Msg:'',
        }
    },
    methods:{
        stateSelected(){
            var idx = parseInt(document.querySelector('select[name="state"]').value) + 1
            var city_arr = cities.s_a[idx].split("|");
            this.currentcities = city_arr
        },
        gender(){
            document.querySelectorAll('input[name="gender"]').forEach(element => {
            if(element.checked){
              element.parentElement.querySelector('label').classList.add('active')
            }else{
               element.parentElement.querySelector('label').classList.remove('active')
            }
          })
        },
        form_submit(){
            var vm = this;
            var name = document.querySelector('input[name="name"]').value
            var gender
            document.querySelectorAll('input[name="gender"]').forEach(element => {
                if(element.checked){
                    gender = element.value
                }
            })
            var mobileNumber = document.querySelector('input[name="mobileNumber"]').value
            var age = document.querySelector('input[name="age"]').value
            var pincode = document.querySelector('input[name="pincode"]').value
            var locality = document.querySelector('input[name="locality"]').value
            var address = document.querySelector('textarea[name="address"]').value
            var state = document.querySelector('select[name="state"]').value
            state = this.states[state]
            var city = document.querySelector('select[name="city"]').value
            var finalAddress = {'name': name, 'mobile_number':mobileNumber, 'address':address, 'locality':locality, 'city':city, 'state':state, 'pincode':pincode}
            if (name != '' && age != null && gender != null && mobileNumber !=null && pincode != null && address !='' && state != '' && city != '')
            {
                var addresses = [finalAddress]
                db.collection('users').doc(this.index).update({
                    age:age,
                    country:'India',
                    addresses:addresses,
                    gender:gender,
                    mobile_number:mobileNumber,
                    name:name,
                    imagelink:this.data.imagelink,
                }).catch(function (error) {
                    vm.error = true
                    vm.Msg = error.message
                    setTimeout(() => {
                        vm.error = false
                    }, 4000);
                }).then(() =>{
                    vm.success = true
                    vm.Msg = 'SuccessFully Done'
                    setTimeout(() => {
                        vm.success = false
                    }, 4000);
                    this.$router.push({name:"Start"})
                })
                
            }
            else
            {
                vm.error = true
                vm.Msg = 'Enter Valid Data'
                setTimeout(() => {
                    vm.error = false
                }, 4000);
            }
        }
    },
    mounted(){
        document.documentElement.scrollTop = 0
        this.index = this.$route.params.id
        db.collection('users').doc(this.index).get().then(snapshot =>{
            var data = snapshot.data()
            this.data = data;
        })
        this.states = cities.state_arr
        var city_arr = cities.s_a[1].split("|");
        this.currentcities = city_arr
        document.querySelectorAll('input[name="gender"]').forEach(element => {
            if(element.checked){
              element.parentElement.querySelector('label').classList.add('active')
            }else{
               element.parentElement.querySelector('label').classList.remove('active')
            }
        })

    },
}
</script>
<style lang="scss" scoped>
.alert{
    margin: 0 auto;
    max-width: 350px;
    animation-duration: 1s;
    animation-fill-mode: both;
    -webkit-animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    opacity: 0;
    animation-name: fadeInDown;
    -webkit-animation-name: fadeInDown;
}
@keyframes fadeInDown {
    from {
        transform: translate3d(0,-80px,0)
    }

    to {
        transform: translate3d(0,0,0);
        opacity: 1
    }
}

@-webkit-keyframes fadeInDown {
    from {
        transform: translate3d(0,-80px,0)
    }

    to {
        transform: translate3d(0,0,0);
        opacity: 1
    }
}
.form_container{
    background: linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('../assets/Media/background.jpg') no-repeat center;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    -ms-background-size: cover;
	position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding:50px auto;
}
.form_container .container{
    background-color: white;
    border-radius: 15px;
    padding:20px;
    text-align: center;
    margin:5px;
    max-width: 500px;
}
.validate-form{
    text-align: left;
}
a {
	font-size: 14px;
	line-height: 1.7;
	color: #666666;
	margin: 0px;
	transition: all 0.4s;
	-webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
}
a:focus {
	outline: none !important;
}
a:hover {
	text-decoration: none;
}
input {
	outline: none;
	border: none;
}
input[type="number"] {
    -moz-appearance: textfield;
    appearance: none;
    -webkit-appearance: none;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
textarea {
  outline: none;
  border: none;
}
textarea:focus, input:focus {
  border-color: transparent !important;
}
input:focus::-webkit-input-placeholder { color:transparent; }
input:focus:-moz-placeholder { color:transparent; }
input:focus::-moz-placeholder { color:transparent; }
input:focus:-ms-input-placeholder { color:transparent; }

textarea:focus::-webkit-input-placeholder { color:transparent; }
textarea:focus:-moz-placeholder { color:transparent; }
textarea:focus::-moz-placeholder { color:transparent; }
textarea:focus:-ms-input-placeholder { color:transparent; }

input::-webkit-input-placeholder {color: #cccccc;}
input:-moz-placeholder {color: #cccccc;}
input::-moz-placeholder {color: #cccccc;}
input:-ms-input-placeholder {color: #cccccc;}

textarea::-webkit-input-placeholder {color: #cccccc;}
textarea:-moz-placeholder {color: #cccccc;}
textarea::-moz-placeholder {color: #cccccc;}
textarea:-ms-input-placeholder {color: #cccccc;}
button {
	outline: none !important;
	border: none;
	background: transparent;
}
button:hover {
	cursor: pointer;
}
.validate-input{
  margin: 35px 0;
}
input[type="radio"]{
    display: none;
}
label{
    margin:0 15px;
    border:1px solid #ccc;
    border-radius: 15px;
    color: #fff;
    font-weight: 900;
    cursor: pointer;
    background: #555555;
    width:100px;
    height:30px;
    padding: auto auto;
    text-align: center;
}
.active{
  background: rgb(80, 177, 80);
  color:white;
  font-weight: 900;
  zoom:102%;
}
.input100 {
  display: block;
  width: 100%;
  background: transparent;
  font-size: 22px;
  color: #555555;
  line-height: 1.2;
  padding: 0 2px;
  border-bottom: #ccc 1px solid;
  margin-top:10px;
}
.focus-input100 {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}
textarea{
    height: 100%;
}
textarea::-webkit-scrollbar{
    display: none;
}
.focus-input100::before {
  content: "";
  display: block;
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
  background: #d5007d;
  background: -webkit-linear-gradient(45deg, #061b3df8, #000e24f8);
  background: -o-linear-gradient(45deg, #061b3df8, #000e24f8);
  background: -moz-linear-gradient(45deg, #061b3df8, #000e24f8);
  background: linear-gradient(45deg, #061b3df8, #000e24f8);
}

select:focus{
    box-shadow: none;
}

.input100:focus + .focus-input100::before {
  width: 100%;
}

.has-val.input100 + .focus-input100::before {
  width: 100%;
}

.login100-form-btn {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 auto;
  min-width: 244px;
  border-radius: 50px;
  height: 50px;
  font-size:21px;
    background: #061b3df8;
    margin:15px auto;
  color: #fff;
  line-height: 1.2;
}
.validate-input {
  position: relative;
}

@media (max-width: 368px) {
    label{
        width:70px;
    }
}
@media screen and (max-width: 420px) {
    .form_container.container{
        padding-bottom: 100px;
    }
    .form_container .login100-form-btn{
        position: fixed;
        bottom:-18px;
        left:0;
        right:0;
        border-radius: 0;
        width:100%;
    }
}
</style>