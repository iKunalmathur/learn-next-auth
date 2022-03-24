import prisma from "../../../helpers/prisma";

export default async function handle(req, res) {
  const deletePosts = await prisma.post.deleteMany({});

  const result = await prisma.post.createMany({
    data: [
      {
        title: "first post",
        content: "lorem ipsum here",
        authorId: "623584d30aa1e7f0d0a5b061",
      },
      {
        title: "second post",
        content: "lorem ipsum here",
        authorId: "623584d30aa1e7f0d0a5b061",
      },
      {
        title: "third post",
        content: "lorem ipsum here",
        authorId: "6236b1e94658cd352696d916",
      },
    ],
    // skipDuplicates: true,
  });

  res.json(result);
}
