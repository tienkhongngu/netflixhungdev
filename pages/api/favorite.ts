import { without } from "lodash";
import prismadb from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { movieId, email } = req.body;

            // Xác thực người dùng
            const user = await prismadb.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }

            // Cập nhật danh sách yêu thích
            const updatedUser = await prismadb.user.update({
                where: { email },
                data: {
                    favoriteIds: {
                        push: movieId,
                    },
                },
            });

            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi server' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const { movieId, email } = req.body;

            // Xác thực người dùng
            const user = await prismadb.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }

            // Cập nhật danh sách yêu thích
            const updatedFavoriteIds = without(user.favoriteIds, movieId);

            const updatedUser = await prismadb.user.update({
                where: { email },
                data: {
                    favoriteIds: updatedFavoriteIds,
                },
            });

            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi server' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'DELETE']);
        res.status(405).end(`Phương thức ${req.method} không được phép`);
    }
}
