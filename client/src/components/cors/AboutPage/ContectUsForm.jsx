import React from "react"
import { useForm } from "react-hook-form"
import countryCodes from "../../../data/countryCode.js"
const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log("Form Data:", data)
    alert("Message sent!")
  }

  return (
    
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" p-8 rounded-md text-white space-y-4 max-w-md mx-auto"
    >
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block font-normal text-sm text-[#F1F2FF]">First Name</label>
          <input
            type="text"
            placeholder="Enter first name"
            {...register("firstName", { required: "First name is required" })}
            className="w-full p-2 bg-[#161D29] rounded-md border border-slate-600"
          />
          {errors.firstName && (
            <p className="text-red-400 text-xs">{errors.firstName.message}</p>
          )}
        </div>

        <div className="w-1/2">
          <label className="block font-normal text-sm text-[#F1F2FF]">Last Name</label>
          <input
            type="text"
            placeholder="Enter last name"
            {...register("lastName", { required: "Last name is required" })}
            className="w-full p-2 bg-[#161D29] rounded-md border border-slate-600"
          />
          {errors.lastName && (
            <p className="text-red-400 text-xs">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block font-normal text-sm text-[#F1F2FF]">Email Address</label>
        <input
          type="email"
          placeholder="Enter email address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
          className="w-full p-2 bg-[#161D29] rounded-md border border-slate-600"
        />
        {errors.email && (
          <p className="text-red-400 text-xs">{errors.email.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <div className="w-[40%]">
          <label className="block font-normal text-sm text-[#F1F2FF]">Phone Code</label>
        <select
  {...register("code")}
  className="w-full p-2 bg-[#161D29] text-white rounded-md border border-slate-600 
             focus:outline-none focus:ring-2 focus:ring-yellow-400 
             h-10 overflow-y-auto"
  size={1} // Ensures dropdown opens on click
>
  <option value="">Select Code</option>
  {countryCodes.map((country) => (
    <option
      key={country.code}
      value={country.code}
      className="text-[#999DAA]"
    >
      {country.code} {country.name}
    </option>
  ))}
</select>



        </div>

        <div className="w-[60%]">
          <label className="block font-normal text-sm text-[#F1F2FF]">Phone Number</label>
          <input
            type="tel"
            placeholder="12345 67890"
            {...register("phone", {
              required: "Phone number is required",
              minLength: {
                value: 10,
                message: "Must be 10 digits",
              },
            })}
            className="w-full p-2 bg-[#161D29] rounded-md border border-slate-600"
          />
          {errors.phone && (
            <p className="text-red-400 text-xs">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block font-normal text-sm text-[#F1F2FF]">Message</label>
        <textarea
          rows="4"
          placeholder="Enter email address"
          {...register("message", { required: "Message is required" })}
          className="w-full p-2 bg-[#161D29] rounded-md border border-slate-600" 
        />
        {errors.message && (
          <p className="text-red-400 text-xs">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold w-full py-2 rounded-md"
      >
        Send Message
      </button>
    </form>
  )
}

export default ContactForm
