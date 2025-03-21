<!-- <template>
    <div class="admin-users">
      <h1>Admin Users</h1>
      <div v-if="users">
        <h2>Customers</h2>
        <ul>
          <li v-for="customer in users.customers" :key="customer.id">
            <img :src="customer.profile_pic_url || defaultProfilePic" alt="Profile Picture" />
            <p><strong>Name:</strong> {{ customer.name }}</p>
            <p><strong>Email:</strong> {{ customer.email }}</p>
            <p><strong>Phone:</strong> {{ customer.phone }}</p>
            <p><strong>DOB:</strong> {{ customer.dob }}</p>
            <p><strong>Address:</strong> {{ customer.address }}</p>
            <p><strong>City:</strong> {{ customer.city }}</p>
            <p><strong>State:</strong> {{ customer.state }}</p>
            <p><strong>Zipcode:</strong> {{ customer.zipcode }}</p>
          </li>
        </ul>
        <h2>Professionals</h2>
        <ul>
          <li v-for="professional in users.professionals" :key="professional.id">
            <img :src="professional.profile_pic_url || defaultProfilePic" alt="Profile Picture" />
            <p><strong>Name:</strong> {{ professional.name }}</p>
            <p><strong>Email:</strong> {{ professional.email }}</p>
            <p><strong>Phone:</strong> {{ professional.phone }}</p>
            <p><strong>Bio:</strong> {{ professional.bio }}</p>
            <p><strong>Experience Years:</strong> {{ professional.experience_years }}</p>
            <p><strong>Skills:</strong> {{ professional.skills }}</p>
            <p><strong>Service:</strong> {{ professional.service }}</p>
            <p><strong>Nationality:</strong> {{ professional.nationality }}</p>
            <p><strong>Aadhar Card:</strong> {{ professional.aadhar_card }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Loading users...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: null,
        defaultProfilePic: 'http://localhost:5000/static/uploads/dummy.jpg'
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await fetch('http://127.0.0.1:5000/admin/getAllUsers',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.users = data;
            console.log(users);
          } else {
            alert('Failed to load users');
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          alert('An error occurred while fetching the users.');
        }
      }
    }
  };
  </script>
  
  <style>
  .admin-users {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  h1, h2 {
    text-align: center;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    border: 1px solid #ccc;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
  }
  
  img {
    max-width: 100px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  p {
    margin: 5px 0;
  }
  </style> -->
  <template>
    <div class="admin-users">
      <h1>Admin Users</h1>
      <div v-if="users">
        <h2>Customers</h2>
        <ul>
          <li v-for="customer in users.customers" :key="customer.id" class="user-item">
            <img :src="customer.profile_pic_url || defaultProfilePic" alt="Profile Picture" class="profile-pic" />
            <div class="user-details">
              <p><strong>Name:</strong> {{ customer.name }}</p>
              <p><strong>Email:</strong> {{ customer.email }}</p>
              <p><strong>Phone:</strong> {{ customer.phone }}</p>
              <p><strong>DOB:</strong> {{ customer.dob }}</p>
              <p><strong>Address:</strong> {{ customer.address }}</p>
              <p><strong>City:</strong> {{ customer.city }}</p>
              <p><strong>State:</strong> {{ customer.state }}</p>
              <p><strong>Zipcode:</strong> {{ customer.zipcode }}</p>
              <p><strong>Flagged:</strong> {{ customer.is_flagged ? 'Yes' : 'No' }}</p>
              <button @click="toggleFlag(customer.id, customer.is_flagged)" class="flag-button">
                {{ customer.is_flagged ? 'Unflag' : 'Flag' }}
              </button>
            </div>
          </li>
        </ul>
        <h2>Professionals</h2>
        <ul>
          <li v-for="professional in users.professionals" :key="professional.id" class="user-item">
            <img :src="professional.profile_pic_url || defaultProfilePic" alt="Profile Picture" class="profile-pic" />
            <div class="user-details">
              <p><strong>Name:</strong> {{ professional.name }}</p>
              <p><strong>Email:</strong> {{ professional.email }}</p>
              <p><strong>Phone:</strong> {{ professional.phone }}</p>
              <p><strong>Bio:</strong> {{ professional.bio }}</p>
              <p><strong>Experience Years:</strong> {{ professional.experience_years }}</p>
              <p><strong>Skills:</strong> {{ professional.skills }}</p>
              <p><strong>Service:</strong> {{ professional.service }}</p>
              <p><strong>Nationality:</strong> {{ professional.nationality }}</p>
              <p><strong>Aadhar Card:</strong> {{ professional.aadhar_card }}</p>
              <p><strong>Flagged:</strong> {{ professional.is_flagged ? 'Yes' : 'No' }}</p>
              <button @click="toggleFlag(professional.id, professional.is_flagged)" class="flag-button">
                {{ professional.is_flagged ? 'Unflag' : 'Flag' }}
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Loading users...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: null,
        defaultProfilePic: 'http://localhost:5000/static/uploads/dummy.jpg'
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await fetch('http://127.0.0.1:5000/admin/getAllUsers', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.users = data;
          } else {
            alert('Failed to load users');
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          alert('An error occurred while fetching the users.');
        }
      },
      async toggleFlag(userId, isFlagged) {
        const url = isFlagged
          ? `http://127.0.0.1:5000/admin/unflag/user/${userId}`
          : `http://127.0.0.1:5000/admin/flag/user/${userId}`;
        try {
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.fetchUsers(); // Refresh the user list
          } else {
            alert('Failed to update flag status');
          }
        } catch (error) {
          console.error('Error updating flag status:', error);
          alert('An error occurred while updating the flag status.');
        }
      }
    }
  };
  </script>
  
  <style>
  .admin-users {
    max-width: 1000px;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1, h2 {
    text-align: center;
    color: #333;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  .user-item {
    border: 1px solid #ccc;
    margin: 10px 0;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    background-color: #fff;
  }
  
  .profile-pic {
    max-width: 100px;
    border-radius: 50%;
    margin-right: 20px;
  }
  
  .user-details {
    flex: 1;
  }
  
  p {
    margin: 5px 0;
  }
  
  .flag-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
  }
  
  .flag-button:hover {
    background-color: #0056b3;
  }
  </style>