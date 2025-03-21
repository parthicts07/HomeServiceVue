<template>
    <div class="container">
      <h1>My Appointments</h1>
      <vue-cal
        :events="events"
        :disable-views="['years', 'year']"
        default-view="month"
        time="24"
        style="height: 600px;"
      />
    </div>
  </template>
  
  <script>
  import VueCal from 'vue-cal';
  import 'vue-cal/dist/vuecal.css';
  
  export default {
    components: {
      VueCal
    },
    data() {
      return {
        events: []
      };
    },
    created() {
      this.fetchAppointments();
    },
    methods: {
      async fetchAppointments() {
        try {
          const token = localStorage.getItem('profToken');
          const response = await fetch('http://127.0.0.1:5000/professionals/myAppointments', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (data.success) {
            this.events = data.bookings.map(booking => {
              const start = new Date(booking.appointment_date);
              const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
              let eventClass;
              switch (booking.status) {
                case 'Accepted':
                  eventClass = 'accepted-event';
                  break;
                case 'Pending':
                  eventClass = 'pending-event';
                  break;
                case 'Rejected':
                  eventClass = 'rejected-event';
                  break;
                case 'Completed':
                  eventClass = 'completed-event';
                  break;
                default:
                  eventClass = 'default-event';
              }
              return {
                start: this.convertToIST(start),
                end: this.convertToIST(end),
                title: `Booking ID: ${booking.booking_id}`,
                content: `Status: ${booking.status}`,
                class: eventClass
              };
            });
          } else {
            alert('Failed to load appointments');
          }
        } catch (error) {
          console.error('Error fetching appointments:', error);
          alert('An error occurred while fetching the appointments.');
        }
      },
      convertToIST(date) {
        const offset = 5.5 * 60 * 60 * 1000; 
        const istDate = new Date(date.getTime() + offset);
        return istDate.toISOString().slice(0, 19).replace('T', ' ');
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

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.vuecal__event {
  font-size: 14px; 
  padding: 10px; 
}

.accepted-event {
  background-color: green !important;
  color: white !important;
}

.pending-event {
  background-color: orange !important;
  color: white !important;
}

.rejected-event {
  background-color: red !important;
  color: white !important;
}

.completed-event {
  background-color: blue !important;
  color: white !important;
}

.default-event {
  background-color: gray !important;
  color: white !important;
}
</style>