<!-- <template>
    <div id="CustomerPackage">
      <CustomerNavbar />
      <div class="container mt-4">
        <div v-if="professional" class="professional-info">
          <img :src="professional.professional_picture_url || 'default-profile.jpg'" alt="Professional Picture" class="professional-pic" @click="openProfessionalModal(professional.professional_id)" />
          <h3 @click="openProfessionalModal(professional.professional_id)">{{ professional.professional_name }}</h3>
        </div>
        <div v-if="packages.length" class="packages-section">
          <h4>Available Packages:</h4>
          <div class="row">
            <div class="col-md-6" v-for="pkg in packages" :key="pkg.package_id">
              <div class="card mb-4 package-card">
                <div class="card-body">
                  <h5 class="card-title">{{ pkg.name }}</h5>
                  <p class="card-text">{{ pkg.details }}</p>
                  <p class="card-text"><strong>Price:</strong> ₹{{ pkg.price }}</p>
                  <p class="card-text"><strong>Average Rating:</strong> {{ pkg.avg_rating ? pkg.avg_rating : 'No ratings yet' }} / 5</p>
                  <div class="reviews-section" v-if="pkg.reviews.length">
                    <h6>Customer Reviews:</h6>
                    <ul>
                      <li v-for="review in pkg.reviews" :key="review.reviewer_id">
                        <p><strong>{{ review.reviewer_name }}</strong></p>
                        <p> Rating: {{ review.rating }} stars</p>
                        <p>Comment: {{ review.review }}</p>
                      </li>
                    </ul>
                  </div>
                  <div v-else>
                    <p>No reviews yet.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="professionalModal" class="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Professional Information</h5>
              <button type="button" class="btn-close" @click="closeModal('professionalModal')" aria-label="Close"></button>
            </div>
            <div class="modal-body" v-if="professionalDetails">
              <p><strong>Name:</strong> {{ professionalDetails.name }}</p>
              <p><strong>Email:</strong> {{ professionalDetails.email }}</p>
              <p><strong>Phone:</strong> {{ professionalDetails.phone }}</p>
              <p><strong>Bio:</strong> {{ professionalDetails.bio }}</p>
              <p><strong>Experience:</strong> {{ professionalDetails.experience_years }} years</p>
              <p><strong>Skills:</strong> {{ professionalDetails.skills }}</p>
              <p><strong>Service:</strong> {{ professionalDetails.service }}</p>
              <p><strong>Nationality:</strong> {{ professionalDetails.nationality }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CustomerNavbar from './CustomerNavbar';
  
  export default {
    name: 'CustomerPackage',
    components: {
      CustomerNavbar,
    },
    data() {
      return {
        professional: null,
        packages: [],
        professionalDetails: null,
      };
    },
    created() {
      const serviceId = this.$route.params.serviceId;
      this.fetchPackages(serviceId);
    },
    methods: {
      async fetchPackages(serviceId) {
        try {
          const response = await fetch(`http://127.0.0.1:5000/customers/${serviceId}/packages`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('custToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.packages = data.packages;
            this.professional = data.professional;
          }
        } catch (error) {
          console.error('Error fetching packages:', error);
        }
      },
      async openProfessionalModal(professionalId) {
        try {
          const response = await fetch(`http://127.0.0.1:5000/customers/viewProfessional/${professionalId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('custToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.professionalDetails = data.profile;
            document.getElementById('professionalModal').style.display = 'block';
          }
        } catch (error) {
          console.error('Error fetching professional details:', error);
        }
      },
      closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
      },
    },
  };
  </script>
  
  <style>
  .professional-info {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .professional-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 10px;
    cursor: pointer;
  }
  
  .packages-section {
    margin-top: 20px;
  }
  
  .package-card {
    position: relative;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 10px;
  }
  
  .card-text {
    font-size: 1rem;
  }
  
  .reviews-section {
    margin-top: 10px;
  }
  
  .reviews-section ul {
    list-style-type: none;
    padding: 0;
  }
  
  .reviews-section li {
    border-top: 1px solid #ddd;
    padding: 10px 0;
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
    border-radius: 0.3rem;
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
  
  .btn-close {
    padding: 0.75rem 1.25rem;
    margin: -1rem -1rem -1rem auto;
    cursor: pointer;
    background: none;
    border: 0;
  }
  </style> -->
  <template>
    <div id="CustomerPackage">
      <CustomerNavbar />
      <div class="container mt-4">
        <div v-if="professional" class="professional-info">
          <img :src="professional.professional_picture_url || 'default-profile.jpg'" alt="Professional Picture" class="professional-pic" @click="openProfessionalModal(professional.professional_id)" />
          <h3 @click="openProfessionalModal(professional.professional_id)">{{ professional.professional_name }}</h3>
        </div>
        <div v-if="packages.length" class="packages-section">
          <h4>Available Packages:</h4>
          <div class="row">
            <div class="col-md-6" v-for="pkg in packages" :key="pkg.package_id">
              <div class="card mb-4 package-card">
                <div class="card-body">
                  <h5 class="card-title">{{ pkg.name }}</h5>
                  <p class="card-text">{{ pkg.details }}</p>
                  <p class="card-text"><strong>Price:</strong> ₹{{ pkg.price }}</p>
                  <p class="card-text"><strong>Average Rating:</strong> {{ pkg.avg_rating ? pkg.avg_rating : 'No ratings yet' }} / 5</p>
                  <div class="reviews-section" v-if="pkg.reviews.length">
                    <h6>Customer Reviews:</h6>
                    <ul>
                      <li v-for="review in pkg.reviews" :key="review.reviewer_id">
                        <p><strong>{{ review.reviewer_name }}</strong></p>
                        <p> Rating: {{ review.rating }} stars</p>
                        <p>Comment: {{ review.review }}</p>
                      </li>
                    </ul>
                  </div>
                  <div v-else>
                    <p>No reviews yet.</p>
                  </div>
                  <!-- Buy Now Button -->
                  <button @click="showBookingForm(pkg.package_id)" class="btn btn-primary">Buy Now</button>
                  <!-- Booking Form -->
                  <div v-if="pkg.showBookingForm" class="booking-form">
                    <h6>Select Appointment Date:</h6>
                    <input type="datetime-local" v-model="pkg.appointment_date" class="form-control mb-2" />
                    <button @click="createBooking(pkg.package_id, pkg.appointment_date)" class="btn btn-success">Confirm Booking</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Professional Info Modal -->
      <div id="professionalModal" class="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Professional Information</h5>
              <button type="button" class="btn-close" @click="closeModal('professionalModal')" aria-label="Close">X</button>
            </div>
            <div class="modal-body" v-if="professionalDetails">
              <p><strong>Name:</strong> {{ professionalDetails.name }}</p>
              <p><strong>Email:</strong> {{ professionalDetails.email }}</p>
              <p><strong>Phone:</strong> {{ professionalDetails.phone }}</p>
              <p><strong>Bio:</strong> {{ professionalDetails.bio }}</p>
              <p><strong>Experience:</strong> {{ professionalDetails.experience_years }} years</p>
              <p><strong>Skills:</strong> {{ professionalDetails.skills }}</p>
              <p><strong>Service:</strong> {{ professionalDetails.service }}</p>
              <p><strong>Nationality:</strong> {{ professionalDetails.nationality }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CustomerNavbar from './CustomerNavbar';
  
  export default {
    name: 'CustomerPackage',
    components: {
      CustomerNavbar,
    },
    data() {
      return {
        professional: null,
        packages: [],
        professionalDetails: null,
      };
    },
    created() {
      const serviceId = this.$route.params.serviceId;
      this.fetchPackages(serviceId);
    },
    methods: {

      async fetchPackages(serviceId) {
        try {
          const response = await fetch(`http://127.0.0.1:5000/customers/${serviceId}/packages`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('custToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.packages = data.packages.map(pkg => ({ ...pkg, showBookingForm: false }));
            this.professional = data.professional;
          }
        } catch (error) {
          console.error('Error fetching packages:', error);
        }
      },

      async openProfessionalModal(professionalId) {
        try {
          const response = await fetch(`http://127.0.0.1:5000/customers/viewProfessional/${professionalId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('custToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.professionalDetails = data.profile;
            document.getElementById('professionalModal').style.display = 'block';
          }
        } catch (error) {
          console.error('Error fetching professional details:', error);
        }
      },

      closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
      },

      showBookingForm(packageId) {
        this.packages = this.packages.map(pkg => pkg.package_id === packageId ? { ...pkg, showBookingForm: true } : pkg);
      },

      async createBooking(packageId, appointmentDate) 
      {
        if (appointmentDate) {
            const formattedDate = appointmentDate.replace('T', ' ') + ':00';
            console.log(packageId);
            console.log(formattedDate);
            try {
            const response = await fetch('http://127.0.0.1:5000/customers/createBooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('custToken')}`
                },
                body: JSON.stringify({
                    package_id: packageId,
                    appointment_date: formattedDate
                })
            });
            const data = await response.json();
            if (data.success) {
                alert('Booking created successfully');
            } else {
                alert('Failed to create booking');
            }
            } catch (error) {
            console.error('Error creating booking:', error);
            alert('An error occurred while creating the booking.');
            }
        } else {
            alert('Please select an appointment date and time');
        }
      }
    },
  };
  </script>
  
  <style>
  .professional-info {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .professional-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 10px;
    cursor: pointer;
  }
  
  .packages-section {
    margin-top: 20px;
  }
  
  .package-card {
    position: relative;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 10px;
  }
  
  .card-text {
    font-size: 1rem;
  }
  
  .reviews-section {
    margin-top: 10px;
  }
  
  .reviews-section ul {
    list-style-type: none;
    padding: 0;
  }
  
  .reviews-section li {
    border-top: 1px solid #ddd;
    padding: 10px 0;
  }
  
  .booking-form {
    margin-top: 20px;
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
    border-radius: 0.3rem;
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

.btn-close {
  padding: 0.75rem 1.25rem;
  margin: -1rem -1rem -1rem auto;
  cursor: pointer;
  background: none;
  border: 0;
}
</style>