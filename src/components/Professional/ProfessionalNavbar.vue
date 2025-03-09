<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/">Professional Dashboard</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/ProfessionalHome">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/ProfessionalProfile">Profile</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/ProfessionalBooking">Bookings</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/ProfessionalAppointments">Appointments</router-link>
          </li>
        </ul>
        <button class="btn btn-outline-danger my-2 my-sm-0" @click="logout">Logout</button>
      </div>
    </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('profToken');
      this.$router.push('/');
    }
  }
}
</script>

<style>
.navbar-nav {
  flex-grow: 1;
}
.btn-outline-danger {
  margin-left: auto;
}
</style>