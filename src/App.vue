<!-- <template>
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
    const isCustomerRoute = computed(() => ['/customerhome', '/customerProfile', '/customerBooking', '/customerPayments', '/customerRatings'].includes(route.path));
    return { store, isCustomerRoute };
  }
}
</script> -->

<template>
  <div id="app">
    <NavBar v-if="store.showNavBar && !isCustomerRoute && !isProfessionalRoute"/>
    <CustomerNavbar v-if="isCustomerRoute"/>
    <ProfessionalNavbar v-if="isProfessionalRoute"/>
    <AdminNavbar v-if="isAdminRoute"/>
    <router-view/>
  </div>
</template>

<script>
import { computed } from 'vue';
import NavBar from './components/NavBar.vue';
import CustomerNavbar from './components/Customer/CustomerNavbar.vue';
import ProfessionalNavbar from './components/Professional/ProfessionalNavbar.vue';
import { store } from './store';
import { useRoute } from 'vue-router';
import AdminNavbar from './components/Admin/AdminNavbar.vue';

export default {
  name: 'App',
  components: {
    NavBar, 
    CustomerNavbar,
    ProfessionalNavbar,
    AdminNavbar
  },
  setup() {
    const route = useRoute();
    const isCustomerRoute = computed(() => ['/customerhome', '/customerProfile', '/customerBooking', '/customerPayments', '/customerRatings', '/customerPackages'].includes(route.path));
    // const isProfessionalRoute = computed(() => ['/professionalhome', '/professionalProfile', '/professionalBooking', '/professionalAppointments', '/professionalRatings', '/professionalService', '/professionalPackages'].includes(route.path));
    const isProfessionalRoute = computed(() => ['/professionalhome', '/professionalProfile', '/professionalBooking', '/professionalAppointment', '/professionalService', '/professionalPackages', '/professionalPayment', '/professionalRating'].some(path => route.path.startsWith(path)));
    const isAdminRoute = computed(() => ['/adminHome',  '/adminUsers', '/adminServices', '/adminPackages', '/adminRequests', '/adminReports', '/adminBookings'].includes(route.path));
    return { store, isCustomerRoute, isProfessionalRoute, isAdminRoute };
  }
}
</script>