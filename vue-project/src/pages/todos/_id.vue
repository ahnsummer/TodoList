<template>
  <div>
    <h1 class="py-4 font-black text-3xl">TO DO PAGE</h1>
    <div v-if="loading">
      loading....
    </div>
    <form v-else>
      <div class="row">
        <div class="col-6">
          <div class="h-24 py-2 flex flex-col justify-between">
            <label class="font-bold">Subject</label>
            <input v-model="todo.subject" type="text" class="form-control">
          </div>
        </div>
        <div class="col-6">
          <div class="h-24 py-2 flex flex-col justify-between">
            <label class="font-bold">Status</label>
            <div>
              <button 
                class="btn"
                type="button"
                :class="todo.completed ? 'bg-sky-600 text-white font-semibold' : 'bg-pink-500 text-white font-semibold'"
                @click="toggleTodoStatus"
              >
                {{ todo.completed ? 'Completed' : 'Incompleted'}}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <button type="submit" class="btn bg-green-500 text-white font-semibold">
        Save
      </button>
      <button 
        class="ml-2 btn bg-red-500 text-white font-semibold"
        @click="moveToTodoListPage"
      >
        Cancle
      </button>
    </form>
  </div>
</template>

<script>
import { useRoute,useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from '@vue/reactivity';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const loading = ref(true);

    const getTodo = async () => {
      const response = await axios.get('http://localhost:3000/todos/' + route.params.id);

      todo.value = response.data;
      loading.value = false;
    };

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };
    
    const moveToTodoListPage = () => {
      router.push({
        name: 'Todos'
      })
    };

    getTodo();
    
    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
    };
  }
}
</script>

<style>

</style>