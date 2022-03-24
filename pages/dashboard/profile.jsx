/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import Image from "next/image";

export default function profile() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="flex gap-4 ">
        <div className="w-20 aspect-1 ">
          <Image
            src={
              session?.user.image ??
              "https://ui-avatars.com/api/?name=John+Doe&format=png"
            }
            width={"100px"}
            height={"100px"}
            layout="responsive"
            alt="avatar"
          />
        </div>
        <div>
          <h2 className="capitalize text-3xl ">
            {session?.user.name} ( {session?.role.toUpperCase()} )
          </h2>
          <p className="text-muted mt-1">{session?.user.email}</p>
        </div>
      </div>
      {/* <pre>{JSON.stringify(session)}</pre> */}
      {/* Signed in as {session?.user.email} <br /> */}
    </Layout>
  );
}
