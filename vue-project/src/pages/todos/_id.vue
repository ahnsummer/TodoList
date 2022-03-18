<template>
  <div>
    <h1 class="py-4 font-black text-3xl">TO DO PAGE</h1>
    <form>
    <div class="h-24 py-2 flex flex-col justify-between">
      <label>Todo subject</label>
      <input type="text" class="form-control">
    </div>
    <button class="btn bg-slate-500 text-white">Save</button>
  </form>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const route = useRoute();

    const getTodo = async () => {
      const res = await axios.get('http://localhost:3000/todos/' + route.params.id);

      console.log(res);
    }

    getTodo();
    console.log(route.params.id);
  }
}
</script>

<style>

</style>