<template>
  <div id="app">
    <NavBar v-if="store.showNavBar && !isCustomerRoute"/>
    <CustomerNavbar v-if="isCustomerRoute"/>
    <router-view/>
  </div>
</template>

<script>
import { computed } from 'vue';
import NavBar from './components/NavBar.vue';
import CustomerNavbar from './components/Customer/CustomerNavbar.vue';
import { store } from './store';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  components: {
    NavBar, 
    CustomerNavbar
  },
  setup() {
    const route = useRoute();
    const isCustomerRoute = computed(() => ['/customerhome', '/customerProfile', '/customerBooking'].includes(route.path));
    return { store, isCustomerRoute };
  }
}
</script>