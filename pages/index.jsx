import axios from "axios";
import Link from "next/link";
import useSWR from "swr";
import Layout from "../components/Layout";
import PostGrid from "../components/PostGrid";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function Home() {
  const { data: posts, isValidating } = useSWR("/api/posts/all", fetcher);
  return (
    <Layout>
      <PostGrid>
        {!isValidating ? (
          posts?.length ? (
            posts.map((post, index) => (
              <div key={index} className="border p-4 col-span-4">
                <Link href={`/posts/${post.id}`}>
                  <a>
                    <h2 className="mb-1 text-lg font-semibold capitalize">
                      {post.title}
                    </h2>
                  </a>
                </Link>

                <p className="line-clamp-3 text-muted mb-1 text-sm">
                  {post.content}
                </p>
                <div className="flex gap-2 justify-end mt-4"></div>
              </div>
            ))
          ) : (
            <div className="border p-4 col-span-4">
              <h2 className="mb-1 text-2xl font-semibold capitalize text-muted">
                No Post Yet
              </h2>
            </div>
          )
        ) : (
          <div className="border p-4 col-span-4">
            <h2 className="mb-1 text-2xl font-semibold capitalize text-muted">
              Loading...
            </h2>
          </div>
        )}
      </PostGrid>
    </Layout>
  );
}
