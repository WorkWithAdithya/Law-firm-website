import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Password validation states
  const [isMinLength, setIsMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  // Handle password input changes and validation checks
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Update password requirement indicators
    setIsMinLength(value.length >= 6);
    setHasUpperCase(/[A-Z]/.test(value));
    setHasNumber(/\d/.test(value));
    setHasSpecialChar(/[@$!%*?&]/.test(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation: check if it ends with @gmail.com
    if (!email.endsWith('@gmail.com')) {
      setError('Please enter a Gmail address ending with @gmail.com');
      return;
    }

    // Final password validation to ensure all conditions are met
    if (!isMinLength || !hasUpperCase || !hasNumber || !hasSpecialChar) {
      setError(
        'Password must be at least 6 characters long, include one uppercase letter, one number, and one special character.'
      );
      return;
    }

    // Clear any previous error messages if validation passes
    setError('');

    // Simulate login process
    if (email && password) {
      onLogin(); // Trigger authentication
      navigate('/AboutContact');
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/loginpage.jpg')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <p className="text-1xl font-bold text-center">
          Please enter your login details!
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}

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
          onChange={handlePasswordChange}
        />

        {/* Password requirements checklist */}
        <div className="mt-2 space-y-1 text-sm">
          <p
            className={`flex items-center ${
              isMinLength ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            {isMinLength ? '✔️' : '❌'} At least 6 characters
          </p>
          <p
            className={`flex items-center ${
              hasUpperCase ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            {hasUpperCase ? '✔️' : '❌'} Contains an uppercase letter
          </p>
          <p
            className={`flex items-center ${
              hasNumber ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            {hasNumber ? '✔️' : '❌'} Contains a number
          </p>
          <p
            className={`flex items-center ${
              hasSpecialChar ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            {hasSpecialChar ? '✔️' : '❌'} Contains a special character (e.g.,
            @, $, !, %, *, ?, &)
          </p>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
