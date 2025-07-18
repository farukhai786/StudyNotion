import LearningGrid from '../components/cors/AboutPage/LearningGrid'
import Img1 from '../assets/story-section.png'
import Herosectionimg1 from '../assets/Herosection-1.png'
import Herosectionimg2 from '../assets/Herosection-2.png'
import Herosectionimg3 from '../assets/Herosection-3.png'
import HighlightText from '../components/cors/HomePage/HighlightText'
import ContactForm from '../components/cors/AboutPage/ContectUsForm'
import Footer from '../components/commen/Footer'

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#161D29]">
        <div className="w-11/12 max-w-screen-xl mx-auto flex flex-col items-center justify-between pt-12 md:h-[570px]">

          {/* Text Content */}
          <div className="flex flex-col items-center gap-4 text-center px-4 mt-16">
            <p className="text-[#999DAA] pt-2 mb-6 text-sm md:text-base">About us</p>

            <div className="font-semibold text-2xl md:text-3xl leading-snug md:leading-[44px] text-[#F1F2FF]">
              <p>Driving Innovation in Online Education for a</p>
              <HighlightText text="Brighter Future" />
            </div>

            <p className="text-[#838894] text-sm md:text-base leading-6 max-w-[90%] md:max-w-[64%] mx-auto font-semibold">
              Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a
              brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a
              vibrant learning community.
            </p>
          </div>

          {/* Images */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-10 md:mt-0 w-full md:translate-y-8">
            <img src={Herosectionimg1} alt="Student 1" loading="lazy" className="w-24 md:w-40" />
            <img src={Herosectionimg2} alt="Student 2" loading="lazy" className="w-24 md:w-40" />
            <img src={Herosectionimg3} alt="Student 3" loading="lazy" className="w-24 md:w-40" />
          </div>
        </div>
      </section>

      {/* Quotation Section */}
      <section className="px-4 py-16">
        <div className="w-full max-w-screen-lg mx-auto text-center text-[#D1D5DB] text-xl sm:text-2xl md:text-3xl leading-relaxed">
          <p className="inline-block">
            <span className="text-4xl text-gray-500 mr-2">“</span>
            We are passionate about revolutionizing the way we learn. Our
          </p>
          <p>
            innovative platform
            <span className="bg-gradient-to-r from-cyan-400 via-orange-400 to-gray-400 bg-clip-text text-transparent font-semibold">
              {' '}combines technology, expertise,
            </span>
            and community to
          </p>
          <p className="text-yellow-400 font-bold">
            create an unparalleled educational experience.
            <span className="text-4xl text-gray-500 ml-2">”</span>
          </p>
        </div>
      </section>

      {/* Founding/Vision/Mission Section */}
      <section className="py-12 px-4">
        <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row flex-wrap gap-12 justify-center font-semibold">

          {/* Founding Story */}
          <div className="text-[#838894] max-w-md flex flex-col gap-6">
            <p className="text-4xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent">
              Our Founding Story
            </p>
            <p>
              Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
            </p>
            <p>
              As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
            </p>
          </div>

          {/* Image */}
          <div className="max-w-md flex items-center justify-center">
            <img src={Img1} className="w-full max-w-[470px] h-auto rounded-md" alt="Story" />
          </div>

          {/* Vision */}
          <div className="text-[#838894] max-w-md flex flex-col gap-4">
            <p className="text-4xl bg-gradient-to-r from-[#E65C00] via-[#F9D423] to-[#FFD700] bg-clip-text text-transparent">
              Our Vision
            </p>
            <p>
              With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
            </p>
          </div>

          {/* Mission */}
          <div className="text-[#838894] max-w-md flex flex-col gap-4">
            <p className="text-4xl bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
              Our Mission
            </p>
            <p>
              Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0F1117] py-16">
        <div className="w-11/12 mx-auto flex flex-wrap justify-center gap-8 text-white">
          {[
            ['5K', 'Active Students'],
            ['10+', 'Mentors'],
            ['200+', 'Courses'],
            ['50+', 'Awards']
          ].map(([stat, label]) => (
            <div key={label} className="w-32 sm:w-40 h-24 flex flex-col items-center justify-center gap-2 text-center">
              <h3 className="text-2xl font-bold">{stat}</h3>
              <p className="text-sm text-[#585D69] font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <LearningGrid />
      </section>

      <section className="flex flex-col items-center mt-20 px-4 py-12">
        <div className='w-full max-w-screen-md text-center text-amber-50 py-6 gap-6 flex flex-col'>
          <h1 className='text-3xl md:text-4xl font-semibold leading-8'>Get in Touch</h1>
          <p className='text-base font-medium text-[#838894]'>We’d love to hear from you, please fill out this form.</p>
        </div>
        <ContactForm />
      </section>

      <Footer />
    </div>
  )
}
