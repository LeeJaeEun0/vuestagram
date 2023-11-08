<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step==1" @click="step++">Next</li>
      <li v-if="step==2" @click="publish">Next</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>
  <h4>안녕 {{$store.state.name}}</h4>
  <button @click="$store.commit('이름변경')">이름변경</button>
  <!-- <h4>안녕 {{$store.state.age}}</h4>
  <button @click="$store.commit('나이변경')"></button> -->
  <h4>안녕 {{$store.state.age}}</h4>
  <button @click="나이변경(10)"></button>
  <p>{{$store.state.more}}</p>
  <button @click="$store.dispatch('getData')">더보기 버튼</button>
  <p>{{name}} {{age}} {{likes}}</p>
  <p>{{내이름}}</p>
  <Container :게시물='게시물' :step="step" :이미지="이미지" @write="작성글 = $event"/>
  <!-- <button @click="more">더보기</button> -->
  <!-- <div class="sample-box">임시박스</div> -->
  <p>{{now()}} {{카운터}}</p>
  <button @click="카운터++"></button>
  <p>{{now2}} {{카운터2}}</p>
  <button @click="카운터2++"></button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input type="file"  @change="upload" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
 </div>

 <!-- <div v-if="step == 0">내용0</div>
 <div v-if="step == 1">내용1</div>
 <div v-if="step == 2">내용2</div>
 <button @click="step=0">버튼0</button>
 <button @click="step=1">버튼1</button>
 <button @click="step=2">버튼2</button> -->
 <div style="margin-top : 500px"></div>
</template>

<script>
import Container from './components/Container.vue';
import postdata from './assets/postdata.js'
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';


export default {
  name: 'App',
  data(){
    return {
      게시물:postdata,
      count: 0,
      step:0,
      이미지 : '',
      작성글: '',
      filter:'',
      카운터 : 0,
      카운터2 : 0
    }
  },mounted(){
    this.emitter.on('filter', (a)=>{
      console.log(a)
      this.filter=a
    })
  },
  components: {
    Container : Container,
  },
  computed:{ //return을 필수로 사용
    now2(){ // 페이지를 처음 로드될때 한번만 실행
      return new Date()
    },
    name(){
      return this.$store.state.name
    },
    ...mapState(['name','age','likes']), // 위의 것 축약
    ...mapState({내이름: 'name'}), // 위의 것 축약
  
  }
  ,
  methods :{ // 사용할때마다 실행
    ...mapMutations(['setMore', '좋아요', '나이변경2']),
    now(){ // 현재시간 출력하는 함수
      return new Date()
    },
    publish(){
      var 내게시물 = {
      name: "Kim Hyun",
      userImage: "https://picsum.photos/100?random=3",
      postImage: this.이미지,
      likes: 36,
      date: "May 15",
      liked: false,
      content: this.작성글,
      filter: this.filter
    };
      this.게시물.unshift(내게시물);//작성한 글을 맨 앞에 추가
      this.step = 0;
    },
    more(){
      // axios.post('URL',{name:"kIM"}).then(성공).catch((실패 err)=>{err은 에러메시지})

      axios.get(`https://codingapple1.github.io/vue/more${this.count}.json`)
      // .then(function(결과){
      //   // 요청 성공시 실행할 코드
      //   console.log(결과.data)
      // })
      .then((결과)=>{ //this의 재정의를 위함
        // 요청 성공시 실행할 코드
        this.게시물.push(결과.data); // 게시물array에 push로 게시물 추가
        this.count++;
      })

    },
    upload(e){
      let 파일 = e.target.files;
      console.log(파일[0]);
      console.log(파일[0].type);
      let url=URL.createObjectURL(파일[0]);
      console.log(url)
      this.이미지 =url;
      this.step++;
    }
  }
}
</script>

<style>
@import 'style.css';
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
  /* text-align:center; */
}
</style>
