<template>
    <div class="admin-packages">
      <h1>Admin Packages</h1>
      <div v-if="packages">
        <ul>
          <li v-for="pkg in packages" :key="pkg.id" class="package-item">
            <div class="package-details">
              <p><strong>Name:</strong> {{ pkg.name }}</p>
              <p><strong>Price:</strong> ₹{{ pkg.price }}</p>
              <p><strong>Details:</strong> {{ pkg.details }}</p>
              <p><strong>Service ID:</strong> {{ pkg.service_id }}</p>
              <p><strong>Flagged:</strong> {{ pkg.is_flagged ? 'Yes' : 'No' }}</p>
              <button @click="toggleFlag(pkg.id, pkg.is_flagged)" class="flag-button">
                {{ pkg.is_flagged ? 'Unflag' : 'Flag' }}
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Loading packages...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        packages: null
      };
    },
    created() {
      this.fetchPackages();
    },
    methods: {
      async fetchPackages() {
        try {
          const response = await fetch('http://127.0.0.1:5000/admin/getAllPackages', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.packages = data.packages;
          } else {
            alert('Failed to load packages');
          }
        } catch (error) {
          console.error('Error fetching packages:', error);
          alert('An error occurred while fetching the packages.');
        }
      },
      async toggleFlag(packageId, isFlagged) {
        const url = isFlagged
          ? `http://127.0.0.1:5000/admin/unflag/package/${packageId}`
          : `http://127.0.0.1:5000/admin/flag/package/${packageId}`;
        try {
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.fetchPackages();
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
  .admin-packages {
    max-width: 1000px;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #333;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  .package-item {
    border: 1px solid #ccc;
    margin: 10px 0;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
  }
  
  .package-details {
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