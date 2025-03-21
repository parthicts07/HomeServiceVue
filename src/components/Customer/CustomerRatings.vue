<template>
    <div class="container mt-4">
      <h2>My Ratings</h2>
      <div v-if="ratings.length">
        <div class="row">
          <div class="col-md-4" v-for="rating in ratings" :key="rating.id">
            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title">{{ rating.reviewer_name }}</h5>
                <p class="card-text"><strong>Rating:</strong> {{ rating.rating }}</p>
                <p class="card-text"><strong>Review:</strong> {{ rating.review }}</p>
                <p class="card-text"><strong>Date:</strong> {{ new Date(rating.created_at).toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No ratings found.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ratings: []
      };
    },
    async created() {
      this.fetchRatings();
    },
    methods: {
      async fetchRatings() {
        try {
          const response = await fetch('http://127.0.0.1:5000/customers/myRatings', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('custToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.ratings = data.ratings;
            console.log(this.ratings);
          } else {
            alert('Failed to load ratings');
          }
        } catch (error) {
          console.error('Error fetching ratings:', error);
          alert('An error occurred while fetching the ratings.');
        }
      }
    }
  };
  </script>
  
  <style>
  .card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .card-body {
    padding: 20px;
  }
  </style>