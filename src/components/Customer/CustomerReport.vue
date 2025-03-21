<template>
    <div id="CustomerReport">
      <CustomerNavbar />
      <div class="container mt-4">
        <h2>Frequently Asked Questions (FAQs)</h2>
        <div class="faq-section">
          <div v-for="faq in faqs" :key="faq.id" class="faq-item">
            <h5>{{ faq.question }}</h5>
            <p>{{ faq.answer }}</p>
          </div>
        </div>
        <h2>Report an Issue</h2>
        <form @submit.prevent="submitReport">
          <div class="mb-3">
            <label for="reportType" class="form-label">Report Type</label>
            <select v-model="reportType" @change="fetchEntities" class="form-select" id="reportType" required>
              <option value="" disabled>Select report type</option>
              <option value="professional">Professional</option>
              <option value="service">Service</option>
              <option value="package">Package</option>
            </select>
          </div>
          <div v-if="entities.length" class="mb-3">
            <label for="reportingId" class="form-label">Select {{ reportType }}</label>
            <select v-model="reportingId" class="form-select" id="reportingId" required>
              <option value="" disabled>Select {{ reportType }}</option>
              <option v-for="entity in entities" :key="entity.id" :value="entity.id">
                {{ entity.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="reason" class="form-label">Reason</label>
            <textarea v-model="reason" class="form-control" id="reason" rows="3" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit Report</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import CustomerNavbar from './CustomerNavbar';
  
  export default {
    name: 'CustomerReport',
    components: {
      CustomerNavbar,
    },
    data() {
      return {
        faqs: [
          { id: 1, question: 'How do I report an issue?', answer: 'You can report an issue by filling out the form below.' },
          { id: 2, question: 'What types of issues can I report?', answer: 'You can report issues related to professionals, services, or packages.' },
          // Add more FAQs as needed
        ],
        reportType: '',
        reportingId: '',
        reason: '',
        entities: [],
      };
    },
    methods: {
      async fetchEntities() {
        let url = '';
        if (this.reportType === 'professional') {
          url = 'http://127.0.0.1:5000/customers/getProfessionals';
        } else if (this.reportType === 'service') {
          url = 'http://127.0.0.1:5000/customers/getAllServices';
        } else if (this.reportType === 'package') {
          url = 'http://127.0.0.1:5000/customers/getPackages';
        }
  
        if (url) {
          try {
            const response = await fetch(url, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('custToken')}`
              }
            });
            const data = await response.json();
            if (data.success) {
              if (this.reportType === 'professional') {
                this.entities = data.profiles.map(entity => ({
                  id: entity.professional_id,
                  name: entity.name,
                }));
              } else if (this.reportType === 'service') {
                this.entities = data.services.map(entity => ({
                  id: entity.service_id,
                  name: entity.service_name,
                }));
              } else if (this.reportType === 'package') {
                this.entities = data.packages.map(entity => ({
                  id: entity.id,
                  name: entity.package_name,
                }));
              }
            }
          } catch (error) {
            console.error('Error fetching entities:', error);
          }
        }
      },
      async submitReport() {
        try {
          const response = await fetch('http://127.0.0.1:5000/customers/report', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('custToken')}`
            },
            body: JSON.stringify({
              report_type: this.reportType,
              reporting_id: this.reportingId,
              reason: this.reason,
            })
          });
          const data = await response.json();
          if (data.success) {
            alert('Report submitted successfully');
            this.reportType = '';
            this.reportingId = '';
            this.reason = '';
            this.entities = [];
          } else {
            alert('Failed to submit report');
          }
        } catch (error) {
          console.error('Error submitting report:', error);
          alert('An error occurred while submitting the report.');
        }
      },
    },
  };
  </script>
  
  <style>
  .faq-section {
    margin-bottom: 20px;
  }
  
  .faq-item {
    margin-bottom: 10px;
  }
  
  .form-label {
    font-weight: bold;
  }
  
  .btn-primary {
    margin-top: 10px;
  }
  </style>