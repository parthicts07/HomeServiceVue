<template>
  <div id="CustomerDashboard">
    <CustomerNavbar />
    <div class="container mt-4">
      <div v-if="profile" class="welcome-section">
        <h3>Welcome, {{ profile.name }}!</h3>
        <img :src="profile.profile_pic_url" alt="Profile Picture" class="profile-pic" />
      </div>
      <div v-if="services.length" class="services-section">
        <h4>Available Services:</h4>
        <div class="row">
          <div class="col-md-6" v-for="service in services" :key="service.service_id">
            <div class="card mb-4 service-card">
              <!-- <div class="card-body">
                <div class="service-image" :style="{ backgroundImage: `url(${service.service_picture_url || 'default-service.jpg'})` }"></div>
                <h5 class="card-title">{{ service.service_name }}</h5>
                <p class="card-text">{{ service.description }}</p>
                <div class="professional-info">
                  <img :src="service.professional_picture_url || 'default-profile.jpg'" alt="Professional Picture" class="professional-pic" />
                  <p class="professional-name">{{ service.professional_name }}</p>
                </div>
              </div> -->
              <router-link :to="{ name: 'CustomerPackage', params: { serviceId: service.service_id } }" class="card-link">
                <div class="card mb-4 service-card">
                  <div class="card-body">
                    <div class="service-image" :style="{ backgroundImage: `url(${service.service_picture_url || 'default-service.jpg'})` }"></div>
                    <h5 class="card-title">{{ service.service_name }}</h5>
                    <p class="card-text">{{ service.description }}</p>
                    <div class="professional-info">
                      <img :src="service.professional_picture_url || 'default-profile.jpg'" alt="Professional Picture" class="professional-pic" />
                      <p class="professional-name">{{ service.professional_name }}</p>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import CustomerNavbar from './CustomerNavbar';

export default {
  name: 'CustomerDashboard',
  components: {
    CustomerNavbar,
  },
  data() {
    return {
      profile: null,
      services: [],
    };
  },
  created() {
    this.fetchProfile();
    this.fetchServices();
  },
  methods: {
    async fetchProfile() {
      try {
        const response = await fetch('http://127.0.0.1:5000/customers/viewProfile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('custToken')}`
          }
        });
        const data = await response.json();
        if (data.success) {
          this.profile = data.profile;
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    },
    async fetchServices() {
      try {
        const response = await fetch('http://127.0.0.1:5000/customers/getAllServices', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('custToken')}`
          }
        });
        const data = await response.json();
        if (data.success) {
          this.services = data.services;
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    },
  },
};
</script>

<style>
.welcome-section {
  text-align: center;
  margin-bottom: 20px;
}

.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 10px;
}

.services-section {
  margin-top: 20px;
}

.service-card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.service-image {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 10px;
}

.card-text {
  font-size: 1rem;
}

.professional-info {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.professional-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.professional-name {
  font-size: 1rem;
  font-weight: bold;
}
</style>