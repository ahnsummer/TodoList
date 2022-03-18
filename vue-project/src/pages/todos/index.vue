<template>
  <div class="py-4">
    <h1 class="text-5xl font-black mb-3">TO DO LIST</h1>
    <input type="text" 
               class="border-solid border-1 border-black form-control" 
               v-model="searchText" 
               placeholder="Search"
               @keyup.enter="searchTodo"
    >
    <hr class="my-2">
    <TodoSimpleForm @add-todo="addTodo" />
    <div class="text-red-500">{{ error }}</div>
    <div v-if="!todos.length">
      There is nothing to display 
    </div>
    <TodoList 
      :todos="todos"
      @toggle-todo="toggleTodo" 
      @delete-todo="deleteTodo" 
    />
    <hr class="my-2">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"
            v-if="currentPage !== 1"
        >
          <a class="page-link cursor-pointer" @click="getTodos(currentPage - 1)">Previous</a>
        </li>
        <li class="page-item" 
            v-for="page in numberOfPages" 
            :key="page"
            :class="currentPage === page ? 'active' : ''"
        >
          <a class="page-link cursor-pointer" @click="getTodos(page)">{{ page }}</a>
        </li>
        <li class="page-item"
            v-if="numberOfPages !== currentPage"
        >
          <a class="page-link cursor-pointer" @click="getTodos(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import TodoSimpleForm from "../../components/TodoSimpleForm.vue";
import TodoList from '../../components/TodoList.vue';
import axios from 'axios';

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    const todos = ref([]);
    const error = ref('');
    const numberOfTotos = ref(0);
    let limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTotos.value/limit);
    });

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray',
    };

    // watch(currentPage, (currentPage, prev) => {
    //  console.log(currentPage, prev);
    // });

    // watchEffect(() => {
    //   console.log(limit);
    // });

/*
    const a = reactive({
      b: 1,
    });

    watchEffect(() => {
      console.log(a.b);
    });
    a.b = 4;
*/
    
    /**
     * computed와 method를 사용할 때 어떤 차이점이 있을까
     * 1. method는 인자로 값을 받아와서 함수안에서 사용가능
     *    compyted는 인자로 받아올 수 없음 , 
     *    computed는 함수안에 reactive state가 있고, reactive state가 변경 될 때에만 그 값을 변수에 저장을 함.
     * 2. computed는 값을 캐시를한다. 한번 계산하면 그 값을 저장을 하고있다.
     */

    // const filteredTodos = computed(() => {
    //   if (searchText.value) {
    //     return todos.value.filter(todo => {
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }

    //   return todos.value;
    // });

    // const doubleCountMethod = (name) => {
    //   return count.value * name;
    // }

    // const filteredTodos = ref(null);

    // watch(todos, () => {
    //   if (searchText.value) {
    //     filteredTodos.value =  todos.value.filter(todo => {
    //       filteredTodos.value = todo.subject.includes(searchText.value);
    //     });
    //   }

    //   filteredTodos.value = todos.value;
    // });

    // watch(searchText, () => {
    //   if (searchText.value) {
    //     filteredTodos.value =  todos.value.filter(todo => {
    //       filteredTodos.value =  todo.subject.includes(searchText.value);
    //     });
    //   }

    //   filteredTodos.value = todos.value;
    // })
    
    // 데이터베이스에 todo 저장
    const addTodo = async (todo) => {
      error.value = '';

      try {
        await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed,
        });

        //todos.value.push(res.data);
        getTodos(1);
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong.';
      }
      /*
      ----async를 사용안한다면----
        .then(res => {
          console.log(res);
          todos.value.push(res.data);
        }).catch(err => {
          console.log(err);
          error.value = 'Something went wrong.';
        });
      */
    };

    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    }

    // todos 검색하기
    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 500)
    });

    // 데이터베이스에서 todos불러오기
    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;

      try {
        const res = await axios.get(`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);  
        numberOfTotos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (err) {
        error.value = 'Something went wrong.';
      }
    };
    getTodos();

    // 데이터베이스에서 todos삭제하기
    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.delete('http://localhost:3000/todos/' + id);

        //todos.value.splice(index, 1);
        getTodos(1);
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong.';
      }
    };

    // 데이터베이스에서 toggle하기
    const toggleTodo = async (index, checked) => {
      console.log(checked);

      const id = todos.value[index].id;
      try {
        // 데이터 업데이트
        await axios.patch('http://localhost:3000/todos/' + id, {
          completed: checked
        });
        
        // 배열 업데이트
        todos.value[index].completed = checked;
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong.';
      }
    };

    return {
      todos,
      todoStyle,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      //filteredTodos,
      error,
      getTodos,
      numberOfPages,
      currentPage,
      searchTodo,
    };
  }
};
</script>

<style>
  .todo{
    color: gray;
    text-decoration: line-through;
  }
</style>