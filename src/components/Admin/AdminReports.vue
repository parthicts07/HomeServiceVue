<template>
    <div class="admin-reports">
      <h1>Admin Reports</h1>
      <div v-if="reports.length">
        <table>
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Customer Name</th>
              <th>Report Type</th>
              <th>Entity Name</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report in reports" :key="report.id">
              <td>{{ report.id }}</td>
              <td>{{ report.customer_name }}</td>
              <td>{{ report.report_type }}</td>
              <td>{{ report.entity_name }}</td>
              <td>{{ report.reason }}</td>
              <td :class="statusClass(report.status)">{{ report.status }}</td>
              <td>{{ report.created_at }}</td>
              <td>
                <button @click="resolveReport(report.id, 'flag')" class="action-button">Flag</button>
                <button @click="resolveReport(report.id, '')" class="action-button">Ignore</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No reports found.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reports: []
      };
    },
    created() {
      this.fetchReports();
    },
    methods: {
      async fetchReports() {
        try {
          const response = await fetch('http://127.0.0.1:5000/admin/reports', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.reports = data.reports;
            console.log(this.reports);
          } else {
            alert('Failed to load reports');
          }
        } catch (error) {
          console.error('Error fetching reports:', error);
          alert('An error occurred while fetching the reports.');
        }
      },
      async resolveReport(reportId, action) {
        try {
          const response = await fetch(`http://127.0.0.1:5000/admin/reports/${reportId}/resolve`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action })
          });
          const data = await response.json();
          if (data.success) {
            this.fetchReports(); 
          } else {
            alert('Failed to resolve report');
          }
        } catch (error) {
          console.error('Error resolving report:', error);
          alert('An error occurred while resolving the report.');
        }
      },
      statusClass(status) {
        switch (status.toLowerCase()) {
          case 'pending':
            return 'status-pending';
          case 'resolved':
            return 'status-resolved';
          default:
            return 'status-default';
        }
      }
    }
  };
  </script>
  
  <style>
  .admin-reports {
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
  
  .status-pending {
    background-color: #fff3cd;
  }
  
  .status-resolved {
    background-color: #d4edda;
  }
  
  .status-default {
    background-color: #e2e3e5;
  }
  
  .action-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    margin-right: 5px;
  }
  
  .action-button:hover {
    background-color: #0056b3;
  }
  </style>