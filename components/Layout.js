import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <div className="max-w-5xl mx-auto min-h-screen flex flex-col justify-between px-4">
      <header className="flex justify-between py-6 border-b-2 flex-wrap">
        <div>
          <Link href="/">
            <a>
              <h1 className="font-semibold text-4xl text-blue-500">NextAuth</h1>
            </a>
          </Link>
        </div>
        <nav className="flex gap-6 items-center">
          {session ? (
            <>
              <Link href="/">
                <a className="capitalize">Home</a>
              </Link>
              <Link href="/dashboard">
                <a className="capitalize">Dashboard</a>
              </Link>
              <Link href="/dashboard/profile">
                <a className="capitalize">Profile</a>
              </Link>
              <Link href="/dashboard/posts">
                <a className="capitalize">posts</a>
              </Link>
              <button
                onClick={() => signOut()}
                className="px-3 py-2 font-semibold bg-red-500 text-white "
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="px-3 py-2 font-semibold bg-black text-white "
              >
                Login
              </button>
            </>
          )}
        </nav>
      </header>
      <main className="py-6">{children}</main>
      <footer className="mt-auto py-6 border-t-2">@learn-nextauthjs</footer>
    </div>
  );
}
