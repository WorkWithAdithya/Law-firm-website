import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';

function PaymentPage({ addServiceToHistory }) {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  // State variables for form inputs
  const [Ename, setEname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // State to store the QR code URL
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // UPI details
  const upiId = 'adithyabs388@okicici'; // Replace with your actual UPI ID
  const payeeName = 'Adithya BS'; // Replace with actual payee name

  useEffect(() => {
    if (service) {
      generateQRCode(service.price);
    }
  }, [service]);

  // Function to generate UPI QR code
  const generateQRCode = async (amount) => {
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      payeeName
    )}&am=${amount}&cu=INR`;

    try {
      // Generate QR code data URL
      const qrCodeDataUrl = await QRCode.toDataURL(upiUrl);
      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Cannot generate QR Code', error);
    }
  };

  // Check if all form fields are filled and phone number is valid
  const isFormValid = Ename && email && phoneNumber && city && !phoneError;

  const validatePhoneNumber = (value) => {
    const regex = /^[0-9]{10}$/; // Regex to validate 10 digits
    if (!regex.test(value)) {
      setPhoneError('Phone number must be exactly 10 digits.');
    } else {
      setPhoneError('');
    }
  };

  const handleConfirmPayment = () => {
    if (isFormValid) {
      addServiceToHistory({
        name: service.name,
        description: service.description,
        price: service.price,
        bookingTime: new Date().toLocaleString(),
        Ename,
        email,
        phoneNumber,
        city,
      });

      navigate('/Output', {
        state: {
          service,
          bookingTime: new Date().toLocaleString(),
          email,
          phoneNumber,
          city,
        },
      });
    }
  };

  if (!service) {
    return (
      <p className="p-6 text-red-500">
        No service selected. Please go back to select a service.
      </p>
    );
  }

  return (
    <div className="relative">
      {/* Fixed Back Button */}
      <button
        onClick={() => navigate('/Services')}
        className="fixed top-4 left-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-transform duration-300 transform hover:scale-105"
      >
        Back
      </button>

      {/* Centered Heading */}
      <h1 className="text-4xl font-bold text-center mt-12 mb-8">
        Service Payment
      </h1>

      <div className="p-6 pt-4 flex flex-col lg:flex-row lg:justify-between space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="w-full lg:w-1/3">
          <div className="border p-4 rounded-lg mb-6 transition-shadow duration-300 hover:shadow-lg">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p className="text-gray-700">{service.description}</p>
            <p className="text-green-600 font-bold">Price: ₹{service.price}</p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block font-semibold">Name:</label>
              <input
                type="text"
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
                placeholder="Enter your name"
                value={Ename}
                onChange={(e) => setEname(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold">Email:</label>
              <input
                type="email"
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <label className="block font-semibold mr-2">Phone Number:</label>
              <span className="text-gray-700 font-semibold">+91</span>
              <input
                type="tel"
                className={`border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition ml-2 ${
                  phoneError ? 'border-red-500' : ''
                }`}
                required
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  setPhoneNumber(value);
                  validatePhoneNumber(value);
                }}
              />
              {phoneError && <p className="text-red-500">{phoneError}</p>}
            </div>

            <div>
              <label className="block font-semibold">City:</label>
              <select
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="" disabled>
                  Select your city
                </option>
                <option value="Banglore">Banglore</option>
                <option value="ChikMagaluru">ChikMagaluru</option>
                <option value="Bellary">Bellary</option>
                <option value="Mysore">Mysore</option>
                <option value="Shivamogga">Shivamogga</option>
              </select>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-2/3 flex flex-col items-center space-y-4">
          <p className="font-bold text-red-600">Scan the UPI Code to pay:</p>
          {qrCodeUrl && (
            <img
              src={qrCodeUrl}
              alt="UPI QR Code"
              className="w-72 h-72 sm:w-96 sm:h-96 lg:w-80 lg:h-80 transition-transform duration-300 hover:scale-105"
            />
          )}
          <p className="text-black-600 mb-4 font-bold">
            Total Amount: ₹{service.price}
          </p>

          <button
            onClick={handleConfirmPayment}
            disabled={!isFormValid}
            className={`px-4 py-2 rounded transition-transform duration-300 transform hover:scale-105 ${
              isFormValid
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
