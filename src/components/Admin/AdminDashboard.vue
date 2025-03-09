<template>
    <div id="AdminDashboard">
        <AdminNavbar/>
        <router-view/>
    </div>
</template>

<script>
import AdminNavbar from './AdminNavbar';

export default {
    name: 'AdminrDashboard',
    components: {
        AdminNavbar,
    }
};
</script>

<style>

</style>