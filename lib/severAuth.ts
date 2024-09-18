import  prismadb  from '@/lib/prismadb';
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

// Hàm serverAuth để xác thực người dùng qua session
const severAuth = async (req: NextApiRequest) => {

    // Lấy session của người dùng từ request thông qua hàm getSession
    const session = await getSession({ req });
    
    // nếu k có email là chưa đăng nhập
    if(!session?.user?.email){
        throw new Error('Email không tồn tại ') // lỗi yêu cầu đăng nhập
    }

    // tìm user trong db 
    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    if(!currentUser){
        throw new Error('Chưa đăng nhập')
    }

    return {currentUser};
};

export default severAuth;