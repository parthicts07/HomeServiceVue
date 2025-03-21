 <template>
    <div class="container">
      <h2>Professional Login</h2>
      <form @submit.prevent="login">
        <label class="form-label">Username</label>
        <input v-model="username" type="text" class="form-control w-50" placeholder="Enter username">
        <label class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control w-50" placeholder="Enter password">
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await fetch('http://127.0.0.1:5000/professionals/login', {
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
  
          if (response.ok) {
            localStorage.setItem('profToken', data.token);
            alert('Login successful!');
            this.$router.push('/professionalHome'); 
          } else {
            this.errorMessage = data.message || 'Login failed!';
          }
        } catch (error) {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred during login. Please try again later.';
        }
      }
    }
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>