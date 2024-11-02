function ServiceCard({ service, onClick }) {
  return (
    <div
      className="p-4 border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold">{service.name}</h2>
      <p className="text-gray-700">Price: ₹{service.price}</p>
    </div>
  );
}

export default ServiceCard;
