import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCourses } from "../../../servises/operation/ProfileApi";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserEnrolledCourses(token);
        console.log("📦 All Enrolled Course Data:", data);

        if (Array.isArray(data)) {
          data.forEach((course, index) => {
            console.log(`\n📘 Course #${index + 1}`);
            console.log("🆔 Course ID:", course._id);
            console.log("📚 Name:", course.courseName);
            console.log("📝 Description:", course.courseDescription);
            console.log("🕒 Duration:", course.totalDuration);
            console.log("📊 Progress:", course.progressPercentage);
            console.log("🖼️ Thumbnail:", course.thumbnail);

            if (Array.isArray(course.courseContent)) {
              course.courseContent.forEach((section, sIdx) => {
                console.log(`  📂 Section #${sIdx + 1} - ${section.sectionName}`);
                console.log("  🔗 Section ID:", section._id);

                if (Array.isArray(section.subSection)) {
                  section.subSection.forEach((sub, subIdx) => {
                    console.log(`    🎞️ SubSection #${subIdx + 1} - ${sub.title}`);
                    console.log("    ⏱️ Duration:", sub.timeDuration);
                    console.log("    🔗 ID:", sub._id);
                  });
                } else {
                  console.warn(`    ❌ No subSections in section ${section.sectionName}`);
                }
              });
            } else {
              console.warn("❌ No courseContent found for course:", course.courseName);
            }
          });
        }

        setEnrolledCourses(data);
      } catch (err) {
        console.log("❌ Unable to Fetch Enrolled Courses:", err);
      }
    })();
  }, [token]);

  return (
    <div className="text-white p-6">
      <table className="w-full text-left">
        <thead className="bg-richblack-700 text-sm uppercase">
          <tr>
            <th className="px-4 py-3">Course Name</th>
            <th className="px-4 py-3">Duration</th>
            <th className="px-4 py-3">Progress</th>
          </tr>
        </thead>

        <tbody>
          {enrolledCourses?.length ? (
            enrolledCourses.map((course, idx) => {
              const firstSection = course.courseContent?.[0];
              const firstSubSection = firstSection?.subSection?.[0];

              return (
                <tr
                  key={course._id || idx}
                  className="cursor-pointer border-b border-richblack-600 hover:bg-richblack-800 transition"
                  onClick={() => {
                    if (!firstSection || !firstSubSection) {
                      console.warn("❌ Missing section or subSection for course:", course.courseName);
                      return;
                    }

                    navigate(
                      `/view-course/${course._id}/section/${firstSection._id}/sub-section/${firstSubSection._id}`
                    );
                  }}
                >
            
                  <td className="px-4 py-4 flex items-center gap-4">
                    <img
                      src={course.thumbnail}
                      alt="course"
                      className="w-[60px] h-[50px] rounded-md object-cover"
                    />
                    <div>
                      <p className="font-semibold text-white">{course.courseName}</p>
                      <p className="text-xs text-richblack-300">
                        {course.courseDescription?.slice(0, 50)}
                        {course.courseDescription?.length > 50 && "…"}
                      </p>
                    </div>
                  </td>

              
                  <td className="px-4 py-4 text-richblack-200">
                    {course.totalDuration ?? "–"}
                  </td>

                
                  <td className="px-4 py-4">
                    <div className="w-full bg-richblack-700 h-2 rounded-full mb-1">
                      <div
                        className={`h-2 rounded-full ${
                          course.progressPercentage === 100
                            ? "bg-caribbeangreen-400"
                            : "bg-yellow-400"
                        }`}
                        style={{ width: `${course.progressPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs">
                      {course.progressPercentage === 100
                        ? "Completed"
                        : `Progress ${course.progressPercentage || 0}%`}
                    </p>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-6 text-richblack-300">
                No Enrolled Courses
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EnrolledCourses;
