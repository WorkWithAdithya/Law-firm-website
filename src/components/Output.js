import { useLocation, useNavigate } from 'react-router-dom';

function Output() {
  const location = useLocation();
  const navigate = useNavigate();
  const { service, bookingTime } = location.state || {};

  if (!service) {
    return <p className="p-6 text-red-500">No booking details found.</p>;
  }

  return (
    <div className="p-6 flex flex-col mt-20 items-center">
      <h1 className="text-4xl font-bold mb-4 transition-all duration-300 hover:text-blue-500 cursor-pointer">
        Payment Confirmed
      </h1>
      <div className="border p-4 rounded-lg text-center transition-shadow duration-300 hover:shadow-lg">
        <h2 className="text-xl font-semibold">{service.name}</h2>
        <p className="text-gray-700">{service.description}</p>
        <p className="text-green-600 font-bold">
          Amount Paid: ₹{service.price}
        </p>
        <p className="text-gray-600">Booking Time: {bookingTime}</p>
      </div>

      {/* Buttons to navigate to Services or History page */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => navigate('/Services')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
        >
          Back to Services
        </button>
        <button
          onClick={() => navigate('/History')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-transform duration-300 transform hover:scale-105"
        >
          View History
        </button>
      </div>
    </div>
  );
}

export default Output;
