const Category  = require("../Models/Category");
const mongoose = require("mongoose");
const ExpressError = require("../Utils/ExpressError");



exports.createCatagory  = async (req, res) =>{
   
        const {name, description} = req.body;

        if (!name || !description) {
             throw new ExpressError(400, "All fields are required");
        }
        const CatagoryDetails = Category.create({
            name:name,
            description:description
        })
      
        return res.status(200).json({
            success:true, message: "Catagory created successfully"
        })
      }


exports.showAllCategories = async(req,res)=>{
      
        const allCatagory  = await Category.find({}, {name:true, description: true})
       return res.status(200).json({
             success:true,
             message:"All tags returned successfully",
            allCatagory ,
        })
    
  
}



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.categoryPageDetails = async (req, res) => {
  const { categoryId } = req.body;


  const selectedCategory = await Category.findById(categoryId)
    .populate({
      path: "courses",
      match: { status: "Published" },
      populate: "ratingAndReviews",
    });

  if (!selectedCategory) {
  throw new ExpressError(404, "Category not found");
}

  // if (selectedCategory.courses.length === 0) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "No courses found for the selected category.",
  //   });
  // }

  // 2️⃣ Get a different random category (excluding selected)
  const categoriesExceptSelected = await Category.find({
    _id: { $ne: categoryId },
  });

  let differentCategory = null;

  for (const cat of categoriesExceptSelected) {
    const populatedCategory = await Category.findById(cat._id)
      .populate({
        path: "courses",
        match: { status: "Published" },
      });

    if (populatedCategory?.courses?.length > 0) {
      differentCategory = populatedCategory;
      break;
    }
  }


  const allCategories = await Category.find()
    .populate({
      path: "courses",
      match: { status: "Published" },
      populate: {
        path: "instructor",
      },
    });

  const allCourses = allCategories.flatMap((cat) => cat.courses);

  const mostSellingCourses = allCourses
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 10);

 
  return res.status(200).json({
    success: true,
    data: {
      selectedCategory,
      differentCategory,
      mostSellingCourses,
    },
  });
};
