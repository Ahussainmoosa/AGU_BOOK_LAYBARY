import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import "./SignUpForm.css";
const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contactNumber: '',
    password: '',
    passwordConf: '',
    role: 'user',
  });

  const handleChange = (e) => {
    setMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password, // Send the plain password
      contactNumber: formData.contactNumber,
      role: formData.role,
    };

    const user = await signUp(payload);
    setUser(user);
    navigate('/');
  } catch (err) {
    setMessage(err.message);
  }
};

  const isFormInvalid = () =>
    !(
      formData.username &&
      formData.email &&
      formData.contactNumber &&
      formData.password &&
      formData.password === formData.passwordConf
    );

  return (
    <main>
      <h1>Create an Account</h1>
      <p>{message}</p>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="contactNumber"
          placeholder="Phone Number"
          value={formData.contactNumber}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="passwordConf"
          placeholder="Confirm Password"
          value={formData.passwordConf}
          onChange={handleChange}
        />

        <button disabled={isFormInvalid()}>Sign Up</button>
        <button type="button" onClick={() => navigate('/')}>
          Cancel
        </button>
      </form>
    </main>
  );
};

export default SignUpForm;
