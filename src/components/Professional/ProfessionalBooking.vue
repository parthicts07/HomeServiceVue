<!-- <template>
    <div class="container">
      <h1>My Appointments</h1>
      <div v-for="booking in bookings" :key="booking.booking_id" class="card">
        <h2>Booking ID: {{ booking.booking_id }}</h2>
        <p>Customer ID: {{ booking.customer_id }}</p>
        <p>Package ID: {{ booking.package_id }}</p>
        <p>Appointment Date: {{ booking.appointment_date }}</p>
        <p>Status: {{ booking.status }}</p>
        <div v-if="booking.status === 'Pending'">
          <button @click="acceptBooking(booking.booking_id)" :disabled="booking.status === 'Accepted'" class="accept-btn">Accept</button>
          <button @click="rejectBooking(booking.booking_id)" :disabled="booking.status === 'Rejected'" class="reject-btn">Reject</button>
        </div>
        <div v-if="booking.status === 'Accepted'">
          <button @click="updateDoneDate(booking.booking_id)" class="update-btn">Update Done Date</button>
          <button @click="rejectBooking(booking.booking_id)" class="reject-btn">Reject</button>
        </div>
        <div v-if="booking.status === 'Rejected'">
            <button @click="acceptBooking(booking.booking_id)" :disabled="booking.status === 'Accepted'" class="accept-btn">Accept</button>
        </div>
      </div>
      <div v-if="showConfirmation" class="confirmation-dialog">
        <p>Are you sure you want to accept this rejected booking?</p>
        <button @click="confirmAcceptBooking" class="confirm-btn">Yes</button>
        <button @click="cancelConfirmation" class="cancel-btn">No</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        bookings: [],
        showConfirmation: false,
        bookingToConfirm: null
      };
    },
    created() {
      this.fetchBookings();
    },
    methods: {
      async fetchBookings() {
        try {
          const token = localStorage.getItem('profToken');
          const response = await fetch('http://127.0.0.1:5000/professionals/myAppointments', {
            headers: {
              'Authorization': `Bearer ${token}`
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
      async acceptBooking(bookingId) {
        const booking = this.bookings.find(b => b.booking_id === bookingId);
        if (booking.status === 'Rejected') {
          this.showConfirmation = true;
          this.bookingToConfirm = bookingId;
        } else {
          await this.updateBookingStatus(bookingId, 'Accepted');
        }
      },
      async rejectBooking(bookingId) {
        await this.updateBookingStatus(bookingId, 'Rejected');
      },
      async updateBookingStatus(bookingId, status) {
        try {
          const token = localStorage.getItem('profToken');
          const response = await fetch(`http://127.0.0.1:5000/professionals/booking/update_status/${bookingId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
          });
          const data = await response.json();
          if (data.success) {
            alert(`Booking status updated to ${status}`);
            this.fetchBookings();
          } else {
            alert('Failed to update booking status');
          }
        } catch (error) {
          console.error('Error updating booking status:', error);
          alert('An error occurred while updating the booking status.');
        }
      },
      async updateDoneDate(bookingId) {
        try {
          const done_date = new Date().toISOString()
          const formattedDate = done_date.replace('T', ' ') + ':00';
          console.log(formattedDate);
          const token = localStorage.getItem('profToken');
          const response = await fetch(`http://127.0.0.1:5000/professionals/booking/update_done_date/${bookingId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ done_date: formattedDate })
          });
          const data = await response.json();
          if (data.success) {
            alert('Done date updated successfully');
            this.fetchBookings();
          } else {
            alert('Failed to update done date');
          }
        } catch (error) {
          console.error('Error updating done date:', error);
          alert('An error occurred while updating the done date.');
        }
      },
      confirmAcceptBooking() {
        this.updateBookingStatus(this.bookingToConfirm, 'Accepted');
        this.showConfirmation = false;
        this.bookingToConfirm = null;
      },
      cancelConfirmation() {
        this.showConfirmation = false;
        this.bookingToConfirm = null;
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
  
  .accept-btn, .reject-btn, .update-btn, .confirm-btn, .cancel-btn {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 10px 0;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .accept-btn:hover, .reject-btn:hover, .update-btn:hover, .confirm-btn:hover, .cancel-btn:hover {
    background-color: #0056b3;
  }
  
  .confirmation-dialog {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 16px 0;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
    text-align: center;
  }
  </style> -->


  <template>
    <div class="container">
      <h1>My Appointments</h1>
      <div v-for="booking in bookings" :key="booking.booking_id" class="card">
        <h2>Booking ID: {{ booking.booking_id }}</h2>
        <p>Customer ID: {{ booking.customer_id }}</p>
        <p>Package ID: {{ booking.package_id }}</p>
        <p>Appointment Date: {{ booking.appointment_date }}</p>
        <p>Status: {{ booking.status }}</p>
        <div v-if="booking.status === 'Pending'">
          <button @click="acceptBooking(booking.booking_id)" :disabled="booking.status === 'Accepted'" class="accept-btn">Accept</button>
          <button @click="rejectBooking(booking.booking_id)" :disabled="booking.status === 'Rejected'" class="reject-btn">Reject</button>
        </div>
        <div v-if="booking.status === 'Accepted'">
          <button @click="updateDoneDate(booking.booking_id)" class="update-btn">Update Done Date</button>
          <button @click="rejectBooking(booking.booking_id)" class="reject-btn">Reject</button>
        </div>
        <div v-if="booking.status === 'Rejected'">
          <button @click="acceptBooking(booking.booking_id)" :disabled="booking.status === 'Accepted'" class="accept-btn">Accept</button>
        </div>
      </div>
      <div v-if="showConfirmation" class="confirmation-dialog">
        <p>Are you sure you want to accept this rejected booking?</p>
        <button @click="confirmAcceptBooking" class="confirm-btn">Yes</button>
        <button @click="cancelConfirmation" class="cancel-btn">No</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        bookings: [],
        showConfirmation: false,
        bookingToConfirm: null
      };
    },
    created() {
      this.fetchBookings();
    },
    methods: {
      async fetchBookings() {
        try {
          const token = localStorage.getItem('profToken');
          const response = await fetch('http://127.0.0.1:5000/professionals/myAppointments', {
            headers: {
              'Authorization': `Bearer ${token}`
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
      async acceptBooking(bookingId) {
        const booking = this.bookings.find(b => b.booking_id === bookingId);
        if (booking.status === 'Rejected') {
          this.showConfirmation = true;
          this.bookingToConfirm = bookingId;
        } else {
          await this.updateBookingStatus(bookingId, 'Accepted');
        }
      },
      async rejectBooking(bookingId) {
        await this.updateBookingStatus(bookingId, 'Rejected');
      },
      async updateBookingStatus(bookingId, status) {
        try {
          const token = localStorage.getItem('profToken');
          const response = await fetch(`http://127.0.0.1:5000/professionals/booking/update_status/${bookingId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
          });
          const data = await response.json();
          if (data.success) {
            alert(`Booking status updated to ${status}`);
            this.fetchBookings();
          } else {
            alert('Failed to update booking status');
          }
        } catch (error) {
          console.error('Error updating booking status:', error);
          alert('An error occurred while updating the booking status.');
        }
      },
      async updateDoneDate(bookingId) {
        try {
          const now = new Date();
          const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
          const istDate = new Date(now.getTime() + istOffset);
          const formattedDate = `${istDate.getFullYear()}-${String(istDate.getMonth() + 1).padStart(2, '0')}-${String(istDate.getDate()).padStart(2, '0')} ${String(istDate.getHours()).padStart(2, '0')}:${String(istDate.getMinutes()).padStart(2, '0')}:${String(istDate.getSeconds()).padStart(2, '0')}`;
          const token = localStorage.getItem('profToken');
          const response = await fetch(`http://127.0.0.1:5000/professionals/booking/update_done_date/${bookingId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ done_date: formattedDate })
          });
          const data = await response.json();
          if (data.success) {
            alert('Done date updated successfully');
            this.fetchBookings();
          } else {
            alert('Failed to update done date');
          }
        } catch (error) {
          console.error('Error updating done date:', error);
          alert('An error occurred while updating the done date.');
        }
      },
      confirmAcceptBooking() {
        this.updateBookingStatus(this.bookingToConfirm, 'Accepted');
        this.showConfirmation = false;
        this.bookingToConfirm = null;
      },
      cancelConfirmation() {
        this.showConfirmation = false;
        this.bookingToConfirm = null;
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
  
  .accept-btn, .reject-btn, .update-btn, .confirm-btn, .cancel-btn {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 10px 0;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .accept-btn:hover, .reject-btn:hover, .update-btn:hover, .confirm-btn:hover, .cancel-btn:hover {
    background-color: #0056b3;
  }
  
  .confirmation-dialog {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 16px 0;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
    text-align: center;
  }
  </style>