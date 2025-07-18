import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';





import { resetPasswordToken } from '../servises/operation/AuthApi';



const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

       const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(resetPasswordToken(email, setEmailSent));
    
    };
 

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-center">
                        {!emailSent ? "Reset your password" : "Check your email"}
                    </h1>

                    <p className="text-gray-600 text-center">
                        {!emailSent
                            ? "We'll email you instructions to reset your password."
                            : `Reset instructions sent to: ${email}`}
                    </p>

                    {!emailSent ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address*
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Send Reset Email
                            </button>
                        </form>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Resend email
                        </button>
                    )}

                    <div className="text-center">
                        <Link to="/login">
                            <p className="text-sm text-indigo-600 hover:text-indigo-500">← Back to login</p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
