import { studentEndPiont } from "../apis";
import {apiConnector} from "../apiconnector";
import { toast } from "react-hot-toast";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndPiont;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function buyCourse(token, courses, user, navigate, dispatch) {
  const toastId = toast.loading("Loading...");

  try {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      toast.error("Razorpay SDK failed to load");
      toast.dismiss(toastId);
      return;
    }

    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
      console.log("user",user)
    const order = orderResponse.data.data;
    console.log("printing orderresponce", order);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      currency: order.currency,
      amount: order.amount,
      name: "StudyNotion",
      order_id: order.id,
      description: "Course Purchase",
      image: user?.image,
      prefill: {
        name: `${user?.FirstName || "Test"} ${user?.LastName || "User"}`, 
        email: user?.email,
      },
    
handler: async (response) => {
  const verificationOk = await verifyPayment({ ...response, courses }, token, navigate, dispatch);
  if (verificationOk) {
     await sendPaymentSuccessEmail(response, order.amount, token);
  }
}    };

    
    const razorpay = new window.Razorpay(options);
    razorpay.open();
    console.log("🧾 Razorpay Options:", options);

    razorpay.on("payment.failed", function (response) {
      toast.error("Payment failed");
      console.error(response.error);
    });
  } catch (error) {
    console.error("Payment error:", error);
    toast.error("Could not complete payment");
  } finally {
    toast.dismiss(toastId);
  }
}

// ✅ Email Sender
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.error("Failed to send payment success email:", error);
  }
}


export async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,

   
    });



    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment Successful, you are added to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR....", error);
    toast.error("Could not verify Payment");
  } finally {
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
}
