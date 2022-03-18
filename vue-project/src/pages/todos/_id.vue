<template>
  <div>
    <h1 class="py-4 font-black text-3xl">TO DO PAGE</h1>
    <div v-if="loading">
      loading....
    </div>
    <form v-else>
      <div class="h-24 py-2 flex flex-col justify-between">
        <label>Todo subject</label>
        <input v-model="todo.subject" type="text" class="form-control">
      </div>
      <button class="btn bg-slate-500 text-white">Save</button>
    </form>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';
import { ref } from '@vue/reactivity';

export default {
  setup() {
    const route = useRoute();
    const todo = ref(null);
    const loading = ref(true);

    const getTodo = async () => {
      const response = await axios.get('http://localhost:3000/todos/' + route.params.id);

      todo.value = response.data;
      loading.value = false;
    }

    getTodo();
    //console.log(route.params.id);
    
    return {
      todo,
      loading
    }
  }
}
</script>

<style>

</style>