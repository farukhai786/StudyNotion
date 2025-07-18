// import React from 'react'
// import { Link } from 'react-router-dom'

// export default function Button({children, active, linkto}) {
//   return (
//     <div>
//        <Link to={linkto}>
//         <div className={`text-center text-[13px] px-6  py-3 rounded-md font-bold ${active ? " bg-yellow-500 text-black": "bg-black"} hover:scale-95 transition-all duration-200`}>
//            {children}
//         </div>
//        </Link>
//     </div>
//   )
// }


import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({ children, active, linkto }) {
  return (
    <div>
      <Link to={linkto}>
        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold 
        ${active ? "bg-yellow-500 text-black" : "bg-black text-white"}
        hover:scale-95 transition-all duration-200`}>
          {children}
        </div>
      </Link>
    </div>
  )
}


