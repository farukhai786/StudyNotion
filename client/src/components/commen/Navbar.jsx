import React from 'react'
import NavbarLogo from "../../assets/NavbarLogo.png"
import { Link, useLocation, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import ProfileDropDown from '../cors/Auth/profileDropDown'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { apiConnector } from "../../servises/apiconnector"
import { categories } from "../../servises/apis";
import { useEffect } from 'react'
import { useState } from 'react'
export default function Navbar() {
const { token } = useSelector((state) => state.auth);
const { user } = useSelector((state) => state.profile);
const { totalItems } = useSelector((state) => state.cart);



const [subLinks, setSubLinks] = useState([]);

useEffect(() => {
  console.log("🚀 useEffect Triggered");
  const fetchData = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Printing Sublinks result:", result);
      setSubLinks(result?.data?.allCatagory || []);
    } catch (error) {
      console.log("Could not fetch the category list", error);
    }
  };

  fetchData();
}, []);







  const location = useLocation();

const matchRoutes = (route) => {
  if (!route) return false;
  return matchPath(route, location.pathname);
};

const slugify = (s="") => s.trim().toLowerCase().replace(/\s+/g, "_");
  return (
    <div className='bg-[#161D29] '>
       <div className='  flex  max-w-10/12 items-center justify-center border-b-[1px] border-b-[#2C333F] py-3 mx-auto'>
         <div className='flex  flex-row w-full  items-center justify-between'>
            <Link to="/">
               <img src={NavbarLogo} width={160} height={42} loading='lazy' />
            </Link>

           <nav>
            <ul className='flex gap-x-6 text-[#DBDDEA]'>
            {
              NavbarLinks.map((link, index) => (
               link.title === "Catalog" ? (
           <div key={index} className="relative group">
              <p
                 className={`cursor-pointer ${
                    matchRoutes(link?.path) ? "text-yellow-100" : "text-[#DBDDEA]"
                   }`}
               >
                  {link.title}
              </p>

          
               <div className="invisible group-hover:visible absolute left-0 top-full z-50 mt-2 w-[200px] rounded-md bg-white shadow-lg transition-all duration-200">
                  <ul className="flex flex-col text-black p-2">
                    {subLinks.length === 0 ? (
                      <li className="px-4 py-2 text-sm">Loading...</li>
                    ) : (
                      subLinks.map((category, i) => (
                        <Link
                          to={`/catalog/${slugify(category.name)}`}
                          key={i}
                        >
                          <li className="px-4 py-2 text-sm hover:bg-gray-100">
                            {category.name}
                          </li>
                        </Link>
                      ))
                    )}
                  </ul>
                </div>
              </div>
               )
               : (              
                             <Link to={link?.path} key={index}>
                               <p className={`${matchRoutes(link?.path) ? "text-yellow-100" : "text-[#DBDDEA]"}`}>
                                 {link.title}
                               </p>
                             </Link>
                           )
                         ))
                       }
                     </ul>
                   </nav>
           
               <div className="flex items-center gap-4">
                
                  {user && user?.accountType !== "Instructor" && (
                    <Link to="/dashboard/cart" className="relative text-white text-xl">
                      <AiOutlineShoppingCart />
                      {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#FACC15] text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                          {totalItems}
                        </span>
                      )}
                    </Link>  
                  )}
           
                   {token === null && (
                     <Link to="/login">
                       <button className="px-4 py-1 rounded-md text-white bg-[#161D29] border border-[#2C333F] hover:bg-[#2C333F] transition-all">
                         Log in
                       </button>
                     </Link>
                   )}
      
              
                  {token === null && (
                    <Link to="/signup">
                      <button className="px-4 py-1 rounded-md text-white bg-[#FACC15] hover:bg-yellow-300 font-semibold transition-all">
                        Sign up
                      </button>
                    </Link>
                  )}
                
                
                  {token !== null && <ProfileDropDown />}
             </div>
      </div>
       </div> 

    </div>
  )
}
