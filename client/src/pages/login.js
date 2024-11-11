import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import BoltIcon from '@mui/icons-material/Bolt';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/auth/login', formData);
            // Save token and user details to localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user data

            // Redirect to chat or dashboard page
            navigate('/chat');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="regi">
            <div className="form">
                <div className="container-fluid">
                    <div className="col-md-12 d-flex flex-column align-items-center justify-content-center p-0">
                        <h2 className="headig">
                            <BoltIcon sx={{ color: 'purple', fontSize: 30 }} /> Superpage
                        </h2>
                        <h3 className="sign-up">SIGN IN</h3>
                        <p className="create">Welcome back! Please sign in to continue.</p>
                        <form className="w-75 mt-3" onSubmit={handleSubmit}>
                            <div className="mb-3 inputForm">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 inputForm">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="registerBtn" disabled={isLoading}>
                                {isLoading ? 'Signing in...' : 'Login'}
                            </button>
                            {error && <p className="text-danger mt-2">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
