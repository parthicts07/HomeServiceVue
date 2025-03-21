<template>
    <div class="container mt-4">
      <h2>My Payments</h2>
      <div v-if="payments.length">
        <div class="row">
          <div class="col-md-4" v-for="payment in payments" :key="payment.id">
            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title">Booking ID: {{ payment.booking }}</h5>
                <p class="card-text"><strong>Amount:</strong> ₹{{ payment.amount }}</p>
                <p class="card-text"><strong>Tips:</strong> ₹{{ payment.tips }}</p>
                <p class="card-text"><strong>Grand Total:</strong> ₹{{ payment.grand_total }}</p>
                <p class="card-text"><strong>Transaction ID:</strong> {{ payment.transaction_id }}</p>
                <p class="card-text"><strong>Status:</strong> {{ payment.status }}</p>
                <p class="card-text"><strong>Date:</strong> {{ new Date(payment.created_at).toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No payments found.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        payments: []
      };
    },
    async created() {
      this.fetchPayments();
    },
    methods: {
      async fetchPayments() {
        try {
          const response = await fetch('http://127.0.0.1:5000/customers/myPayments', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('custToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.payments = data.payments;
          } else {
            alert('Failed to load payments');
          }
        } catch (error) {
          console.error('Error fetching payments:', error);
          alert('An error occurred while fetching the payments.');
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