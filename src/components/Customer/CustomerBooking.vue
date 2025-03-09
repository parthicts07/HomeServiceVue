 <template>
    <div class="container mt-4">
      <h2>Customer Bookings</h2>
      <div v-if="bookings.length">
        <div class="row">
          <div class="col-md-4" v-for="booking in bookings" :key="booking.bookingId">
            <div class="card mb-4" :class="{'border-warning': booking.status === 'Accepted' && !booking.serviceDoneDate}">
              <img :src="booking.professional.profilePictureUrl" class="card-img-top" alt="Professional Picture">
              <div class="card-body">
                <h5 class="card-title">{{ booking.package.packageName }}</h5>
                <h5 class="card-title">{{ booking.bookingId}}</h5>
                <p class="card-text"><strong>Professional:</strong> {{ booking.professional.professionalName }}</p>
                <p class="card-text"><strong>Appointment Date:</strong> {{ new Date(booking.serviceAppointmentDate).toLocaleDateString() }}</p>
                <p class="card-text" v-if="booking.serviceDoneDate"><strong>Service Done Date:</strong> {{ new Date(booking.serviceDoneDate).toLocaleDateString() }}</p>
                <p class="card-text"><strong>Status:</strong> <span :class="statusClass(booking.status)">{{ booking.status }}</span></p>
                <p class="card-text"><strong>Price:</strong> ₹{{ booking.package.price }}</p>
                <div v-if="booking.status === 'Pending' || booking.status === 'Accepted'">
                  <button class="btn btn-primary" @click="showRescheduleInput(booking.bookingId)">Reschedule</button>
                  <button class="btn btn-danger" @click="confirmCancelBooking(booking.bookingId)">Cancel Booking</button>
                  <div v-if="rescheduleBookingId === booking.bookingId">
                    <input type="date" v-model="newDate" class="form-control mt-2">
                    <button class="btn btn-success mt-2" @click="rescheduleBooking(booking.bookingId)">Confirm</button>
                  </div>
                </div>
                <div v-if="booking.status === 'Completed'">
                  <button class="btn btn-success" @click="openModal('payment', booking.bookingId)">Make Payment</button>
                  <button class="btn btn-warning" @click="openModal('rating', booking.package.packageId)">Rate</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading bookings...</p>
      </div>
  
      <!-- Payment Modal -->
      <div class="modal" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="paymentModalLabel">Make Payment</h5>
             <button type="button" class="close" @click="closeModal('paymentModal')">&times;</button>
            </div>
            <div class="modal-body">
              <input type="text" v-model="paymentMethod" class="form-control" placeholder="Payment Method">
              <input type="text" v-model="transactionId" class="form-control mt-2" placeholder="Transaction ID">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal('paymentModal')">Close</button>
              <button type="button" class="btn btn-primary" @click="makePayment">Submit Payment</button>
            </div>
          </div>
        </div>
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
              <input type="number" v-model="ratingValue" class="form-control" placeholder="Rating (1-5)" min="1" max="5">
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
      newDate: '',
      paymentMethod: '',
      transactionId: '',
      currentBookingId: null,
      currentPackageId: null,
      ratingValue: null,
      comment: ''
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
    async rescheduleBooking(bookingId) {
      if (this.newDate) {
        try {
          const response = await fetch(`https://localhost:7001/api/Customer/rescheduleBooking/${bookingId}?newDate=${this.newDate}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('custToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            alert('Booking rescheduled successfully');
            this.fetchBookings();
            this.rescheduleBookingId = null;
            this.newDate = '';
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
        const response = await fetch(`https://localhost:7001/api/Customer/cancelBooking/${bookingId}`, {
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
    openModal(type, id) {
      if (type === 'payment') {
        this.currentBookingId = id;
        document.getElementById('paymentModal').style.display = 'block';
      } else if (type === 'rating') {
        this.currentPackageId = id;
        document.getElementById('ratingModal').style.display = 'block';
      }
    },
    closeModal(modalId) {
      document.getElementById(modalId).style.display = 'none';
    },
    async makePayment() {
        if (this.paymentMethod && this.transactionId) {
            try {
            const response = await fetch('https://localhost:7001/api/Customer/addPayment', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('custToken')}`
                },
                body: JSON.stringify({
                bookingId: this.currentBookingId,
                paymentMethod: this.paymentMethod,
                transactionId: this.transactionId
                })
            });
            const text = await response.text();
            try {
                const data = JSON.parse(text);
                if (data.success) {
                alert('Payment made successfully');
                this.fetchBookings();
                this.paymentMethod = '';
                this.transactionId = '';
                this.closeModal('paymentModal');
                } else {
                alert('Failed to make payment');
                }
            } catch (e) {
                console.error('Error parsing JSON:', e);
                alert('An error occurred while making the payment.');
            }
            } catch (error) {
            console.error('Error making payment:', error);
            alert('An error occurred while making the payment.');
            }
        }
    },
    async submitRating() {
      if (this.ratingValue && this.comment) {
        try {
          const response = await fetch('https://localhost:7001/api/Customer/addRating', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('custToken')}`
            },
            body: JSON.stringify({
              packageId: this.currentPackageId,
              ratingValue: parseInt(this.ratingValue),
              comment: this.comment
            })
          });
          const data = await response.json();
          if (data.success) {
            alert('Rating submitted successfully');
            this.fetchBookings();
            this.ratingValue = null;
            this.comment = '';
            this.closeModal('ratingModal');
          } else {
            alert('Failed to submit rating');
          }
        } catch (error) {
          console.error('Error submitting rating:', error);
          alert('An error occurred while submitting the rating.');
        }
      }
    },
    async fetchBookings() {
      try {
        const token = localStorage.getItem('custToken');
        const response = await fetch('https://localhost:7001/api/Customer/myBookings', {
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
