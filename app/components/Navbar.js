"use client"

import React from 'react';
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const {status} = useSession();
    const isAuth = status === "authenticated";
    const router = useRouter();

  return (
    <nav className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-mono font-bold cursor-pointer" onClick={() => router.replace("/profile")}>SignBuddy</h1>
        {isAuth ? (
          <button
            className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </button>
        ) : (
            <button
                className="text-white bg-slate-500 px-4 py-2 rounded hover:bg-slate-600"
                onClick={() => router.replace("/")}
            >
                Login
            </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
