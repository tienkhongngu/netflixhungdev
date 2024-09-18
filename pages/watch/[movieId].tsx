import { useRouter } from 'next/router';
import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";

import useMovie from '@/hooks/useMovie'

const Watch = () => {
    const router =  useRouter();
    const {movieId} = router.query;

    const {data} = useMovie(movieId as string);

    return(
        <div className='h-screen w-screen lg:black'>
            <nav className='
                w-full
                p-4 z-10
                flex flex-row
                items-center
                gap-8
                bg-black
                bg-opacity-70'>
            <FaArrowLeft className='text-white cursor-pointer' size={40} 
                         onClick={() => router.push('/')}/>
            <p className='text-white text-1xl md:text-3xl font-bold'>
                <span className='font-light pr-4'>
                    Đang xem: 
                </span>
                {data?.title}
            </p>            
            </nav>
            <video className='h-[90%] w-full'
                autoPlay controls 
                src={data?.videoUrl}
                >
            </video>
        </div>
    )
}

export default Watch;