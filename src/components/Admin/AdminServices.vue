<template>
    <div class="admin-services">
      <h1>Admin Services</h1>
      <div v-if="services">
        <ul>
          <li v-for="service in services" :key="service.id" class="service-item">
            <img :src="service.service_picture_url || defaultServicePic" alt="Service Picture" class="service-pic" />
            <div class="service-details">
              <p><strong>Name:</strong> {{ service.name }}</p>
              <p><strong>Professional:</strong> {{ service.professional }}</p>
              <p><strong>Flagged:</strong> {{ service.is_flagged ? 'Yes' : 'No' }}</p>
              <button @click="toggleFlag(service.id, service.is_flagged)" class="flag-button">
                {{ service.is_flagged ? 'Unflag' : 'Flag' }}
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Loading services...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        services: null,
        defaultServicePic: 'http://localhost:5000/static/uploads/default-service.png'
      };
    },
    created() {
      this.fetchServices();
    },
    methods: {
      async fetchServices() {
        try {
          const response = await fetch('http://127.0.0.1:5000/admin/getAllServices', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.services = data.services;
          } else {
            alert('Failed to load services');
          }
        } catch (error) {
          console.error('Error fetching services:', error);
          alert('An error occurred while fetching the services.');
        }
      },
      async toggleFlag(serviceId, isFlagged) {
        const url = isFlagged
          ? `http://127.0.0.1:5000/admin/unflag/service/${serviceId}`
          : `http://127.0.0.1:5000/admin/flag/service/${serviceId}`;
        try {
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.fetchServices(); 
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
  .admin-services {
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
  
  .service-item {
    border: 1px solid #ccc;
    margin: 10px 0;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    background-color: #fff;
  }
  
  .service-pic {
    max-width: 100px;
    border-radius: 10px;
    margin-right: 20px;
  }
  
  .service-details {
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