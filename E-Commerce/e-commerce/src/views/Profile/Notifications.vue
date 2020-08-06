<template>
  <div>
    <profile1>
        <template slot="mainPart">
            <h3><strong>All Notifications</strong></h3>
            <hr>
            <p>{{token}}</p>
            <ul v-for="(notification,index) in notifications" :key="index" class="notifications" align="left">
                <li><h4>Your 1st Nofications</h4></li>
                <hr>
            </ul>
        </template>
    </profile1>
  </div>
</template>

<script>
import profile from './Profile'
export default {
    name: 'Notifications',
    components:{
        profile1:profile,
    },
    data(){
        return{
            notifications:[1,2,3,4,5,6,7],
            token:''
        }
    },
    mounted(){
       
    }
}
</script>

<style lang="scss" scoped>
.notifications{
    margin:15px;
}
li{
    margin:5px 15px;
    padding:auto 0;
}
li h4{
    font-size: 1.2rem;
}
@media screen and (max-width:568px) {
    li{
    margin:5px 0px;
    padding:auto 0;
}
}
</style>