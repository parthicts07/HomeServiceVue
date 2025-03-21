<template>
    <div class="container">
      <h1>My Payments</h1>
      <div v-if="payments.length === 0" class="no-payments">
        No payments found.
      </div>
      <div v-for="payment in payments" :key="payment.payment_id" class="card">
        <h2>Payment ID: {{ payment.payment_id }}</h2>
        <p>Customer Name: {{ payment.customer_name }}</p>
        <p>Package Name: {{ payment.package_name }}</p>
        <p>Status: {{ payment.status }}</p>
        <p>Payment Date: {{ payment.payment_date }}</p>
        <p>Amount: ₹{{ payment.amount }}</p>
        <p>Tips: ₹{{ payment.tips }}</p>
        <p>Grand Total: ₹{{ payment.grand_total }}</p>
        <p>Transaction ID: {{ payment.transaction_id }}</p>
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
    created() {
      this.fetchPayments();
    },
    methods: {
      async fetchPayments() {
        try {
          const token = localStorage.getItem('profToken');
          const response = await fetch('http://127.0.0.1:5000/professionals/myPayments', {
            headers: {
              'Authorization': `Bearer ${token}`
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
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  .card {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 16px 0;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .no-payments {
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