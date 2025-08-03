

import React from "react";
import { footerData } from "../../data/FooterData";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const iconMap = {
  FaFacebook: <FaFacebook className="text-richblack-100" />,
  FaTwitter: <FaTwitter className="text-richblack-100" />,
  FaYoutube: <FaYoutube className="text-richblack-100" />,
  FcGoogle: <FcGoogle className="text-richblack-100" />,
};

const Footer = () => {
  return (
    <footer className="bg-[#161D29] text-[#6E727F] py-10">
      <div className="max-w-10/12 mx-auto flex flex-wrap justify-between gap-10">

       
        <div className="min-w-[160px] flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-white">StudyNotion</h1>
          <p className="text-[#AFB2BF] font-semibold">{footerData.left.title}</p>
          <ul className="space-y-1 text-sm">
            {footerData.left.links.map((link, idx) => (
              <li key={idx} className="cursor-pointer hover:text-white">
                {link}
              </li>
            ))}
          </ul>
          <div className="flex gap-3 mt-2">
            {footerData.left.socials.map((icon, idx) => (
              <span key={idx} className="text-lg hover:text-white cursor-pointer">
                {iconMap[icon]}
              </span>
            ))}
          </div>
        </div>

        
        {footerData.columns.map((group, index) => (
          <div key={index} className="flex flex-col gap-6 min-w-[140px]">
            {group.map((section, idx) => (
              <div key={idx}>
                <p className="text-[#AFB2BF] font-semibold mb-2">{section.title}</p>
                <ul className="space-y-1 text-sm">
                  {section.links.map((item, i) => (
                    <li key={i} className="hover:text-white cursor-pointer">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>


      <div className="border-t border-richblack-700 mt-10 pt-4 text-sm text-center text-richblack-300">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-10/12 mx-auto">
          <div className="mb-2 md:mb-0 flex gap-2">
            <span>Privacy Policy</span>
            <span>|</span>
            <span>Cookie Policy</span>
            <span>|</span>
            <span>Terms</span>
          </div>
          <p>
            Made with <span className="text-pink-500">❤</span> by CodeHelp © 2023 StudyNotion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
