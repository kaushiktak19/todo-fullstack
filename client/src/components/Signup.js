import React, { useState } from 'react';

const Signup = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            setToken(data.token, data.username); 
        } else {
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div>
            <h2 className="text-2xl mb-4">Sign Up</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />
            <button
                onClick={handleSignup}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
                Sign up
            </button>
        </div>
    );
};

export default Signup;
