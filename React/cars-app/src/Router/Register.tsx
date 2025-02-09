import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Message, Icon } from 'semantic-ui-react';

export default function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // State for toggling password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://localhost:7072/api/account/register', {
        email,
        password,
        displayName,
        userName,
      });

      const { token} = response.data;
      // Zapisz token i displayName w localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('displayName', displayName); // Zapisz jako 'displayName'

      // Redirect to cars page after successful registration
      navigate('/cars');
    } catch (err: any) {
      setError(err.response?.data || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form">
     
      <Form onSubmit={handleSubmit} loading={loading} error={!!error}>
      <h2>Register</h2>
        <Form.Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

<Icon
      name={showPassword ? 'eye slash' : 'eye'} // Change icon based on visibility state
      onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
      style={{ cursor: 'pointer', color: 'white' }} // Ensure the icon is clickable and white
    />
        
        {/* Hasło z ikoną */}
        <Form.Input
  label="Password"
  type={showPassword ? 'text' : 'password'} // Toggle between password and text
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter a secure password"
  required
/>
        <Form.Input
          label="Display Name"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter your display name"
          required
        />
        
        <Form.Input
          label="Username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Choose a username"
          required
        />
        
        {error && <Message error header="Registration Failed" content={error} />}
        
        <Button type="submit" primary>
          Register
        </Button>
      </Form>

    </div>
  );
}
