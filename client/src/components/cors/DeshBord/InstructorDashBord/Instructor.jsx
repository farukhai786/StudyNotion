import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getInstructorCourses } from "../../../../servises/operation/CourseApi"
import { getInstructorData } from "../../../../servises/operation/ProfileApi"
import InstructorChart from "./InstructorChart"

const formatNumber = (num) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(num)

const Instructor = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true)
      try {
        const instructorApiData = await getInstructorData(token)
        const result = await getInstructorCourses(token)

        if (instructorApiData?.length) {
          setInstructorData(instructorApiData)
        }
        if (result) {
          setCourses(result)
        }
      } catch (error) {
        console.error("Fetching error:", error)
      }
      setLoading(false)
    }

    getCourseDataWithStats()
  }, [token])

  const totalAmount =
    instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0) || 0

  const totalStudents =
    instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0) || 0

  return (
    <div className="w-11/12 mx-auto text-[#F1F2FF] space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Hi Soumya 👋</h1>
        <p className="text-gray-400">Let's start something new</p>
      </div>

      {loading ? (
        <div className="text-center text-gray-300">Loading data...</div>
      ) : (
        <>
          {/* Chart + Stats */}
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Chart Card */}
            <div className="bg-[#161D29] p-6 rounded-md flex-1">
              <h2 className="text-lg font-semibold mb-4">Visualize</h2>
              <InstructorChart courses={courses} />
            </div>

            {/* Stats Card */}
            <div className="bg-[#161D29] p-6 rounded-md w-full lg:w-1/3 space-y-2">
              <h2 className="text-lg font-semibold mb-2">Statistics</h2>
              <p className="text-sm text-gray-300">Total Courses: {courses.length}</p>
              <p className="text-sm text-gray-300">Total Students: {formatNumber(totalStudents)}</p>
              <p className="text-sm text-gray-300">
                Total Income:{" "}
                <span className="font-bold text-yellow-100">₹{formatNumber(totalAmount)}</span>
              </p>
            </div>
          </div>

          {/* Courses Preview */}
          <div className="bg-[#161D29] p-3 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Courses</h2>
              {courses.length > 3 && (
                <button
                  className="text-yellow-50 text-sm underline"
                  onClick={() => navigate("/dashboard/my-courses")}
                >
                  View All
                </button>
              )}
            </div>

            {courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.slice(0, 3).map((course) => (
                  <div
                    key={course._id}
                    className=" rounded-md shadow-sm hover:scale-[1.01] transition-all duration-200"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-40 w-full object-cover rounded-md"
                    />
                    <h3
                      className="mt-2 text-md font-semibold truncate"
                      title={course.courseName}
                    >
                      {course.courseName}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {formatNumber(course.studentsEnrolled.length)} students | ₹{formatNumber(course.price)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No courses found.</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Instructor
