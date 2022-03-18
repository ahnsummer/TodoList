<template>
  <h1 class="text-2xl font-black">- 버튼에 이벤트리스너 추가하기</h1>

  <!-- vue3는 element로 element를 감싸지 않아도 밑으로 내려서 만들 수 있음 -->
  <div class="text-3xl font-black">{{ name }}</div>
  
  <div class="text-3xl text-emerald-700 font-black">
    {{ greeting(name) }}
    <!-- {{ greet }} -->
  </div>

  <!-- button에 eventlistener 추가하기 -->
  <button class="btn btn-primary" @click="updateName">
    Click
  </button>

  <!-- reactive / array -->
  <div class="text-3xl text-indigo-500 font-black">
    {{ array }}
  </div>

  <button class="btn bg-yellow-300 text-white" v-on:click="changeArray">
    Click2
  </button>
  
  <br>
  
  <hr>
  <!-- 데이터바인딩 = 데이터연결 -->
  <!-- 
    v:bind = :  
    v:on   = @
  -->
  <br>
  <h1 class="text-2xl font-bold"> - 단방향 데이터 바인딩 </h1>
  
  <div>
    <input class="border-solid border-1 border-indigo-600" :type="number" :value="name">
  </div>

  <div class="text-3xl font-black" :class="classOrange">{{ name }}</div>

  <button class="btn btn-primary" @click="updateName">
    Click
  </button>
  <br>
  <hr>
  <br>
  <h1 class="text-2xl font-bold"> - 양방향 데이터 바인딩 </h1>

  <div>
    <!-- <input class="border-solid border-1 border-pink-300" 
           type="text" 
           :value="binding"
           @input="userUpdate"
    > -->
    <input class="border-solid border-1 border-pink-300" 
           type="text"
           v-model="binding"
    >
  </div>

  <button class="btn bg-pink-300" @click="onSubmit">Click3</button>

  <!-- v-show : 초기 렌더 비용이 많이 듦 -->
  <div>
      <div v-show="toggle">true</div>
      <div v-show="!toggle">false</div>
      <button class="btn bg-yellow-200" @Click="onToggle">Toggle</button>
  </div>

  <!-- v-if : 애초에 조건에 만족하는 div만 렌더링해줌, toggle하는데 비용이 많이 듦 -->
  <div>
      <div v-if="toggle">true</div>
      <div v-else>false</div>
      <button class="btn bg-yellow-200" @Click="onToggle">Toggle</button>
  </div>
    
</template>

<script>
import { ref } from 'vue';
import { reactive } from 'vue';

export default {
  setup() {
    // 이벤트 : 어떤 행동을 했을 때 어떤 일이 일어난다 라는 의미 ex)버튼 클릭시 팝업창 
    // ref : 숫자, Sring, 오브젝트{}, 배열[] 등의 타입들을 쓸 수 있다.
    // reactive : 오브젝트, 배열(array)의 타입을 쓸 때 사용한다.
   
    const name = ref('SUMMER');
    // const greet = greeting(name);
    const number = ref('number');
    const classOrange = ref('');
    const binding = ref('binding');
    const toggle = ref(false);

    const greeting = (name) => {
      return 'HELLO, ' + name;
    };

    const array = reactive({
      id: 1
    })

    const changeArray = () => {
      array.id = 2;
    } 

    const updateName = () => {
      name.value = 'WINTER';
      number.value = 'text'
      classOrange.value = 'orange';
    };
    
    const onSubmit = () => {
      console.log(binding.value);
    }

    const userUpdate = (e) => {
      //console.log(e);
      //console.log(e.target.value);
      binding.value = e.target.value;
    }

    const onToggle = () => {
        toggle.value = !toggle.value;
    }
    
    return {
      name,
      greeting,
      //greet,
      updateName,
      array,
      changeArray,
      number,
      classOrange,
      onSubmit,
      binding,
      userUpdate,
      toggle,
      onToggle,
    };
  }
};
</script>

<style>
  .orange{
    color: orange;
  }
</style>
