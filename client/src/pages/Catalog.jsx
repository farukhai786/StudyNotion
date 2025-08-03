import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../servises/apiconnector";
import { categories } from "../servises/apis";
import { getCategoryPageDetails } from "../servises/operation/pageAndComponentDetails";
import Course_Card from "../components/cors/Catalog/Course_Card";
import CourseSlider from "../components/cors/Catalog/CourseSlider";
import  Footer  from "../components/commen/Footer"
const slugify = (str = "") => str.trim().toLowerCase().replace(/\s+/g, "_");

export default function Catalog() {
  const { catalogName } = useParams();
  const [categoryId, setCategoryId] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("popular");


  useEffect(() => {
    let isCancelled = false;

    const fetchCategoryId = async () => {
      try {
        const { data } = await apiConnector("GET", categories.CATEGORIES_API);
        const all = data?.allCatagory || [];
        const match = all.find((cat) => slugify(cat.name) === catalogName);

        if (!match?._id) {
          setError("Category not found");
          setLoading(false);
          return;
        }

        if (!isCancelled) setCategoryId(match._id);
      } catch (err) {
        console.error(err);
        if (!isCancelled) setError("Failed to fetch categories");
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchCategoryId();
    return () => (isCancelled = true);
  }, [catalogName]);

 
  useEffect(() => {
    if (!categoryId) return;
    let isCancelled = false;

    const fetchPageData = async () => {
      const res = await getCategoryPageDetails(categoryId);

      if (!isCancelled) {
        if (res.success) {
          setPageData(res.data);
        } else {
          setError(res.message || "Failed to load category details");
        }
        setLoading(false);
      }
    };

    fetchPageData();
    return () => (isCancelled = true);
  }, [categoryId]);

  if (loading) return <div className="p-10 text-white">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  const selectedCourses = pageData?.selectedCategory?.courses || [];
  const topCourses = pageData?.differentCategory?.courses || [];
  const bestSellers = pageData?.mostSellingCourses || [];
  const category = pageData?.selectedCategory;

  return (
  <>
    <div className="max-w-10/12 mx-auto py-10 px-4 sm:px-6 text-white">

  <p className="mb-6 text-lg sm:text-xl md:text-2xl font-semibold">
    Home / Catalog / <span className="text-amber-100">{category?.name}</span>
  </p>

  <p className="mb-2 text-base sm:text-lg font-medium">{category?.name}</p>
  <p className="mb-8 text-sm sm:text-base text-gray-400">{category?.description}</p>


  <section className="mb-10">
    <p className="mb-2 text-base sm:text-lg font-semibold">Courses to get you started</p>
    
    <div className="mb-4 flex gap-3 flex-wrap">
      <button
        className={`font-medium text-sm sm:text-base ${activeTab === "popular" ? "text-yellow-300 underline" : ""}`}
        onClick={() => setActiveTab("popular")}
      >
        Most Popular
      </button>
      <button
        className={`font-medium text-sm sm:text-base ${activeTab === "new" ? "text-yellow-300 underline" : ""}`}
        onClick={() => setActiveTab("new")}
      >
        New
      </button>
    </div>

    <CourseSlider
      course={
        activeTab === "popular"
          ? selectedCourses
          : selectedCourses.slice().reverse()
      }
    />
  </section>

  
  <section className="mb-10">
    <h2 className="mb-4 text-lg sm:text-xl font-semibold">Top Courses</h2>
    <CourseSlider course={topCourses} />
  </section>

  <section>
    <p className="mb-4 text-base sm:text-lg font-medium">Frequently Bought Together</p>
    <div className="grid grid-cols-1 gap-6 pt-6 sm:pt-9 sm:grid-cols-2">
      {bestSellers.length > 0 ? (
        bestSellers.slice(0, 4).map((course) => (
          <Course_Card key={course._id} course={course} />
        ))
      ) : (
        <p className="text-gray-400">No frequently bought courses.</p>
      )}
    </div>
  </section>
</div>

<Footer />

  </>
  );
}
