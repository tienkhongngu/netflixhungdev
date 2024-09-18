import prismadb  from '@/lib/prismadb';
import severAuth from '@/lib/severAuth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try{
        await severAuth(req);

        const { movieId } = req.query;

        if (typeof movieId !== 'string'){
            throw new Error('Id không đúng');
        }

        if(!movieId){
            throw new Error('Id không đúng');
        }

        const movie = await prismadb.movie.findUnique({
            where: {
                id:movieId
            }
        });

        return res.status(200).json(movie);
    }catch (error){
        console.log(error)
        return res.status(400).end();
    }
}