<template>
    <div class="container">
      <h1>My Ratings</h1>
      <div class="average-rating">
        <h2>Average Rating: {{ averageRating }}</h2>
      </div>
      <div v-if="professionalRatings.length === 0" class="no-ratings">
        No ratings found for the professional.
      </div>
      <div v-for="rating in professionalRatings" :key="rating.reviewer_id" class="card">
        <h2>Reviewer: {{ rating.reviewer_name }}</h2>
        <p>Rating: {{ rating.rating }}</p>
        <p>Review: {{ rating.review }}</p>
        <p>Date: {{ rating.created_at }}</p>
      </div>
      <div class="average-rating">
        <h2>Average Package Rating: {{ averagePackageRating }}</h2>
      </div>
      <div v-if="packageRatings.length === 0" class="no-ratings">
        No ratings found for the packages.
      </div>
      <div v-for="rating in packageRatings" :key="rating.reviewer_id" class="card">
        <h2>Reviewer: {{ rating.reviewer_name }}</h2>
        <p>Package: {{ rating.package_name }}</p>
        <p>Rating: {{ rating.rating }}</p>
        <p>Review: {{ rating.review }}</p>
        <p>Date: {{ rating.created_at }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        averageRating: 0,
        professionalRatings: [],
        averagePackageRating: 0,
        packageRatings: []
      };
    },
    created() {
      this.fetchProfessionalRatings();
      this.fetchPackageRatings();
    },
    methods: {
      async fetchProfessionalRatings() {
        try {
          const token = localStorage.getItem('profToken');
          const response = await fetch('http://127.0.0.1:5000/professionals/myRatings', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.averageRating = data.average_rating;
            this.professionalRatings = data.ratings;
          } else {
            alert('Failed to load professional ratings');
          }
        } catch (error) {
          console.error('Error fetching professional ratings:', error);
          alert('An error occurred while fetching the professional ratings.');
        }
      },
      async fetchPackageRatings() {
        try {
          const token = localStorage.getItem('profToken');
          const response = await fetch('http://127.0.0.1:5000/professionals/packageRatings', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.averagePackageRating = data.average_rating;
            this.packageRatings = data.ratings;
          } else {
            alert('Failed to load package ratings');
          }
        } catch (error) {
          console.error('Error fetching package ratings:', error);
          alert('An error occurred while fetching the package ratings.');
        }
      }
    }
  };
  </script>
  
  <style>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  .average-rating {
    text-align: center;
    margin: 20px 0;
  }
  
  .card {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 16px 0;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .no-ratings {
    text-align: center;
    margin: 20px 0;
  }
  
  h2 {
    font-size: 1.5em;
  }
  
  p {
    font-size: 1em;
  }
  </style>