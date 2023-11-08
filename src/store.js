import { createStore } from 'vuex'
import axios from 'axios'
const store = createStore({
  state(){
    return {
      name:'kim',
      age : 20,
      likes : 20,
      like : false,
      more: {}
    }
  },
  mutations :{ // state를 변경할때 사용, commit로 호출
    이름변경(state){
      state.name = 'park'
    },나이변경(state){
      state.age++;
    }, 나이변경2(state, payload){
      state.age += payload;
    }, 좋아요(state){
      if(state.like){
        state.likes--;
        state.like = false;
      }else{
        state.likes++;
        state.like = true;
      }
    },setMore(state, data){
      state.more = data
    }
  },
  actions :{ // dispatch로 호출가능, axios 사용하기 위함
    getData(context){
      axios.get('https://codingapple1.github.io/vue/more0.json')
      .then((a)=>{
         console.log(a.data);
         context.commit('setMore',a.data)
      })
    }
  }
})

export default store