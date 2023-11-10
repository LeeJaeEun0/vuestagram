<template>
<div style="padding : 10px">
  <h4>팔로워</h4>
  <input placeholder="?" />
  <div class="post-header">
    <div class="profile" style="background-image:url()"></div>
    <span class="profile-name">{{follwer}}</span>
  </div>
</div>
</template>
<script>

import axios from 'axios';
import { onMounted, ref } from 'vue';
export default {
    name: "TheMyPage",
    setup(){
        // 데이터 생성
        let follwer = ref([]); // ref(0) //실시간 재랜더링을 위함
        
        onMounted(()=>{
            axios.get('/follwer.json').then((a)=>{
                follwer.value= a.data
            })
        })
        
        
        return {follwer}

    }
}
</script>

<style>

</style>