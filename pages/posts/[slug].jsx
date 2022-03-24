import axios from "axios";
import Image from "next/image";
import React from "react";
import Layout from "../../components/Layout";
export const getStaticPaths = async (ctx) => {
  return {
    paths: [],
    fallback: true,
  };
};

async function getMyPost(slug) {
  try {
    const res = await axios("http://localhost:3000/api/posts/show", {
      withCredentials: true,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        postId: slug,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  let post = await getMyPost(slug);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export default function post({ post }) {
  console.log({ post });
  return (
    <Layout>
      {post && (
        <article className="max-w-[80%]">
          <h1 className="font-bold text-5xl mb-8">{post.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={post.author.image}
              width={"50rem"}
              height={"50rem"}
              layout="fixed"
              alt="avatar"
            />
            <div className="flex gap-2 items-center text-muted">
              <p>{post.author.name}</p>
              <p>-</p>
              <p>
                {new Date(post.createdAt).toLocaleDateString("en-gb", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "utc",
                })}
              </p>
            </div>
          </div>
          <div className="prose ">{post.content}</div>
        </article>
      )}
    </Layout>
  );
}
