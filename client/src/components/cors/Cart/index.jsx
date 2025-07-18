import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourse";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
  const { totalItems } = useSelector((state) => state.cart);

  return (
    <div className="min-h-[calc(100vh-200px)] text-[#F1F2FF] px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
      <p className="text-sm text-[#838894] mb-6">
        {totalItems} {totalItems === 1 ? "course" : "courses"} in cart
      </p>

      {totalItems > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Cart Items */}
          <div className="flex-1">
            <RenderCartCourses  />
          </div>

          {/* Right: Total Price */}
          <RenderTotalAmount/>
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg text-[#F1F2FF]">No courses in cart.</p>
        </div>
      )}
    </div>
  );
}
