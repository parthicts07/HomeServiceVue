<template>
    <div class="container">
      <h1>Service Packages</h1>
      <button class="add-package-btn" @click="showAddPackageForm = true">Add Package</button>
      <div v-if="showAddPackageForm" class="form-container">
        <form @submit.prevent="addPackage">
          <input v-model="newPackage.package_name" placeholder="Package Name" required class="input-field" />
          <input v-model="newPackage.price" placeholder="Price" type="number" required class="input-field" />
          <textarea v-model="newPackage.details" placeholder="Details" class="input-field"></textarea>
          <select v-model="newPackage.service_id" required class="input-field">
            <option disabled value="">Select Service</option>
            <option v-for="service in services" :key="service.service_id" :value="service.service_id">
              {{ service.service_name }}
            </option>
          </select>
          <button type="submit" class="submit-btn">Create Package</button>
          <button type="button" class="cancel-btn" @click="showAddPackageForm = false">Cancel</button>
        </form>
      </div>
      <div v-if="packages.length === 0" class="no-packages">
        No packages for this service. Wanna create one? Click "Add Package".
      </div>
      <div v-for="pkg in packages" :key="pkg.id" class="card">
        <div v-if="editPackageId === pkg.id" class="edit-form">
          <form @submit.prevent="updatePackage(pkg.id)">
            <input v-model="editPackage.package_name" placeholder="Package Name" required class="input-field" />
            <input v-model="editPackage.price" placeholder="Price" type="number" required class="input-field" />
            <textarea v-model="editPackage.details" placeholder="Details" class="input-field"></textarea>
            <select v-model="editPackage.service_id" required class="input-field">
              <option :value="editPackage.service_id">{{ getServiceName(servicer.service_id) }}</option>
              <option v-for="service in services" :key="service.service_id" :value="service.service_id">
                {{ service.service_name }}
              </option>
            </select>
            <button type="submit" class="submit-btn">Update Package</button>
            <button type="button" class="cancel-btn" @click="cancelEdit">Cancel</button>
          </form>
        </div>
        <div v-else>
          <h2>{{ pkg.package_name }}</h2>
          <p>Price: {{ pkg.price }}</p>
          <p>{{ pkg.details }}</p>
          <button class="edit-btn" @click="editPackageForm(pkg)">Edit</button>
          <button class="delete-btn" @click="confirmDelete(pkg.id)">Delete</button>
        </div>
      </div>
      <div v-if="showDeleteConfirmation" class="confirmation-dialog">
        <p>Are you sure you want to delete this package?</p>
        <button @click="deletePackage(deletePackageId)" class="confirm-btn">Yes</button>
        <button @click="cancelDelete" class="cancel-btn">No</button>
      </div>
      <div v-if="showServiceChangeConfirmation" class="confirmation-dialog">
        <p>Are you sure you want to change the service ID?</p>
        <button @click="confirmServiceChangeYes" class="confirm-btn">Yes</button>
        <button @click="confirmServiceChangeNo" class="cancel-btn">No</button>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      packages: [],
      services: [],
      servicer: null,
      showAddPackageForm: false,
      newPackage: {
        package_name: '',
        price: 0,
        details: '',
        service_id: ''
      },
      editPackageId: null,
      editPackage: {
        package_name: '',
        price: 0,
        details: ''
      },
      showDeleteConfirmation: false,
      deletePackageId: null,
      showServiceChangeConfirmation: false,
      tempServiceId: null
    };
  },
  created() {
    this.serviceId = this.$route.params.serviceId;
    this.fetchPackages(this.serviceId);
    this.fetchServices();
  },
  methods: {
    async fetchPackages(serviceId) {
      try {
        const token = localStorage.getItem('profToken');
        const response = await fetch(`http://127.0.0.1:5000/professionals/packagesByServiceId/${serviceId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        this.packages = data.packages;
        this.servicer = data.service;
      } catch (error) {
        console.error('Error fetching packages:', error);
        alert('An error occurred while fetching the packages.');
      }
    },
    async fetchServices() {
      try {
        const token = localStorage.getItem('profToken');
        const response = await fetch('http://127.0.0.1:5000/professionals/getAllServices', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        this.services = data.services;
      } catch (error) {
        console.error('Error fetching services:', error);
        alert('An error occurred while fetching the services.');
      }
    },
    async addPackage() {
      try {
        const token = localStorage.getItem('profToken');
        const response = await fetch('http://127.0.0.1:5000/professionals/package/create', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newPackage)
        });
        const data = await response.json();
        if (data.success) {
          alert('Package created successfully');
          this.showAddPackageForm = false;
          this.fetchPackages(this.serviceId);
        } else {
          alert('Failed to create package');
        }
      } catch (error) {
        console.error('Error creating package:', error);
        alert('An error occurred while creating the package.');
      }
    },
    editPackageForm(pkg) {
      this.editPackageId = pkg.id;
      this.editPackage = { ...pkg };
      console.log(this.editPackage);
    },
    async updatePackage(packageId) {
      try {
        const token = localStorage.getItem('profToken');
        const response = await fetch(`http://127.0.0.1:5000/professionals/editPackage/${packageId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.editPackage)
        });
        const data = await response.json();
        if (data.success) {
          alert('Package updated successfully');
          this.editPackageId = null;
          this.fetchPackages(this.serviceId);
        } else {
          alert('Failed to update package');
        }
      } catch (error) {
        console.error('Error updating package:', error);
        alert('An error occurred while updating the package.');
      }
    },
    confirmDelete(packageId) {
      this.showDeleteConfirmation = true;
      this.deletePackageId = packageId;
    },
    async deletePackage(packageId) {
      try {
        const token = localStorage.getItem('profToken');
        const response = await fetch(`http://127.0.0.1:5000/professionals/deletePackage/${packageId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          alert('Package deleted successfully');
          this.showDeleteConfirmation = false;
          this.fetchPackages(this.serviceId);
        } else {
          alert('Failed to delete package');
        }
      } catch (error) {
        console.error('Error deleting package:', error);
        alert('An error occurred while deleting the package.');
      }
    },
    cancelEdit() {
      this.editPackageId = null;
    },
    cancelDelete() {
      this.showDeleteConfirmation = false;
      this.deletePackageId = null;
    },
    getServiceName(serviceId) {
      const service = this.services.find(s => s.service_id === serviceId);
      return service ? service.service_name : 'Unknown Service';
    },
    confirmServiceChange() {
      this.showServiceChangeConfirmation = true;
      this.tempServiceId = this.editPackage.service_id;
    },
    confirmServiceChangeYes() {
      this.showServiceChangeConfirmation = false;
    },
    confirmServiceChangeNo() {
      this.editPackage.service_id = this.tempServiceId;
      this.showServiceChangeConfirmation = false;
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

.add-package-btn, .submit-btn, .cancel-btn, .edit-btn, .delete-btn, .confirm-btn {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 5px;
}

.add-package-btn:hover, .submit-btn:hover, .cancel-btn:hover, .edit-btn:hover, .delete-btn:hover, .confirm-btn:hover {
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
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.no-packages {
  text-align: center;
  margin: 20px 0;
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