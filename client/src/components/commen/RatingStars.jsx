import React, { useEffect, useState } from "react";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";



 
const RatingStars = ({ rating = 0, size = 20, className = "" }) => {
  const [starCount, setStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  });


  useEffect(() => {
    const clamped = Math.max(0, Math.min(rating, 5)); 
    const wholeStars = Math.floor(clamped);

    setStarCount({
      full: wholeStars,
      half: Number.isInteger(clamped) ? 0 : 1,
      empty: Number.isInteger(clamped)
        ? 5 - wholeStars
        : 4 - wholeStars,
    });
  }, [rating]);

  return (
    <div className={`flex gap-1 text-yellow-400 ${className}`}>
     
      {[...Array(starCount.full)].map((_, i) => (
        <TiStarFullOutline key={`full-${i}`} size={size} />
      ))}

    
      {[...Array(starCount.half)].map((_, i) => (
        <TiStarHalfOutline key={`half-${i}`} size={size} />
      ))}

      {[...Array(starCount.empty)].map((_, i) => (
        <TiStarOutline key={`empty-${i}`} size={size} />
      ))}
    </div>
  );
};

export default RatingStars;
