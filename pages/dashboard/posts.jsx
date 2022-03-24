/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { isObjEmpty } from "../../helpers";

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};

export default function posts({ session }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function getMyPosts() {
    try {
      const res = await axios("http://localhost:3000/api/posts", {
        withCredentials: true,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function createMyPosts(data) {
    try {
      const res = await axios("http://localhost:3000/api/posts", {
        withCredentials: true,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateMyPosts(data) {
    try {
      const res = await axios("http://localhost:3000/api/posts", {
        withCredentials: true,
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMyPosts(data) {
    try {
      const res = await axios("http://localhost:3000/api/posts", {
        withCredentials: true,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data,
      });

      getMyPosts(); //! Need to change
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let formData = {
      title: title,
      content: content,
    };

    if (isObjEmpty(formData)) return;

    if (isUpdating) {
      formData["postId"] = postId;
      // update post
      await updateMyPosts(formData);
    } else {
      // create post
      await createMyPosts(formData);
    }

    // Refetch my posts
    getMyPosts(); //! Need to change
    // Resetting
    resetFrom();
  }

  const resetFrom = () => {
    setTitle("");
    setContent("");
    setPostId("");
    setIsUpdating(false);
  };

  const enableEditing = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setPostId(post.id);
    setIsUpdating(true);
    console.log({ isUpdating });
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <Layout>
      <section>
        <div className="mb-4">
          <h2 className="text-2xl mb-4 font-semibold">
            {!isUpdating ? "Create New Post" : "Edit Post"}
          </h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              placeholder="title"
              value={title}
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              name="content"
              placeholder="content"
              rows={5}
              value={content}
            ></textarea>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-black text-white py-2 px-3 font-semibold"
              >
                Submit
              </button>
              <button
                onClick={() => resetFrom()}
                type="reset"
                className="border-black border-2 py-2 px-3 font-semibold"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </section>
      <section>
        <h2
          className="text-2xl mb-4 font-semibold
        "
        >
          You Have total {posts?.length ?? 0} posts
        </h2>
        <div className="grid grid-cols-12 gap-4">
          {posts?.length ? (
            posts.map((post, index) => (
              <div key={index} className="border p-4 col-span-4">
                <h2 className="mb-1 text-lg font-semibold capitalize">
                  {post.title}
                </h2>
                <p className="line-clamp-3 text-muted mb-1 text-sm">
                  {post.content}
                </p>
                <div className="flex gap-2 justify-end mt-4">
                  <button
                    onClick={() => enableEditing(post)}
                    className="bg-black py-1 px-2 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMyPosts({ postId: post.id })}
                    className="bg-red-500 py-1 px-2 text-white"
                  >
                    delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="border p-4 col-span-4">
              <h2 className="mb-1 text-2xl font-semibold capitalize text-muted">
                No Post Yet
              </h2>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
