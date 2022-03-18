 <template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- router-link를 통해 페이지간 이동 -->
      <router-link class="navbar-brand font-bold" :to="{ name: 'Home' }">SUMMER WORLD</router-link>

      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <router-link class="nav-link font-bold" :to="{ name: 'Todos' }">TODOS</router-link>
        </li>
      </ul>
    </nav>
  
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  
};
</script>

<style></style>
