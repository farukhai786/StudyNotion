



  import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Navbar from './components/commen/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/UpdatePassword'
import ResetComplete from './pages/ResetCompleted'
import VerifyEmail from "./pages/VerifyEmail"
import MyProfile from './components/cors/DeshBord/MyProfile'
import DeshBord from './pages/DeshBord'
import Error from "./pages/Error"
import EditProfile from './pages/EditProfile'
import EnrolledCourses from './components/cors/DeshBord/EnrolledCourses'
import Cart from './components/cors/Cart'
import AddCourse from './components/cors/DeshBord/AddCourse'
import OpenRoute from './components/cors/Auth/OpenRouter'
import PrivateRoute from './components/cors/Auth/PrivateRoute'
import {ACCOUNT_TYPE} from "./utils/constants"
import { useSelector } from 'react-redux'
import MyCourses from './components/cors/DeshBord/MyCourses'
import EditCourse from './components/cors/DeshBord/EditCourse'
import Catalog from './pages/Catalog'
import CourseDetails from "./pages/CourseDetails"
import { Navigate } from 'react-router-dom'
import ViewCourse from './pages/ViewCourse'
import VideoDetailsSlider from './components/cors/ViewCourse/VideoDetailsSlider'
import VideoDetails from "./components/cors/ViewCourse/VideoDetails"
import Instructor from './components/cors/DeshBord/InstructorDashBord/Instructor'
function App() {
  const { user } = useSelector((state) => state.profile);
  return (
   <div className="w-screen min-h-screen font-inter overflow-auto scrollbar-hide">
      <Navbar />
<Routes>
        {/* Open Routes */}
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/reset-complete" element={<ResetComplete />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/catalog/:catalogName" element={<Catalog/>} />
        <Route path="/course/:courseId" element={<CourseDetails/>} />
        {/* Private Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DeshBord />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="my-profile" replace />} />
          {/* Common for all users */}
     
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="settings" element={<EditProfile />} />

          {/* Student-specific routes */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="cart" element={<Cart />} />
              <Route path="enrolled-courses" element={<EnrolledCourses />} />
            </>
          )}

          {/* Instructor-specific routes */}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="add-course" element={<AddCourse />} />
              <Route path="my-courses" element={<MyCourses />} />
               <Route path="edit-course/:courseId" element={<EditCourse />} />
               <Route path='instructor' element={<Instructor/>}></Route>
            </>
          )}
        </Route>
        
     {/* ───────── Course‑player route (protected) ───────── */}




// parent  ──────────────────────────────────────────
<Route
  path="/view-course/:courseId"
  element={
    <PrivateRoute>
      <ViewCourse />          {/* 1×  ← sidebar lives here */}
    </PrivateRoute>
  }
>
  {/* child (lecture/player) ─────────────────────── */}
  <Route
    path="section/:sectionId/sub-section/:subSectionId"
    element={<VideoDetails/>} /*  NOT  <ViewCourse/> or <VideoDetailsSidebar/> */
  />
</Route>


          
           <Route path="*" element={<Error/>} />
         
      </Routes>
    </div>

  )
}

export default App





