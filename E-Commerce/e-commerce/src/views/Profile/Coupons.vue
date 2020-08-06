<template>
  <div>
    <profile1>
        <template slot="mainPart">
            <h1>This is an Coupons page</h1>
        </template>
    </profile1>
  </div>
</template>

<script>
import profile from './Profile'
export default {
    name: 'Coupons',
    components:{
        profile1:profile,
    },
    data(){
        return{
      
        }
    },
}
</script>

