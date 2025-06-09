import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './client.js';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const { email, password } = formData;
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            navigate('/home');
        } catch (err) {
            setError('Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-orange-600/25 shadow-2xl w-full rounded-xl max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">Continue your Writing!</h2>
                {error && <div className="mb-4 text-red-600">{error}</div>}
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 border-orange-600 border-1 rounded mb-2"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 border-orange-600 border-1 rounded"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-600 text-white py-3 rounded font-bold"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
                <div className="mt-4 flex justify-between text-sm">
                    <Link to="/forgot-password" className="text-orange-600 hover:underline">
                        Forgot password?
                    </Link>
                    <Link to="/signup" className="text-orange-600 hover:underline">
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
        
    );
};

export default Login;
