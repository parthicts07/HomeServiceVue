<template>
  <div class="container">
    <h1>Professional Services</h1>
    <button class="add-service-btn" @click="showAddServiceForm = true">Add Service</button>
    <div v-if="showAddServiceForm" class="form-container">
      <form @submit.prevent="addService">
        <input v-model="newService.service_name" placeholder="Service Name" required class="input-field" />
        <input v-model="newService.description" placeholder="Description" class="input-field" />
        <button type="submit" class="submit-btn">Create Service</button>
        <button type="button" class="cancel-btn" @click="showAddServiceForm = false">Cancel</button>
      </form>
    </div>
    <div v-for="service in services" :key="service.service_id" class="card">
      <div class="image-container" :style="{ backgroundImage: `url(${service.service_picture_url})` }"></div>
      <div class="card-content">
        <h2>{{ service.service_name }}</h2>
        <p>{{ service.description }}</p>
        <router-link :to="{ name: 'ProfessionalPackage', params: { serviceId: service.service_id } }">
          <button class="view-details-btn">View Details</button>
        </router-link>
        <button class="upload-photo-btn" @click="showUploadForm(service.service_id)">Upload Photo</button>
        <div v-if="selectedServiceId === service.service_id" class="upload-form">
          <input type="file" @change="onFileChange($event)" class="file-input" />
          <button @click="uploadPicture(service.service_id)" class="update-btn">Update</button>
          <button @click="cancelUpload" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      services: [],
      showAddServiceForm: false,
      newService: {
        service_name: '',
        description: ''
      },
      selectedFile: null,
      selectedServiceId: null
    };
  },
  created() {
    this.fetchServices();
    this.fetchProfile();
  },
  methods: {
    async fetchServices() {
      try {
        const token = localStorage.getItem('profToken');
        const response = await fetch('http://127.0.0.1:5000/professionals/getAllServices', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          this.services = data.services;
        } else {
          alert('Failed to load services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        alert('An error occurred while fetching the services.');
      }
    },
    async addService() {
      try {
        const token = localStorage.getItem('profToken');
        const response = await fetch('http://localhost:5000/professionals/createService', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            service_name: this.newService.service_name,
            description: this.newService.description
          })
        });
        const data = await response.json();
        if (data.success) {
          alert('Service created successfully');
          this.showAddServiceForm = false;
          this.fetchServices(); 
        } else {
          alert('Failed to create service');
        }
      } catch (error) {
        console.error('Error creating service:', error);
        alert('An error occurred while creating the service.');
      }
    },
    async fetchProfile() {
      try {
        const token = localStorage.getItem('profToken');
        const response = await fetch('http://localhost:5000/professionals/viewProfile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          this.profile = data.profile;
          this.editProfileData = { ...data.profile };
        } else {
          alert('Failed to load profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('An error occurred while fetching the profile.');
      }
    },
    showUploadForm(serviceId) {
      this.selectedServiceId = serviceId;
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadPicture(serviceId) {
      if (!this.selectedFile || this.selectedServiceId !== serviceId) {
        alert('Please select a file to upload.');
        return;
      }
      try {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        const token = localStorage.getItem('profToken');
        const response = await fetch(`http://127.0.0.1:5000/professionals/service/upload_picture/${serviceId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        const data = await response.json();
        if (data.success) {
          alert('Picture updated successfully');
          this.fetchServices(); 
          this.cancelUpload();
        } else {
          alert('Failed to update picture');
        }
      } catch (error) {
        console.error('Error uploading picture:', error);
        alert('An error occurred while uploading the picture.');
      }
    },
    cancelUpload() {
      this.selectedFile = null;
      this.selectedServiceId = null;
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

.add-service-btn, .submit-btn, .cancel-btn, .view-details-btn, .upload-photo-btn, .update-btn {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 5px;
}

.add-service-btn:hover, .submit-btn:hover, .cancel-btn:hover, .view-details-btn:hover, .upload-photo-btn:hover, .update-btn:hover {
  background-color: #0056b3;
}

.form-container {
  margin-bottom: 20px;
}

.input-field {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.card {
  position: relative;
  border: 1px solid #ccc;
  margin: 16px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.image-container {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.card-content {
  padding: 16px;
  background-color: white;
  color: black;
}

.card-content h2 {
  font-size: 1.5em;
}

.card-content p {
  font-size: 1em;
}

.card-link {
  text-decoration: none;
}

.upload-form {
  margin-top: 10px;
}

.file-input {
  display: block;
  margin-bottom: 10px;
}
</style>