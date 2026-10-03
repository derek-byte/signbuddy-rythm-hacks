"use client"

import React from 'react';
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const {data} = useSession();
    const router = useRouter();

    const handleLogout = () => {
        signOut();
        router.replace("/");
    };

    const handleCamera = () => {
        router.replace("/sign");
    };

    return (
        <div>
            <div className="flex items-center justify-center p-8 h-screen">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-gray-600">Name:</div>
                        <div className="text-gray-900">{data?.user?.name}</div>
                        <div className="text-gray-600">Email:</div>
                        <div className="text-gray-900">{data?.user?.email}</div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
                    >
                        Logout
                    </button>
                    <div className="flex items-center justify-center">
                    <div className="gap-4">
                        <button 
                            onClick={handleCamera}
                            className="bg-blue-500 text-white font-bold px-6 py-2 mt-3 mx-3"
                        >
                            Learn
                        </button>
                        <button 
                            onClick={handleCamera}
                            className="bg-blue-500 text-white font-bold px-6 py-2 mt-3 mx-3"
                        >
                            Translate
                        </button>
                        <button 
                            onClick={handleCamera}
                            className="bg-blue-500 text-white font-bold px-6 py-2 mt-3 mx-3"
                        >
                            Play
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
