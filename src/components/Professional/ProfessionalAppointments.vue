<template>
    <div class="container mt-4">
      <h2>Professional Appointments</h2>
      <FullCalendar :events="events" :plugins="[dayGridPlugin]" initialView="dayGridMonth" />
    </div>
  </template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/daygrid/main.css';

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      events: []
    };
  },
  async created() {
    this.fetchBookings();
  },
  methods: {
    async fetchBookings() {
      try {
        const token = localStorage.getItem('profToken');
        const response = await fetch('https://localhost:7001/api/Professional/getBookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          this.events = data.bookings.map(booking => ({
            title: `${booking.customer.customerName} - ${booking.package.packageName}`,
            start: new Date(booking.serviceAppointmentDate),
            end: new Date(booking.serviceAppointmentDate),
            description: `Status: ${booking.status}`
          }));
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