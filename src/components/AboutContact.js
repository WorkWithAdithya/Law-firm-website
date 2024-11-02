function AboutContact() {
  return (
    <div className="min-h-screen flex flex-col mt-20 justify-between p-6 overflow-hidden">
      <div className="flex-grow flex flex-col lg:flex-row items-center lg:items-start gap-20 overflow-hidden">
        {/* Left Side - Image */}
        <div className="flex-shrink-0 w-full lg:w-1/4 overflow-hidden transition-transform transform hover:scale-105 duration-300">
          <img
            src="/about.jpg"
            alt="About Us"
            className="w-full h-full rounded-lg shadow-lg object-cover transition-opacity duration-300 opacity-90 hover:opacity-100"
          />
        </div>

        {/* Right Side - Company Information */}
        <div className="w-full lg:w-3/5 space-y-4 overflow-hidden">
          <h1 className="text-3xl font-bold  mb-3 transition-all duration-300 hover:text-blue-500 cursor-pointer">
            About Us
          </h1>
          <p className="text-gray-700 text-lg ">
            Welcome to Bhoomiputra! We are a team of professional lawyers
            dedicated to providing top-notch legal services for all your needs.
          </p>

          <p className="text-red-700 text-lg ">
            Locations available: Shivamogga, Chikmangaluru, Hospete, Bellary
            only
          </p>
          <h2 className="text-3xl font-bold mb-2 transition-all duration-300 hover:text-blue-500 cursor-pointer">
            Contact Us
          </h2>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex items-center flex-1 ">
              <h6 className="text-xl font-bold mb-0 mr-2">Email:</h6>
              <p className="text-gray-700">Bhoomiputra@gmail.com</p>
            </div>
            <div className="flex items-center flex-1 ">
              <h6 className="text-xl font-bold mb-0 mr-2">Phone:</h6>
              <p className="text-gray-700">(+91) 123-456-7890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AboutContact;
