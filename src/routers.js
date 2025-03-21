import { createRouter, createWebHistory } from 'vue-router';
import { store } from './store';

import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';

import UserLoginComponent from './components/Login/UserLoginComponent';
import AdminLoginComponent from './components/Login/AdminLoginComponent';
import ProfessionalLoginComponent from './components/Login/ProfessionalLoginComponent';

import CustomerDashboard from './components/Customer/CustomerDashboard';
import CustomerProfile from './components/Customer/CustomerProfile.vue';
import CustomerBooking from './components/Customer/CustomerBooking.vue';
import PaymentPage from './components/Customer/PaymentPage.vue';
import CustomerPayments from './components/Customer/CustomerPayments.vue';
import CustomerRatings from './components/Customer/CustomerRatings.vue';
import CustomerPackage from './components/Customer/CustomerPackage.vue';
import CustomerReport from './components/Customer/CustomerReport.vue';

import ProfessionalDashboard from './components/Professional/ProfessionalDashboard.vue';
import ProfessionalProfile from './components/Professional/ProfessionalProfile.vue';
import ProfessionalService from './components/Professional/ProfessionalService.vue';
import ProfessionalPackage from './components/Professional/ProfessionalPackage.vue';
import ProfessionalBooking from './components/Professional/ProfessionalBooking.vue';
import ProfessionalPayment from './components/Professional/ProfessionalPayment.vue';
import ProfessionalRating from './components/Professional/ProfessionalRating.vue';
import ProfessionalAppointment from './components/Professional/ProfessionalAppointment.vue';

import AdminDashboard from './components/Admin/AdminDashboard.vue';
import AdminUsers from './components/Admin/AdminUsers.vue';
import AdminServices from './components/Admin/AdminServices.vue';
import AdminPackages from './components/Admin/AdminPackages.vue';
import AdminBookings from './components/Admin/AdminBookings.vue';
import AdminRequests from './components/Admin/AdminRequests.vue';
import AdminReports from './components/Admin/AdminReports.vue';

const routes = [
    {
        path: '/',
        name: 'HomeComponent',
        component: HomeComponent
    },
    {
        path: '/about',
        name: 'AboutComponent',
        component: AboutComponent
    },
    {
        path: '/login/customerlogin',
        name: 'UserLoginComponent',
        component: UserLoginComponent
    },
    {
        path: '/login/adminlogin',
        name: 'AdminLoginComponent',
        component: AdminLoginComponent
    },
    {
        path: '/login/professionallogin',
        name: 'ProfessionalLoginComponent',
        component: ProfessionalLoginComponent
    },
    {
        path: '/customerhome',
        name: 'CustomerDashboard',
        component: CustomerDashboard
    },
    {
        path: '/customerProfile',
        name: 'CustomerProfile',
        component: CustomerProfile
    },
    {
        path: '/customerBooking',
        name: 'CustomerBooking',
        component: CustomerBooking
    },
    {
        path: '/customerPayments',
        name: 'CustomerPaymnets',
        component: CustomerPayments
    },
    {
        path: '/customerRatings',
        name: 'CustomerRatings',
        component: CustomerRatings
    },
    {
        path: '/payment',
        name: 'PaymentPage',
        component: PaymentPage
    },
    {
        path: '/customerReport',
        name: 'customerReport',
        component: CustomerReport
    },
    {
        path: '/customerPackages/:serviceId',
        name: 'CustomerPackage',
        component: CustomerPackage,
        props: true,
    },
    {
        path: '/professionalhome',
        name: 'ProfessionalDashboard',
        component: ProfessionalDashboard
    },
    {
        path: '/professionalProfile',
        name: 'ProfessionalProfile',
        component: ProfessionalProfile
    },
    {
        path: '/professionalService',
        name: 'ProfessionalService',
        component: ProfessionalService
    },
    {
        path: '/professionalPackages/:serviceId',
        name: 'ProfessionalPackage',
        component: ProfessionalPackage,
        props: true,
    },
    {
        path: '/professionalBooking',
        name: 'ProfessionalBooking',
        component: ProfessionalBooking
    },
    {
        path: '/professionalPayment',
        name: 'ProfessionalPayment',
        component: ProfessionalPayment
    },
    {
        path: '/professionalRating',
        name: 'ProfessionalRating',
        component: ProfessionalRating
    },
    {
        path: '/professionalAppointment',
        name: 'ProfessionalAppointment',
        component: ProfessionalAppointment
    },
    {
        path: '/adminHome',
        name: 'AdminDashboard',
        component: AdminDashboard
    },
    {
        path: '/adminUsers',
        name: 'AdminUsers',
        component: AdminUsers
    },
    {
        path: '/adminServices',
        name: 'AdminServices',
        component: AdminServices
    },
    {
        path: '/adminPackages',
        name: 'AdminPackages',
        component: AdminPackages
    },
    {
        path: '/adminBookings',
        name: 'AdminBookings',
        component: AdminBookings
    },
    {
        path: '/adminRequests',
        name: 'AdminRequests',
        component: AdminRequests
    },
    {
        path: '/adminReports',
        name: 'AdminReports',
        component: AdminReports
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
    store.showNavBar = to.path === '/' || to.path === '/about';
    next();
  });

export default router;