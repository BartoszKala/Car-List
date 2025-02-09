import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

// Zdefiniowanie typu kontekstu
interface AppContextType {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://localhost:7072/api/account/login', {
        email,
        password,
      });
  
      const { token, displayName } = response.data;
      // Zapisz token i displayName w localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('displayName', displayName); // Zapisz jako 'displayName'

  
      // Przekierowanie na stronę /cars
      navigate('/cars');
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
