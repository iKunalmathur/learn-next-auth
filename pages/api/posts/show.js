import prisma from "../../../helpers/prisma";

export default async function handle(req, res) {
  const { query } = req;
  switch (req.method) {
    case "GET":
      const post = await prisma.post.findUnique({
        where: {
          id: query.postId,
        },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
      res.status(200).json(post);
      break;
    default:
      res.status(500).json({ error: "Server Error!" });
      break;
  }
}
