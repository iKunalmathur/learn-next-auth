import prisma from "../../../helpers/prisma";

export default async function handle(req, res) {
  switch (req.method) {
    case "GET":
      const posts = await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          content: true,
        },
      });
      res.status(200).json(posts);
      break;
    default:
      res.status(500).json({ error: "Server Error!" });
      break;
  }
}
