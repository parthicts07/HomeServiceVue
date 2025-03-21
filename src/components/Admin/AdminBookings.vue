<template>
    <div class="admin-bookings">
      <h1>Admin Bookings</h1>
      <div v-if="bookings">
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Appointment Date</th>
              <th>Status</th>
              <th>Done Date</th>
              <th>Customer</th>
              <th>Package</th>
              <th>Professional</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookings" :key="booking.booking_id">
              <td>{{ booking.booking_id }}</td>
              <td>{{ booking.appointment_date }}</td>
              <td :class="statusClass(booking.status)">{{ booking.status }}</td>
              <td>{{ booking.done_date || 'N/A' }}</td>
              <td>{{ booking.customer.customer_name }}</td>
              <td>{{ booking.package.package_name }}</td>
              <td>{{ booking.professional.name }}</td>
              <td :class="paymentClass(booking.payment.status)">{{ booking.payment.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>Loading bookings...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        bookings: null
      };
    },
    created() {
      this.fetchBookings();
    },
    methods: {
      async fetchBookings() {
        try {
          const response = await fetch('http://127.0.0.1:5000/admin/myBookings', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.bookings = data.bookings;
          } else {
            alert('Failed to load bookings');
          }
        } catch (error) {
          console.error('Error fetching bookings:', error);
          alert('An error occurred while fetching the bookings.');
        }
      },
      statusClass(status) {
        switch (status.toLowerCase()) {
          case 'completed':
            return 'status-completed';
          case 'cancelled':
            return 'status-cancelled';
          case 'accepted':
            return 'status-accepted';
          default:
            return 'status-default';
        }
      },
      paymentClass(paymentStatus) {
        switch (paymentStatus.toLowerCase()) {
          case 'completed':
            return 'payment-completed';
          case 'no payment':
            return 'payment-no-payment';
          default:
            return 'payment-default';
        }
      }
    }
  };
  </script>
  
  <style>
  .admin-bookings {
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
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .status-completed {
    background-color: #d4edda;
  }
  
  .status-cancelled {
    background-color: #f8d7da;
  }
  
  .status-accepted {
    background-color: #fff3cd;
  }
  
  .status-default {
    background-color: #e2e3e5;
  }
  
  .payment-completed {
    background-color: #d4edda;
  }
  
  .payment-no-payment {
    background-color: #f8d7da;
  }
  
  .payment-default {
    background-color: #e2e3e5;
  }
  </style>