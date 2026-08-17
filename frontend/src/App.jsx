import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Department from "./pages/Department";
import DepartmentDetail from "./pages/DepartmentDetail";
import ServiceDetail from "./pages/ServiceDetail";
import DoctorsPage from "./pages/doctors/DoctorsPage";
import DoctorProfile from "./pages/doctors/DoctorProfile";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import ContactUs from "./pages/ContactUs";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import EmergencyMedicineBlog from "./pages/blog/EmergencyMedicineBlog";
import CarePlanningBlog from "./pages/blog/CarePlanningBlog";
import ConnectDoctorBlog from "./pages/blog/ConnectDoctorBlog";
import DigitalDentistryBlog from "./pages/blog/DigitalDentistryBlog";
import NutritionDentalBlog from "./pages/blog/NutritionDentalBlog";

// Auth
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { RequireAuth, RequireAdmin } from "./components/ProtectedRoute";

// User dashboard
import DashboardLayout from "./pages/user/DashboardLayout";
import UserDashboard from "./pages/user/Dashboard";
import UserProfile from "./pages/user/Profile";
import UserAppointments from "./pages/user/Appointments";
import UserComments from "./pages/user/Comments";

// Admin dashboard
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAppointments from "./pages/admin/Appointments";
import AdminUsers from "./pages/admin/Users";
import AdminDoctors from "./pages/admin/Doctors";
import AdminServices from "./pages/admin/Services";
import AdminBlogs from "./pages/admin/Blogs";
import AdminBlogCategories from "./pages/admin/BlogCategories";
import AdminPricing from "./pages/admin/Pricing";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminComments from "./pages/admin/Comments";
import AdminHomeContent from "./pages/admin/HomeContent";
import AdminProfile from "./pages/admin/Settings";
import AdminSubscribers from "./pages/admin/Subscribers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public website */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/department" element={<Department />} />
        <Route path="/department/:slug" element={<DepartmentDetail />} />
        <Route path="/doctor" element={<DoctorsPage />} />
        <Route path="/doctor/:slug" element={<DoctorProfile />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/:slug" element={<ServiceDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/blog/emergency-medicine-research-course" element={<EmergencyMedicineBlog />} />
        <Route path="/blog/advance-care-planning-information-session" element={<CarePlanningBlog />} />
        <Route path="/blog/connect-with-doctor-for-treatment" element={<ConnectDoctorBlog />} />
        <Route path="/blog/future-of-digital-dentistry" element={<DigitalDentistryBlog />} />
        <Route path="/blog/nutrition-and-dental-health" element={<NutritionDentalBlog />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User dashboard (protected) */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="appointments" element={<UserAppointments />} />
          <Route path="comments" element={<UserComments />} />
        </Route>

        {/* Admin dashboard (protected + admin only) */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="blog-categories" element={<AdminBlogCategories />} />
          <Route path="pricing" element={<AdminPricing />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="comments" element={<AdminComments />} />
          <Route path="home-content" element={<AdminHomeContent />} />
          <Route path="subscribers" element={<AdminSubscribers />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
