import prisma from "../../../helpers/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  const session = await getSession({ req });
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
    select: {
      id: true,
    },
  });
  const { body } = req;

  switch (req.method) {
    case "GET":
      const posts = await prisma.post.findMany({
        where: { authorId: user.id },
        // where: { author: { id: user.id } },
        select: {
          id: true,
          title: true,
          content: true,
        },
      });
      res.status(200).json(posts);
      break;
    case "POST":
      const newPost = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          authorId: user.id,
        },
      });
      res.status(201).json(newPost);
      break;
    case "PUT":
      try {
        const updatedPost = await prisma.post.updateMany({
          where: {
            id: body.postId,
            authorId: user.id,
          },
          data: {
            title: body.title,
            content: body.content,
          },
        });
        res.status(200).json(updatedPost);
      } catch (error) {
        console.log(error);
      }
      break;
    case "DELETE":
      try {
        const deletedPost = await prisma.post.deleteMany({
          where: {
            id: body.postId,
            authorId: user.id,
          },
        });
        res.status(204).json("");
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.status(500).json({ error: "Server Error!" });
      break;
  }
}
