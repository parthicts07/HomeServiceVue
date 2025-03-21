 <template>
    <div class="container mt-4">
      <h2>Customer Bookings</h2>
      <div v-if="bookings.length">
        <div class="row">
          <div class="col-md-4" v-for="booking in bookings" :key="booking.booking_id">
            <div class="card mb-4" :class="{'border-warning': booking.status === 'Accepted' && !booking.service_done_date}">
              <img :src="booking.professional.profile_pic_url" class="card-img-top" alt="Professional Picture">
              <div class="card-body">
                <h5 class="card-title">{{ booking.package.package_name }}</h5>
                <h5 class="card-title">{{ booking.booking_id }}</h5>
                <p class="card-text"><strong>Professional:</strong> {{ booking.professional.name }}</p>
                <p class="card-text"><strong>Appointment Date:</strong> {{ new Date(booking.appointment_date).toLocaleString() }}</p>
                <!-- <p class="card-text"><strong>Date:</strong> {{ new Date(rating.created_at).toLocaleString() }}</p> -->
                <p class="card-text" v-if="booking.done_date"><strong>Service Done Date:</strong> {{ new Date(booking.done_date).toLocaleString() }}</p>
                <p class="card-text"><strong>Status:</strong> <span :class="statusClass(booking.status)">{{ booking.status }}</span></p>
                <p class="card-text"><strong>Price:</strong> ₹{{ booking.package.price }}</p>
                <div v-if="booking.status === 'Pending' || booking.status === 'Accepted'">
                  <button class="btn btn-primary" @click="showRescheduleInput(booking.booking_id)">Reschedule</button>
                  <button class="btn btn-danger" @click="confirmCancelBooking(booking.booking_id)">Cancel Booking</button>
                  <div v-if="rescheduleBookingId === booking.booking_id">
                    <input type="datetime-local" v-model="newDateTime" class="form-control mt-2">
                    <button class="btn btn-success mt-2" @click="rescheduleBooking(booking.booking_id)">Confirm</button>
                  </div>
                </div>
                <div v-if="booking.status === 'Completed'">
                  <div v-if="booking.payment.status !== 'Completed'">
                    <button class="btn btn-success" @click="navigateToPaymentPage(booking)">Make Payment</button>
                  </div>
                  <div v-else>
                    <a href="#" class="btn btn-info">View Details</a>
                  </div>
                </div>
                <button class="btn btn-warning" @click="openRatingModal(booking)">Rate</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading bookings...</p>
      </div>
  
      <!-- Rating Modal -->
      <div class="modal" id="ratingModal" tabindex="-1" aria-labelledby="ratingModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="ratingModalLabel">Rate Service</h5>
              <button type="button" class="close" @click="closeModal('ratingModal')">&times;</button>
            </div>
            <div class="modal-body">
              <select v-model="reviewedType" class="form-control" @change="setReviewedId">
                <option value="" disabled>Select Type</option>
                <option value="professional">Professional</option>
                <option value="package">Package</option>
              </select>
              <input type="number" v-model="reviewedId" class="form-control mt-2" placeholder="ID" readonly>
              <input type="number" v-model="ratingValue" class="form-control mt-2" placeholder="Rating (1-5)" min="1" max="5">
              <textarea v-model="comment" class="form-control mt-2" placeholder="Comment"></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal('ratingModal')">Close</button>
              <button type="button" class="btn btn-primary" @click="submitRating">Submit Rating</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'CustomerBooking',
  data() {
    return {
      bookings: [],
      rescheduleBookingId: null,
      newDateTime: '',
      currentBookingId: null,
      currentPackageId: null,
      ratingValue: null,
      comment: '',
      reviewedId: null,
      reviewedType: '',
      currentBooking: null,
    };
  },

  async created() {
    this.fetchBookings();
  },

  methods: {
    statusClass(status) {
      switch (status) {
        case 'Pending':
          return 'text-warning';
        case 'Accepted':
          return 'text-primary';
        case 'Completed':
          return 'text-success';
        case 'Cancelled':
          return 'text-danger';
        default:
          return '';
      }
    },

    showRescheduleInput(bookingId) {
      this.rescheduleBookingId = bookingId;
    },

    async fetchBookings() {
      try {
        const token = localStorage.getItem('custToken');
        const response = await fetch('http://127.0.0.1:5000/customers/myBookings', {
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

    async rescheduleBooking(bookingId) {
      if (this.newDateTime) {
        try {
          const response = await fetch(`http://127.0.0.1:5000/customers/booking/reschedule?booking_id=${bookingId}&appointment_date=${this.newDateTime}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('custToken')}`
            }
          });
          console.log(bookingId);
          console.log(this.newDateTime);
          const data = await response.json();
          if (data.success) {
            alert('Booking rescheduled successfully');
            this.fetchBookings();
            this.rescheduleBookingId = null;
            this.newDateTime = '';
          } else {
            alert('Failed to reschedule booking');
          }
        } catch (error) {
          console.error('Error rescheduling booking:', error);
          alert('An error occurred while rescheduling the booking.');
        }
      }
    },

    confirmCancelBooking(bookingId) {
      if (confirm('Are you sure you want to cancel this booking?')) {
        this.cancelBooking(bookingId);
      }
    },

    async cancelBooking(bookingId) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/customers/booking/cancel/${bookingId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('custToken')}`
          }
        });
        const data = await response.json();
        if (data.success) {
          alert('Booking canceled successfully');
          this.fetchBookings();
        } else {
          alert('Failed to cancel booking');
        }
      } catch (error) {
        console.error('Error canceling booking:', error);
        alert('An error occurred while canceling the booking.');
      }
    },

    closeModal(modalId) {
      document.getElementById(modalId).style.display = 'none';
    },
    
    navigateToPaymentPage(booking) {
      localStorage.setItem('currentBooking', JSON.stringify(booking));
      this.$router.push({ name: 'PaymentPage' });
    },

    openRatingModal(booking) {
      console.log(booking);
      this.currentBooking = booking;
      console.log(this.currentBooking);
      this.reviewedType = ''; 
      this.reviewedId = null; 
      document.getElementById('ratingModal').style.display = 'block';
    },

    setReviewedId() {
      if (this.reviewedType === 'professional') {
        this.reviewedId = this.currentBooking.professional.professional_id;
      } else if (this.reviewedType === 'package') {
        this.reviewedId = this.currentBooking.package.package_id;
      }
    },

    async submitRating() {
      if (this.ratingValue && this.reviewedId && this.reviewedType) {
        try {
          const response = await fetch('http://127.0.0.1:5000/customers/addRating', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('custToken')}`
            },
            body: JSON.stringify({
              reviewed_id: this.reviewedId,
              reviewed_type: this.reviewedType,
              rating: parseInt(this.ratingValue),
              review: this.comment
            })
          });
          const data = await response.json();
          if (data.success) {
            alert('Rating submitted successfully');
            this.fetchBookings();
            this.ratingValue = null;
            this.comment = '';
            this.reviewedId = null;
            this.reviewedType = '';
            this.closeModal('ratingModal');
          } else {
            alert('Failed to submit rating');
          }
        } catch (error) {
          console.error('Error submitting rating:', error);
          alert('An error occurred while submitting the rating.');
        }
      } else {
        alert('Please fill in all required fields');
      }
    }
  }
};
</script>

<style>
  .card {
    height: 100%;
  }
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  .border-warning {
    border-color: #ffc107 !important;
  }
  .text-warning {
    color: #ffc107 !important;
  }
  .text-primary {
    color: #007bff !important;
  }
  .text-success {
    color: #28a745 !important;
  }
  .text-danger {
    color: #dc3545 !important;
  }
  .modal {
    display: none;
    position: fixed;
    z-index: 1050;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal-dialog {
    position: relative;
    width: auto;
    margin: 10px;
    pointer-events: none;
    max-width: 500px;
    margin: 1.75rem auto;
  }
  .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    /* 0.3rem; */
    outline: 0;
  }
  .modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #dee2e6;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
  }
  .modal-title {
    margin-bottom: 0;
    line-height: 1.5;
  }
  .close {
    padding: 0;
    background-color: transparent;
    border: 0;
    /* -webkit-appearance: none; */
  }
  .modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
  }
  .modal-flex
  {
    align-items: center;
    justify-content: flex-end;
    padding: 1rem;
    border-top: 1px solid #dee2e6;
  }
</style>
