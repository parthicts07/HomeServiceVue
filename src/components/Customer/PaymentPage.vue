<!-- <template>
    <div class="payment-container">
      <div class="payment-header">
        <h2>Payment Gateway</h2>
      </div>
      <div class="payment-details">
        <h5>Booking Details</h5>
        <p><strong>Package Name:</strong> {{ booking.package.package_name }}</p>
        <p><strong>Professional:</strong> {{ booking.professional.name }}</p>
        <p><strong>Appointment Date:</strong> {{ new Date(booking.appointment_date).toLocaleDateString() }}</p>
        <p><strong>Price:</strong> ₹{{ booking.package.price }}</p>
      </div>
      <div class="payment-form">
        <h5>Payment Information</h5>
        <form @submit.prevent="submitPayment">
          <div class="form-group">
            <label for="cardNumber">Card Number</label>
            <input type="text" class="form-control" id="cardNumber" v-model="cardNumber" placeholder="Enter card number">
          </div>
          <div class="form-group">
            <label for="expiryDate">Expiry Date</label>
            <input type="text" class="form-control" id="expiryDate" v-model="expiryDate" placeholder="MM/YY">
          </div>
          <div class="form-group">
            <label for="cvv">CVV</label>
            <input type="text" class="form-control" id="cvv" v-model="cvv" placeholder="CVV">
          </div>
          <div class="form-group">
            <label for="tips">Tips (optional)</label>
            <input type="number" class="form-control" id="tips" v-model="tips" placeholder="Enter tips amount">
          </div>
          <button type="submit" class="btn btn-primary">Submit Payment</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        booking: {},
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        tips: 0
      };
    },
    created() {
      this.booking = JSON.parse(localStorage.getItem('currentBooking'));
    },
    methods: {
      async submitPayment() {
        if (!this.cardNumber || !this.expiryDate || !this.cvv) {
          alert('Please fill in all required fields');
          return;
        }
  
        try {
          const response = await fetch('http://127.0.0.1:5000/customers/addPayment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('custToken')}`
            },
            body: JSON.stringify({
              booking_id: this.booking.booking_id,
              tips: parseFloat(this.tips)
            })
          });
          const data = await response.json();
          if (data.success) {
            alert('Payment successful');
          } else {
            alert('Failed to process payment');
          }
        } catch (error) {
          console.error('Error processing payment:', error);
          alert('An error occurred while processing the payment.');
        }
      }
    }
  };
  </script>
  
  <style>
  .payment-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .payment-header {
    text-align: center;
    margin-bottom: 20px;
  }
  .payment-details {
    margin-bottom: 20px;
  }
  .payment-details p {
    margin: 0;
  }
  .payment-form {
    margin-top: 20px;
  }
  </style> -->

  <template>
    <div class="payment-container">
      <div class="payment-header">
        <h2>Payment Gateway</h2>
      </div>
      <div class="payment-details">
        <h5>Booking Details</h5>
        <p><strong>Package Name:</strong> {{ booking.package.package_name }}</p>
        <p><strong>Professional:</strong> {{ booking.professional.name }}</p>
        <p><strong>Appointment Date:</strong> {{ new Date(booking.appointment_date).toLocaleDateString() }}</p>
        <p><strong>Price:</strong> ₹{{ booking.package.price }}</p>
      </div>
      <div class="payment-form">
        <h5>Payment Information</h5>
        <form @submit.prevent="submitPayment">
          <div class="form-group">
            <label for="paymentMethod">Payment Method</label>
            <select v-model="paymentMethod" class="form-control" id="paymentMethod">
              <option value="" disabled>Select Payment Method</option>
              <option value="creditCard">Credit Card</option>
              <option value="debitCard">Debit Card</option>
              <option value="upi">UPI</option>
            </select>
          </div>
          <div v-if="paymentMethod === 'creditCard' || paymentMethod === 'debitCard'">
            <div class="form-group">
              <label for="cardNumber">Card Number</label>
              <input type="text" class="form-control" id="cardNumber" v-model="cardNumber" placeholder="Enter card number">
            </div>
            <div class="form-group">
              <label for="expiryDate">Expiry Date</label>
              <input type="text" class="form-control" id="expiryDate" v-model="expiryDate" placeholder="MM/YY">
            </div>
            <div class="form-group">
              <label for="cvv">CVV</label>
              <input type="text" class="form-control" id="cvv" v-model="cvv" placeholder="CVV">
            </div>
          </div>
          <div v-if="paymentMethod === 'upi'">
            <div class="form-group">
              <label for="upiId">UPI ID</label>
              <input type="text" class="form-control" id="upiId" v-model="upiId" placeholder="Enter UPI ID">
            </div>
          </div>
          <div class="form-group">
            <label for="tips">Tips (optional)</label>
            <input type="number" class="form-control" id="tips" v-model="tips" placeholder="Enter tips amount">
          </div>
          <button type="submit" class="btn btn-primary">Submit Payment</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        booking: {},
        paymentMethod: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        upiId: '',
        tips: 0
      };
    },
    created() {
      this.booking = JSON.parse(localStorage.getItem('currentBooking'));
    },
    methods: {
      generateTransactionId() {
        const customerName = this.booking.professional.name.replace(/\s+/g, '');
        const uniquePart = this.paymentMethod === 'upi' ? this.upiId : this.cardNumber;
        return `${customerName}-${uniquePart}-${Date.now()}`;
      },
      validateForm() {
        if (!this.paymentMethod) {
          Swal.fire('Error', 'Please select a payment method', 'error');
          return false;
        }
        if ((this.paymentMethod === 'creditCard' || this.paymentMethod === 'debitCard') && (!this.cardNumber || !this.expiryDate || !this.cvv)) {
          Swal.fire('Error', 'Please fill in all required card details', 'error');
          return false;
        }
        if (this.paymentMethod === 'upi' && !this.upiId) {
          Swal.fire('Error', 'Please fill in the UPI ID', 'error');
          return false;
        }
        return true;
      },
      async submitPayment() {
        if (!this.validateForm()) {
          return;
        }
  
        const transactionId = this.generateTransactionId();
  
        try {
          const response = await fetch('http://127.0.0.1:5000/customers/addPayment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('custToken')}`
            },
            body: JSON.stringify({
              booking_id: this.booking.booking_id,
              tips: parseFloat(this.tips),
              transaction_id: transactionId
            })
          });
          const data = await response.json();
          if (data.success) {
            Swal.fire('Success', 'Payment successful', 'success');
          } else {
            Swal.fire('Error', 'Failed to process payment', 'error');
          }
        } catch (error) {
          console.error('Error processing payment:', error);
          Swal.fire('Error', 'An error occurred while processing the payment', 'error');
        }
      }
    }
  };
  </script>
  
  <style>
  .payment-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .payment-header {
    text-align: center;
    margin-bottom: 20px;
  }
  .payment-details {
    margin-bottom: 20px;
  }
  .payment-details p {
    margin: 0;
  }
  .payment-form {
    margin-top: 20px;
  }
  </style>