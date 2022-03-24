import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="">
        <h1 className="text-3xl">
          Hey 👋 {session?.user.name}, Welcome to dashboard
        </h1>
        <div className="flex flex-col gap-2 mt-4">
          <Link href="/api/posts/seed">
            <a className="bg-gray-200 w-max px-2 rounded-md">/api/posts/seed</a>
          </Link>
          <Link href="/api/posts">
            <a className="bg-gray-200 w-max px-2 rounded-md">/api/posts</a>
          </Link>
          <Link href="/api/token">
            <a className="bg-gray-200 w-max px-2 rounded-md">/api/token</a>
          </Link>
          <Link href="/api/auth/providers">
            <a className="bg-gray-200 w-max px-2 rounded-md">
              /api/auth/providers
            </a>
          </Link>
          <Link href="/api/auth/session">
            <a className="bg-gray-200 w-max px-2 rounded-md">
              /api/auth/session
            </a>
          </Link>
          <Link href="/api/auth/csrf">
            <a className="bg-gray-200 w-max px-2 rounded-md">/api/auth/csrf</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
