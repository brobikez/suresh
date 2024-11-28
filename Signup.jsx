import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupimage from './signupimage.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons

export default function SignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // For showing/hiding password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For showing/hiding confirm password
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Allow only alphabetic characters and spaces in the "Name" field
  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/;  // Regex for alphabets and spaces only
    if (regex.test(value)) {
      handleChange(e);
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters

    // Ensure the first digit is 6 or higher
    if (value.length === 1 && (value < 6 || value > 9)) {
      return; // Don't allow values less than 6 or greater than 9 as the first digit
    }

    // Limit the phone number to 10 digits
    if (value.length <= 10) {
      setForm({
        ...form,
        phone: value,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation: Only allow gmail.com and yahoo.com
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email (only gmail.com or yahoo.com allowed)';
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordRegex.test(form.password)) {
      newErrors.password = 'Password must be at least 6 characters long, contain at least one uppercase letter and one special character';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Phone number validation: First digit must be 6 or higher, total 10 digits
    const phoneRegex = /^[6-9]\d{9}$/;  // Ensures the first digit is 6-9 and the phone number is exactly 10 digits
    if (!phoneRegex.test(form.phone)) {
      newErrors.phone = 'Phone number must start with 6, 7, 8, or 9 and be 10 digits long';
    }

    if (!form.userType) newErrors.userType = 'Please select who you are';
    if (!form.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate a successful sign-up process here
      navigate('/login');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        
        {/* Left Side - Image */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-r from-purple-500 to-pink-500">
          <img
            src={signupimage}
            alt="Signup Illustration"
            className="w-full h-full object-cover opacity-75"
          />
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">SIGN UP</h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleNameChange} // Use the new handler to restrict input
              className="w-full px-4 py-3 rounded-full bg-purple-200 placeholder-black focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-purple-200 placeholder-black focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-full bg-purple-200 placeholder-black focus:outline-none"
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-full bg-purple-200 placeholder-black focus:outline-none"
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handlePhoneChange}  // Updated to handle phone number input
              className="w-full px-4 py-3 rounded-full bg-purple-200 placeholder-black focus:outline-none"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            <select
              name="userType"
              value={form.userType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-purple-200 text-black focus:outline-none"
            >
              <option value="">Who you are</option>
              <option value="Customer">Customer</option>
              <option value="Host">Host</option>
              <option value="Driver">Driver</option>
            </select>
            {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={form.termsAccepted}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I accept the terms and conditions
              </label>
            </div>
            {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-full hover:bg-blue-600 disabled:bg-gray-400"
              disabled={!form.userType || !form.termsAccepted}
            >
              Sign Up Here
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 font-semibold">
                Login here
              </Link>
            </p>

            <p className="text-center text-blue-500 font-semibold mt-2">
              Need Help?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
