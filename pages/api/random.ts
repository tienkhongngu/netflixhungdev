import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import severAuth from "@/lib/severAuth";  // Sửa lại tên hàm "severAuth" thành "serverAuth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();  // Phương thức không hợp lệ
  }

  try {
    // Xác thực người dùng
    await severAuth(req);

    // Đếm tổng số phim trong cơ sở dữ liệu
    const movieCount = await prismadb.movie.count();
    
    if (movieCount === 0) {
      return res.status(404).json({ message: 'No movies found' });
    }

    // Tạo chỉ số ngẫu nhiên
    const randomIndex = Math.floor(Math.random() * movieCount);

    // Lấy một phim ngẫu nhiên
    const randomMovie = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex
    });

    // Trả về phim ngẫu nhiên
    return res.status(200).json(randomMovie[0]);  // Lấy phim đầu tiên từ danh sách
  } catch (error) {
    console.error("Error fetching random movie:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
