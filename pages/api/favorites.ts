import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prismadb from "@/lib/prismadb"; // Đảm bảo bạn đã cấu hình Prisma client đúng cách

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });

    if (!session?.user?.email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prismadb.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        favoriteIds: true,
      },
    });

    if (!user || user.favoriteIds.length === 0) {
      return res.status(404).json({ message: "No favorite movies found" });
    }

    const movies = await prismadb.movie.findMany({
      where: {
        id: {
          in: user.favoriteIds,
        },
      },
    });

    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
