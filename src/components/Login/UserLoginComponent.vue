<!-- <template>
    <div class="container">
        <h2>User Login</h2>
        <form>
            <label class="form-label">Username</label>
            <input type="text" class="form-control w-50" placeholder="Enter username">
            <label class="form-label">Password</label>
            <input type="password" class="form-control w-50" placeholder="Enter password">
            <button class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style> -->

<template>
    <div class="container">
      <h2>User Login</h2>
      <form @submit.prevent="login">
        <label class="form-label">Username</label>
        <input v-model="username" type="text" class="form-control w-50" placeholder="Enter username">
        <label class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control w-50" placeholder="Enter password">
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async login() {
        const response = await fetch('http://127.0.0.1:5000/customers/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });
  
        const data = await response.json();
  
        if (data.success) {
          localStorage.setItem('custToken', data.token);
          alert('Login Successfull');
          this.$router.push('/customerHome'); 
        } else {
          alert('Login failed!');
        }
      }
    }
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>