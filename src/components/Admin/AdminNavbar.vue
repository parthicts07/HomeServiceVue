<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" to="/">Admin Dashboard</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/adminHome">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/adminUsers">Users</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/adminServices">Services</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/adminPackages">Packages</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/adminBookings">Bookings</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/adminRequests">Requests</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/adminReports">Reports</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>