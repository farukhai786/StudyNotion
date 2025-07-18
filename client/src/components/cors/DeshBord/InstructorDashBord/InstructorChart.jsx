import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { useState, useMemo } from "react"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

const InstructorChart = ({ courses }) => {
  const [chartType, setChartType] = useState("students")

  const { labels, dataValues, backgroundColors } = useMemo(() => {
    const rawData = courses.map((course) => ({
      label: course.courseName,
      value:
        chartType === "students"
          ? course?.studentsEnrolled?.length || 0
          : (course?.price || 0) * (course?.studentsEnrolled?.length || 0),
    }))

    const sorted = rawData.sort((a, b) => b.value - a.value)
    const top = sorted.slice(0, 6)
    const others = sorted.slice(6)
    const otherTotal = others.reduce((acc, curr) => acc + curr.value, 0)

    if (otherTotal > 0) {
      top.push({ label: "Others", value: otherTotal })
    }

    const labels = top.map((item) => item.label)
    const dataValues = top.map((item) => item.value)
    const backgroundColors = generateRandomColors(labels.length)

    return { labels, dataValues, backgroundColors }
  }, [courses, chartType])

  const chartData = {
    labels,
    datasets: [
      {
        label: chartType === "students" ? "Students Enrolled" : "Income Generated",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: "#1f1f1f",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw
            return `${context.label}: ${
              chartType === "students" ? `${value} students` : `₹${value}`
            }`
          },
        },
      },
      legend: {
        position: "top",
        labels: {
          color: "#fff",
          boxWidth: 40,
          padding: 8,
          font: {
            size: 12,
          },
        },
      },
    },
  }

  return (
    <div className="bg-[#161D29] rounded-xl w-full max-w-xl mx-auto p-4">
    
      <div className="flex mb-4 gap-6 border-b border-[#2C333F]">
        {["students", "income"].map((type) => (
          <button
            key={type}
            className={`text-sm font-semibold pb-1 border-b-2 transition-all duration-200 ${
              chartType === type
                ? "text-yellow-100 border-yellow-100"
                : "text-[#838894] border-transparent"
            }`}
            onClick={() => setChartType(type)}
          >
            {type === "students" ? "Students" : "Income"}
          </button>
        ))}
      </div>

      <div className="h-[300px]">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  )
}


const generateRandomColors = (numColors) => {
  const colors = []
  for (let i = 0; i < numColors; i++) {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    colors.push(`rgb(${r}, ${g}, ${b})`)
  }
  return colors
}

export default InstructorChart
