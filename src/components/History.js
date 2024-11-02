import React from 'react';
import { useNavigate } from 'react-router-dom';
const History = ({ history }) => {
  const navigate = useNavigate();

  const handleBackToServices = () => {
    navigate('/Services');
  };

  return (
    <div className="p-6 mt-10">
      <h1 className="text-4xl font-bold mb-4 mt-10 text-center transition-all duration-300 hover:text-blue-500 cursor-pointer">
        Service History
      </h1>

      {history.length === 0 ? (
        <p className="text-gray-500">No service history available.</p>
      ) : (
        <div className="space-y-4">
          {history.map((service, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg transition-shadow duration-300 hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold transition-colors duration-300 hover:text-blue-500">
                {service.name}
              </h2>
              <p className="text-gray-700">{service.description}</p>
              <p className="text-green-600 font-bold">
                Amount Paid: ₹{service.price}
              </p>
              <p className="text-gray-600">
                Booking Time: {service.bookingTime}
              </p>
              <p className="text-gray-600">Name: {service.Ename}</p>
              <p className="text-gray-600">Email: {service.email}</p>
              <p className="text-gray-600">
                Phone Number: {service.phoneNumber}
              </p>
              <p className="text-gray-600">City: {service.city}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleBackToServices}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 transform hover:scale-105"
      >
        Back to Services
      </button>
    </div>
  );
};
export default History;
