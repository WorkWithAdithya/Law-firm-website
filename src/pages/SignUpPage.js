import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUpPage({ onSignUp }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSpecialChar, setIsSpecialChar] = useState(false);
  const [isLongEnough, setIsLongEnough] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return email.endsWith('@gmail.com');
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    setIsUpperCase(/[A-Z]/.test(password));
    setIsNumber(/\d/.test(password));
    setIsSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(password));
    setIsLongEnough(password.length > 6);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields!');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email must end with @gmail.com');
      return;
    }

    if (!isUpperCase || !isNumber || !isSpecialChar || !isLongEnough) {
      setError('Password must meet all the criteria.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    onSignUp(); // Trigger authentication
    navigate('/login');
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/signup.jpg')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <p className="text-1xl font-bold text-center">
          Welcome! Please enter your information
        </p>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-lg"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />

        {/* Password requirements display */}
        <div className="text-sm text-gray-600 mt-2 space-y-1">
          <div
            className={`flex items-center ${
              isUpperCase ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            {isUpperCase ? '✔️' : '❌'} At least one uppercase letter
          </div>
          <div
            className={`flex items-center ${
              isNumber ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            {isNumber ? '✔️' : '❌'} At least one number
          </div>
          <div
            className={`flex items-center ${
              isSpecialChar ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            {isSpecialChar ? '✔️' : '❌'} At least one special character
          </div>
          <div
            className={`flex items-center ${
              isLongEnough ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            {isLongEnough ? '✔️' : '❌'} More than 6 characters
          </div>
        </div>

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded-lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-600 mt-4">
          Have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpPage;
