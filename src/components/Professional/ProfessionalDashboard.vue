<template>
    <div id="ProfessionalDashboard">
      <ProfessionalNavbar/>
      <div class="container mt-4">
        <h2>Welcome to the Professional Dashboard!</h2>
        <p>Here you can manage your profile and bookings.</p>
      </div>
      <router-view/>
    </div>
</template>

<script>
import ProfessionalNavbar from './ProfessionalNavbar';

export default {
    name: 'ProfessionalDashboard',
    components: {
      ProfessionalNavbar,
    }
};
</script>

<style>

</style>