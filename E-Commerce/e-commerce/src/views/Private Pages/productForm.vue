
<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 98765432101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.showPassword{
  position: relative;
}
.field-icon{
  position:absolute;
  top:0;
  right:5px;
  bottom:0;
  color:rgba(0,0,0,0.5);
  padding-top:10px;
  cursor: pointer;
}
.productAddForm{
    margin:120px auto;
}
.productAddForm .row{
    max-width:980px;
}
.productAddForm textarea{
    min-height: 5rem;
    max-height:5rem;
    resize: none;
    overflow-x: hidden;
    overflow-y: auto;
}
.productAddForm .form-control, .productAddForm .btn{
    margin:15px 15px 15px 0;
}
.productAddForm .form-control:focus{
    box-shadow: none;
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

.img{
    max-width: 200px;
    max-width:200px;
}
.nav-pills li a{
    color:rgba(0,0,0,0.5);
    text-decoration: none;
    font-size: 20px;
}
.nav-pills li a:hover{
    color: rgba(0,0,0,0.8);
}
.nav-pills li a:focus{
    text-decoration: none;
}
.nav-pills li .active{
    color:#fff;
    background: rgba(0,0,0,0.5);
    padding: 10px;
    font-size: 18px;
}
.nav-pills li{
    margin:0 15px;
}
table{
    margin:10px auto;
    background:whitesmoke;
    font-size: 21px;
    padding: 10px;
    cursor: pointer;
    text-align: left;
}
@media screen and (max-width:568px) {
 
}
</style>

<template>
  <div>
    <div v-if="reauthenticateWindow">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-dialog" role="document">
                        <div class="container modal-content">
                            <div v-if="!isAdmin">
                                <h4 class="modal-title mt-1" align="center"><strong>We are Sorry. But you don't have access to this Page!</strong></h4>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-secondary" @click="$router.go(-1)" name="button">Back</button>
                                </div>
                            </div>
                            <div v-if="reauthenticate" id="reauthenticate">
                                <h4 class="modal-title mt-3 mb-0" align="center"><strong>Log in</strong></h4>
                                <hr>
                                <div class="modal-body">            
                                    <p class="text-muted">Enter your Email and Password</p>
                                    <div class="account-details" align="center">
                                        <form @submit.prevent="reauthenticateuser" class="form-group reauthenticateform">
                                            <div style="margin-top:0px"  align="left">
                                                <label for="Currentpassword">Email :</label>
                                                <div class="showPassword" id="Currentpassword">
                                                    <input type="email" name="emailUser" placeholder="Email" class="form-control" required>
                                                    <span class="fa fa-envelope field-icon"></span>
                                                </div>
                                            </div>
                                            <div style="margin-top:10px"  align="left">
                                                <label for="password">Password :</label>
                                                <div class="showPassword" id="password">
                                                    <input type="password" name="userPass" class="form-control" placeholder="Passowrd" required>
                                                    <span toggle="#password-field"  @click="togglePass"  class="fa fa-fw fa-eye field-icon toggle-password"></span>
                                                </div>
                                            </div>
                                            <div class="modal-footer mt-5">
                                                <button type="submit" class="btn btn-success" name="button" id="continuebtn">Continue</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div v-if="isDelete" id="delete">
                                <h4 class="modal-title mt-3 mb-0" align="center"><strong>Are You Sure?</strong></h4>
                                <hr>
                                <div class="modal-body"  align="center">            
                                    <p class="text-muted">Do you want to delete Product Permanently?</p>
                                    <div class="account-details">
                                        <div class="modal-footer">
                                            <button type="button" @click="isDelete=false; reauthenticateWindow=false" class="btn mr-auto btn-secondary" name="button" >Close</button>
                                            <button type="button" @click="deleteProduct" class="btn ml-auto btn-danger" name="button" id="continuebtn">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition> 
    </div>
    <div v-if="isReauthneticated" class="container productAddForm">
        <div class="jumbotron pt-4" align="center">
            <h1>Welcome Boys!</h1>
            <ul class="nav nav-pills">
                <li class=""><a data-toggle="pill" href="#addNew">Add New Product</a></li>
                <li><a data-toggle="pill" href="#edit">Edit Product</a></li>
                <li><a data-toggle="pill" href="#delete">Delete Product</a></li>
            </ul>
            <hr>
            <div class="tab-content">
                <div id="addNew" class="tab-pane fade ">
                    <form @submit.prevent="addProduct" @reset.prevent="range = [1]; highlights = [];sizes=[]; shapes=[];" class="productform">
                        <div class="row">
                            <div class="col-12" align="center">
                                <img id="blah" class="img"  src="http://placehold.it/180" alt="Product image" />
                                <input class="img form-control"  @change="readURL" type="file" accept="image/*" required>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                                <input class="form-control" type="text" v-model="name" name="name" placeholder="Product Name" required>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                                <div v-for="(size, index1) in Sizerange" :key="index1">
                                    <input class="form-control" type="number" v-model="sizes[index1]" name="size" @keydown.tab.prevent="addSize(index1)" placeholder="Product Size(Press tab to add more Sizes)">
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                                <div v-for="(size, index1) in Shaperange" :key="index1">
                                    <input class="form-control" type="text" v-model="shapes[index1]" name="shape" @keydown.tab.prevent="addShape(index1)" placeholder="Product Shape(Press tab to add more Shapes)" required>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                                <input class="form-control" type="number" v-model="price" name="price" placeholder="Price" required>
                            </div>
                            <div v-for="(hgl, index) in range" :key="index" class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                                <input class="form-control" type="text" v-model="highlights[index]" name="highlight" @keydown.tab.prevent="addHighlight(index)" placeholder="Highlight(Press tab to add more highlights)">
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                <textarea  class="form-control" name="description" v-model="description" placeholder="Description"  cols="30" rows="4" required></textarea>
                            </div>
                        </div>
                        <p v-if='success' class="text-success">{{ success }}</p>
                        <p v-if='feedback' class="text-danger">{{ feedback }}</p>
                        <button type="submit" class="btn btn-success">Save</button>
                        <button type="reset" class="btn btn-secondary cancel">Cancel</button>
                    </form>
                </div>
                <div id="edit" class="tab-pane fade">
                    <form @submit.prevent="updateProduct" v-if="isEdit" @reset="isEdit=false" class="productform">
                        <div class="row">
                            <div class="col-12" align="center">
                                <img id="blah" class="img" :src="editProduct.imageLink" alt="Product image" />
                                <input class="img form-control" @change="readURL" type="file" accept="image/*">
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                                <input class="form-control" type="text" v-model="editProduct.name" name="name" placeholder="Product Name" required>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                                <div v-for="(hgl, index) in editProduct.size" :key="index">
                                    <input class="form-control" type="number" v-model="editProduct.size[index]" name="size" @keydown.tab.prevent="editSize(index)" placeholder="Product Size(Press tab to add more sizes)" >
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                                <div v-for="(hgl, index) in editProduct.shape" :key="index">
                                    <input class="form-control" type="text" v-model="editProduct.shape[index]" name="shape" @keydown.tab.prevent="editShape(index)" placeholder="Product Shape(Press tab to add more shape)">
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                                <input class="form-control" type="number" v-model="editProduct.price" name="price" placeholder="Price" required>
                            </div>
                            <div v-for="(hgl, index) in editProduct.highlight" :key="index" class="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
                                <input class="form-control" type="text" v-model="editProduct.highlight[index]" name="highlight" @keydown.tab.prevent="editHighlight(index)" placeholder="Highlight(Press tab to add more highlights)">
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                <textarea  class="form-control" name="description" v-model="editProduct.description" placeholder="Description"  cols="30" rows="4" required></textarea>
                            </div>
                        </div>
                        <p v-if='success' class="text-success">{{ success }}</p>
                        <p v-if='feedback' class="text-danger">{{ feedback }}</p>
                        <button type="submit" class="btn btn-success">Save</button>
                        <button type="reset" class="btn btn-secondary cancel">Cancel</button>
                    </form>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th style="width:10%">Sr. No.</th>
                            <th scope="col-8">Name</th>
                            <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in products" :key="index" @click="editProductForm(product.id)">
                                <th>{{index + 1}}.</th>
                                <td>{{product.data().name}}</td>
                                <td>&#8377; {{product.data().price}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="delete" class="tab-pane fade">
                    <p v-if='success' class="text-success">{{ success }}</p>
                    <p v-if='feedback' class="text-danger">{{ feedback }}</p>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th style="width:10%">Sr. No.</th>
                            <th scope="col-8">Name</th>
                            <th scope="col">Price</th>
                            <th style="width:10%"><i class="fa fa-trash text-danger"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in products" :key="index">
                                <th>{{index + 1}}.</th>
                                <td>{{product.data().name}}</td>
                                <td>&#8377; {{product.data().price}}</td>
                                <td @click="deleteProductConfirm(product.id)" ><i class="fa fa-trash text-danger"></i></td>
                            </tr>
                        </tbody>
                    </table>
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
import firebase from 'firebase'
import db from '../Firebase _Overview/init'
export default {
    name: 'Product_Form',
    components:{
    },
    data(){
        return{
            reauthenticateWindow:false,
            isAdmin:true,
            reauthenticate:false,
            isReauthneticated:true,
            isDelete:false,
            name:null,
            sizes:[],
            shapes:[],
            price:null,
            highlights:[],
            description:null,
            imagelink:null,
            highlight:null,
            range:[1],
            Sizerange:[1],
            Shaperange:[1],
            feedback:null,
            success:null,
            filename:null,
            products:[],
            editProduct:[],
            isEdit:false,
            idOfEdit:null,
            idofDelete:null,
        }
    },
    methods:{
        ischanged(val, oldval){
            if (val)
            {
                $(window).on("beforeunload", function() {
                    return "Are you sure? You didn't finish the form!"
                })
            }else{
                $(window).off("beforeunload");
            }
        },
        togglePass(e){
            e.target.classList.toggle("fa-eye-slash");
            var input = e.target.parentElement.querySelector('input');
            if (input.getAttribute("type") == "password") {
                input.setAttribute("type", "text");
            } else {
                input.setAttribute("type", "password");
            }
        },
        addHighlight(idx) {
            if (this.highlights[idx]) {
                this.highlights.push(this.highlight);
                this.range.push(1)
                this.highlight = null;
                this.feedback = null;
            } else {
                this.feedback = 'Please Enter a Highlight First'
            }
        },
        addSize(idx) {
            if (this.sizes[idx]) {
                this.sizes.push(null);
                this.Sizerange.push(1);
                this.feedback = null;
            } else {
                this.feedback = 'Please Enter a Size First'
            }
        },
        addShape(idx) {
            if (this.shapes[idx]) {
                this.shapes.push(null);
                this.Shaperange.push(1)
                this.feedback = null;
            } else {
                this.feedback = 'Please Enter a Shape First'
            }
        },
        editHighlight(index) {
            if (this.editProduct.highlight[index]) {
                this.editProduct.highlight.push(null);
                this.feedback = null;
            } else {
                this.feedback = 'Please Enter a Highlight First'
            }
        },
        editSize(index) {
            if (this.editProduct.size[index]) {
                this.editProduct.size.push(null);
                this.feedback = null;
            } else {
                this.feedback = 'Please Enter a Size First'
            }
        },
        editShape(index) {
            if (this.editProduct.shape[index]) {
                this.editProduct.shape.push(null);
                this.feedback = null;
            } else {
                this.feedback = 'Please Enter a Shape First'
            }
        },
        addProduct(){
            var vm = this
            if (this.name && this.price && this.description && this.highlights && this.filename) {
                
                db.collection('products').add({
                    name:vm.name,
                    price:vm.price,
                    size:vm.sizes,
                    shape:vm.shapes,
                    description:vm.description,
                    highlight:vm.highlights,
                    imageLink:vm.imagelink,
                }).then(docID=>{
                    let ontask = firebase.storage().ref('products/' + docID.id+ '/image.jpg').put(vm.filename)
                    let children = firebase.storage().ref('products/')
                    ontask.on('state_changed', function(){
                            vm.success = "Uploading"
                    }, function(error) {
                        vm.feedback = "Something Went Worng! Please try Again!" + error
                    }, function() {
                        vm.success = 'SuccessFully Uploaded Image & Data'
                        children.child(docID.id + '/image.jpg').getDownloadURL().then(function(downloadURL) {
                            vm.imagelink = downloadURL
                            db.collection('products').doc(docID.id).update({
                                imageLink:vm.imagelink
                            }).then(() =>{
                                vm.name = null
                                vm.price = null
                                vm.sizes = []
                                vm.shapes = []
                                vm.description = null
                                vm.highlights = []
                                vm.range = [1]
                                vm.Sizerange = [1]
                                vm.Shaperange = [1]
                                document.querySelector('#blah').setAttribute('src', 'http://placehold.it/180');
                                vm.filename = null
                                vm.success = "Product added!"
                                setTimeout(() => {
                                    vm.success = null
                                }, 2000);
                            })
                        });
                    });
                    
                }).catch(error=>{
                    vm.feedback = error.message
                })
            }
            else{
                this.feedback = "Please Fill all information"
            }
        },
        readURL(e) {
            var tar = e
            if (e.target.files && e.target.files[0]) {
                this.filename = e.target.files[0]
                var reader = new FileReader();
                reader.onload = function (e) {
                    tar.target.parentElement.querySelector('#blah').setAttribute('src', e.target.result);
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        },
        editProductForm(id){
            this.idOfEdit = id
            var vm = this
            db.collection('products').doc(id).onSnapshot(snapshot =>{
                vm.editProduct = snapshot.data()
                vm.filename = snapshot.data().imageLink
            })
            this.isEdit = true;
        },
        updateProduct(){
            var vm = this
            if (this.editProduct.name && this.editProduct.price && this.editProduct.description && this.editProduct.highlight && this.filename) {
                
                db.collection('products').doc(vm.idOfEdit).update({
                    name:vm.editProduct.name,
                    price:vm.editProduct.price,
                    size:vm.editProduct.size,
                    shape:vm.editProduct.shape,
                    description:vm.editProduct.description,
                    highlight:vm.editProduct.highlight,
                    imageLink:vm.editProduct.imageLink,
                }).then(()=>{
                    if(vm.filename != vm.editProduct.imageLink)
                    {
                        let ontask = firebase.storage().ref('products/' + vm.idOfEdit + '/image.jpg').put(vm.filename)
                        let children = firebase.storage().ref('products/')
                        ontask.on('state_changed', function(){
                                vm.success = "Uploading"
                        }, function(error) {
                            vm.feedback = "Something Went Worng! Please try Again!" + error
                        }, function() {
                            vm.success = 'SuccessFully Uploaded Image & Data'
                            children.child(vm.idOfEdit + '/image.jpg').getDownloadURL().then(function(downloadURL) {
                                vm.editProduct.imageLink = downloadURL
                                db.collection('products').doc(vm.idOfEdit).update({
                                    imageLink:vm.editProduct.imageLink
                                }).then(() =>{
                                    vm.success = "Product Updated!"
                                    setTimeout(() => {
                                        vm.success = null
                                    }, 2000);
                                    vm.editProduct = []
                                    vm.idOfEdit = false
                                    vm.isEdit = false
                                })
                            });
                        });
                    }else{
                        vm.success = "Product Updated!"
                        setTimeout(() => {
                            vm.success = null
                        }, 2000);
                        vm.editProduct = []
                        vm.idOfEdit = false
                        vm.isEdit = false
                    }
                    $(window).off("beforeunload");
                }).catch(error=>{
                    vm.feedback = error.message
                })
            }
            else{
                this.feedback = "Please Fill all information"
            }
        },
        deleteProductConfirm(id){
            this.idofDelete = id
            this.reauthenticateWindow = true
            this.isDelete = true
        },
        deleteProduct(){
            var vm = this
            this.isDelete = false
            this.reauthenticateWindow = false
            let children = firebase.storage().ref('products/')
            
            db.collection("products").doc(this.idofDelete).delete().then(function() {
                children.child(vm.idofDelete + '/image.jpg').delete().then(function() {
                    vm.success = "Product successfully deleted!";
                    setTimeout(() => {
                        vm.success = null
                    }, 2000);
                }).catch(function(error) {
                    vm.feedback = "Error removing document: ", error;
                    setTimeout(() => {
                        vm.feedback = null
                    }, 2000);
                });
            }).catch(function(error) {
                vm.feedback = "Error removing document: ", error;
                setTimeout(() => {
                    vm.feedback = null
                }, 2000);
            });
        },
        // reauthenticateuser(){
        //     const reauthenticateform = document.querySelector('.reauthenticateform');
        //     var email = reauthenticateform['emailUser'].value;
        //     var password = reauthenticateform['userPass'].value;
        //     var credential = firebase.auth.EmailAuthProvider.credential(email, password);
        //     const user = firebase.auth().currentUser;
        //     var vm = this
        //     if (email == 'poojapatil7142@gmail.com') {
        //         user.reauthenticateWithCredential(credential).then(function() {
        //             vm.reauthenticateWindow = false
        //             vm.reauthenticate = false
        //             vm.isReauthneticated = true
        //         }).catch(function(error) {
        //             vm.reauthenticate = true
        //             console.log(error)
        //         });
        //     } else {
        //         this.reauthenticate = false
        //         this.isAdmin  = false
        //     }
            
        // },
    },
    watch:{
        name:{
            handler: 'ischanged',
            immediate: true
        },
        size:{
            handler: 'ischanged',
            immediate: true
        },
        shape:{
            handler: 'ischanged',
            immediate: true
        },
        price:{
            handler: 'ischanged',
            immediate: true
        },
        description:{
            handler: 'ischanged',
            immediate: true
        },
        imagelink:{
            handler: 'ischanged',
            immediate: true
        },
        highlight:{
            handler: 'ischanged',
            immediate: true
        },
        filename:{
            handler: 'ischanged',
            immediate: true
        },
    },
    mounted(){
        document.documentElement.scrollTop = 0
        firebase.auth().onAuthStateChanged(user =>{
           if(user)
           {
                // if (user.email == 'poojapatil7142@gmail.com') {
                //     this.reauthenticate = true
                //     this.isAdmin  = true
                // } else {
                //     this.reauthenticate = false
                //     this.isAdmin  = false
                // }
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
    }
}
</script>
