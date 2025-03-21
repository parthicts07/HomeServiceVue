<template>
    <div class="admin-requests">
      <h1>Admin Requests</h1>
      <div v-if="professionals.length">
        <div v-for="professional in professionals" :key="professional.id" class="card">
          <div class="card-body">
            <h2>{{ professional.name }}</h2>
            <p><strong>Bio:</strong> {{ professional.bio }}</p>
            <p><strong>Experience Years:</strong> {{ professional.experience_years }}</p>
            <p><strong>Skills:</strong> {{ professional.skills }}</p>
            <p><strong>Service:</strong> {{ professional.service }}</p>
            <p><strong>Nationality:</strong> {{ professional.nationality }}</p>
            <p><strong>Aadhar Card:</strong> {{ professional.aadhar_card }}</p>
            <button @click="approveProfessional(professional.id)" class="approve-button">Approve</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No unapproved professionals found.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        professionals: []
      };
    },
    created() {
      this.fetchUnapprovedProfessionals();
    },
    methods: {
      async fetchUnapprovedProfessionals() {
        try {
          const response = await fetch('http://127.0.0.1:5000/admin/getUnApprovedProfessionals', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.professionals = data.professional;
          } else {
            alert('Failed to load unapproved professionals');
          }
        } catch (error) {
          console.error('Error fetching unapproved professionals:', error);
          alert('An error occurred while fetching the unapproved professionals.');
        }
      },
      async approveProfessional(professionalId) {
        try {
          const response = await fetch(`http://127.0.0.1:5000/admin/professionals/approve/${professionalId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.fetchUnapprovedProfessionals(); 
          } else {
            alert('Failed to approve professional');
          }
        } catch (error) {
          console.error('Error approving professional:', error);
          alert('An error occurred while approving the professional.');
        }
      }
    }
  };
  </script>
  
  <style>
  .admin-requests {
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
  
  .card {
    border: 1px solid #ccc;
    margin: 10px 0;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
  }
  
  .card-body {
    display: flex;
    flex-direction: column;
  }
  
  h2 {
    margin-top: 0;
  }
  
  p {
    margin: 5px 0;
  }
  
  .approve-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #28a745;
    color: white;
    align-self: flex-start;
  }
  
  .approve-button:hover {
    background-color: #218838;
  }
  </style>