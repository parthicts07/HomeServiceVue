<template>
    <div id="CustomerDashboard">
      <CustomerNavbar/>
      <div class="container mt-4">
        <h2>Welcome to the Customer Dashboard!</h2>
        <p>Here you can manage your profile and bookings.</p>
      </div>
      <router-view/>
    </div>
</template>

<script>
import CustomerNavbar from './CustomerNavbar';

export default {
    name: 'CustomerDashboard',
    components: {
        CustomerNavbar,
    }
};
</script>

<style>

</style>