import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './client.js';

const SignUp = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        if (!form.username || !form.email || !form.password) {
            setError('All fields are required.');
            return;
        }
        if (!agree) {
            setError('You must agree to the Terms.');
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.signUp({
                email: form.email,
                password: form.password,
                options: { data: { username: form.username } }
            });
            if (error) throw error;
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Sign up failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-orange-600/25 shadow-2xl w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">Sign Up</h2>
                {error && <div className="mb-4 text-red-600 bg-red-600/10 rounded px-4 py-2 border-1 border-red-600">{error}</div>}
                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full p-3 border-orange-600 border-1 rounded mb-2"
                    disabled={loading}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 border-orange-600 border-1 rounded mb-2"
                    disabled={loading}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-3 border-orange-600 border-1 rounded mb-2"
                    disabled={loading}
                />
                <div className="flex items-center mb-4">
                    <input
                        id="terms"
                        type="checkbox"
                        checked={agree}
                        onChange={() => setAgree(a => !a)}
                        className="mr-2"
                        disabled={loading}
                    />
                    <label htmlFor="terms" className="text-sm">
                        I agree to the{' '}
                        <Link to="/terms" className="text-orange-600 underline">Terms</Link>
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-600 text-white py-2 rounded hover:bg-ornage-700"
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-orange-600 underline">Log in</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
