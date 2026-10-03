"use client"

import React, { useState } from 'react';

const SignUp = () => {
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState("");
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { name, email, password } = userInfo; 

    const handleChange = ({target}) => {
        const { name, value } = target;
        setUserInfo({...userInfo, [name]: value});
    };

    const handleSubmit = async (e) => {
        setBusy(true);
        e.preventDefault();
        try {
            const res = await fetch("/api/auth/users", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(userInfo)
            })
            const data = await res.json();
            setMessage(res.ok ? "Account created. You can now log in." : data.error);
        } catch {
            setMessage("Registration is temporarily unavailable. Please try again.");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="flex items-center">
            <div className="py-2 rounded w-96">
            <h2 className="text-2xl font-semibold mb-6">Register</h2>
            {message ? <p className="mb-4">{message}</p> : null}
            <form>
                <div className="mb-4">
                <label className="block text-gray-600 font-semibold">Name</label>
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Your Name"
                    label="Name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-600 font-semibold">Email</label>
                <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Your Email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-600 font-semibold">Password</label>
                <input
                    type="password"
                    minLength={8}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Your Password"
                    label="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                </div>
                <div className="mt-6">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    disabled={busy}
                    style={{opacity: busy ? 0.5 : 1}}
                >
                    Register
                </button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default SignUp;
