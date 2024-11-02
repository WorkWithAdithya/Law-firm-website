import { Link } from 'react-router-dom';
import { useState } from 'react';
import services from '../data/services.json';

function Services() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-4 sm:space-y-0 items-center justify-center">
        <h1 className="text-4xl font-bold transition-all duration-300 hover:text-blue-500 cursor-pointer text-center">
          Our Services
        </h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
            onClick={() => {}}
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="border p-6 rounded-lg hover:shadow-lg transition bg-white duration-300 transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
            <p className="text-gray-700 mb-3">{service.description}</p>
            <p className="text-green-600 font-bold mb-3">
              Price: ₹{service.price}
            </p>
            <Link
              to={`/payment/${service.id}`}
              state={{ service }}
              className="inline-block mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
            >
              Select & Pay
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
