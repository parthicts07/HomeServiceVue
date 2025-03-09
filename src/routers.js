import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';
import UserLoginComponent from './components/Login/UserLoginComponent';
import AdminLoginComponent from './components/Login/AdminLoginComponent';
import ProfessionalLoginComponent from './components/Login/ProfessionalLoginComponent';
import { store } from './store';
import CustomerDashboard from './components/Customer/CustomerDashboard';
import CustomerProfile from './components/Customer/CustomerProfile.vue';
import CustomerBooking from './components/Customer/CustomerBooking.vue';
import ProfessionalDashboard from './components/Professional/ProfessionalDashboard.vue';
import ProfessionalAppointments from './components/Professional/ProfessionalAppointments.vue';

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
        path: '/login/userlogin',
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
        path: '/professionalhome',
        name: 'ProfessionalDashboard',
        component: ProfessionalDashboard
    },
    {
        path: '/ProfessionalAppointments',
        name: 'ProfessionalAppointments',
        component: ProfessionalAppointments
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