<template>
  <form @submit.prevent="onSubmit">
    <div class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input type="text" 
               class="border-solid border-1 border-black form-control" 
               v-model="todo" 
               placeholder="Type new to-do"
        >
      </div>
      <div>
        <button class="btn bg-pink-400 border-pink-200 text-white font-semibold" type="submit"> Add </button>
      </div>
    </div>
    <div class="font-semibold text-red-600" v-show="hasError" >
      This field can not be empty!
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';

export default {
  emits: [
    'add-todo',
  ],
  setup(props, { emit }) {
    // props  : 부모component에서 자식component로 데이터 보내기
    // context: 자식component에서 부모component로 데이터 보내기
    const todo = ref('');
    const hasError = ref(false);

    const onSubmit = () => {
      //event.preventDefault(); //기본적인 refresh기능을을 방지하라.막아라
      //console.log(todo.value);
      if (todo.value === ''){
        hasError.value = true;
      }else{
        emit('add-todo', {
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        
        hasError.value = false;
        todo.value='';
      }
    };

    return {
        todo,
        hasError,
        onSubmit,
    };
  }
};
</script>

<style>

</style>