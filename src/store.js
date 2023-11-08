import { createStore } from 'vuex'

const store = createStore({
  state(){
    return {
      name:'kim',
      age : 20,
      likes : 20,
      like : false
    }
  },
  mutations :{ // state를 변경할때 사용
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
    }
  }
})

export default store