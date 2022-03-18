<template>
  <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id" >
    <div 
      class="card-body p-2 d-flex align-items-center cursor-pointer"
      @click="moveToPage(todo.id)"
    >
      <div class="form-check flex-grow-1">
        <input 
          class="form-check-input" 
          type="checkbox" 
          :checked="todo.completed" 
          @change="toggleTodo(index, $event)"
          @click.stop
        >
        <!-- style 바인딩 -->
        <!-- <label class="form-check-label" :style="todo.completed ? todoStyle : {}">{{ todo.subject }}</label> -->
        <!-- class 바인딩 -->
        <label 
          class="form-check-label cursor-pointer" 
          :class="{ todo: todo.completed }"
        >
          {{ todo.subject }}
        </label>
      </div>
      <div>
        <button 
          class="btn btn-sm bg-indigo-500 text-white font-semibold" 
          @click.stop="deleteTodo(index)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    }
  },
  emits: [
    'toggle-todo', 
    'delete-todo'
  ],
  setup(props, { emit }) {

    const router = useRouter();

    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked);
    };

    const deleteTodo = (index) => {
      emit('delete-todo', index);
    };

    const moveToPage = (todoId) => {
      console.log(todoId);
      // router.push('/todos/' + todoId);
      // 위 로직을 100군데 이상에서 사용한다고 가정을한다면 수정할때 어렵다.
      router.push({
        name: 'Todo',
        params: {
          id: todoId
        }
      });
    };
    
    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
    };
    
  }
};
</script>

<style>

</style>